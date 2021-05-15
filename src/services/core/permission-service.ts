import {
  GetPermissionListResultDto,
  ProviderInfoDto,
  TypeProvider,
  UpdatePermissionsDto,
  VueComputedReadonlyRef
} from 'src/models';
import { eApiUrl } from 'src/presets';
import {
  AbpConfigurationService,
  AbpConfigurationServiceProvider,
  HttpService,
  HttpServiceProvider
} from 'src/services';
import { computed } from 'vue';

export class PermissionService {
  grantedPolicies: VueComputedReadonlyRef<Record<string, boolean>>;
  allPolicies: VueComputedReadonlyRef<Record<string, boolean>>;
  private _httpService: HttpService;
  private baseUrl = eApiUrl.Permission;

  constructor(httpService: HttpService, abpConfigurationService: AbpConfigurationService) {
    this._httpService = httpService;
    this.grantedPolicies = computed(() => abpConfigurationService.configuration.value.auth.grantedPolicies);
    this.allPolicies = computed(() => abpConfigurationService.configuration.value.auth.policies);
  }

  async getPermissions(input: ProviderInfoDto) {
    const config = { params: input };
    return await this._httpService.get<GetPermissionListResultDto>(this.baseUrl, config);
  }

  async updatePermissions(input: ProviderInfoDto, payload: UpdatePermissionsDto) {
    const config = { params: input };
    return await this._httpService.put<GetPermissionListResultDto>(this.baseUrl, payload, config);
  }

  isPolicyGranted(policy?: string) {
    if (!policy) return true;

    const orRegexp = /\|\|/g;
    const andRegexp = /&&/g;

    // TODO: Allow combination of ANDs & ORs
    if (orRegexp.test(policy)) {
      const policies = policy.split('||').filter(Boolean);

      if (policies.length < 2) return false;

      return policies.some(p => p.trim() in this.grantedPolicies.value);
    } else if (andRegexp.test(policy)) {
      const policies = policy.split('&&').filter(Boolean);

      if (policies.length < 2) return false;

      return policies.every(p => p.trim() in this.grantedPolicies.value);
    }

    return policy in this.grantedPolicies.value;
  }
}

export const PermissionServiceProvider = new TypeProvider(
  Symbol.for(PermissionService.name),
  PermissionService,
  [HttpServiceProvider, AbpConfigurationServiceProvider]
);
