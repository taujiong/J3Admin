import {
  IdentityRoleCreateDto,
  IdentityRoleDto,
  IdentityRoleUpdateDto,
  ListResultDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
  TypeProvider,
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

export class RoleService {
  currentRoles: VueComputedReadonlyRef<Array<string>>;
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.IdentityRole;

  constructor(httpService: HttpService, abpConfigurationService: AbpConfigurationService) {
    this._httpService = httpService;
    this.currentRoles = computed(() => abpConfigurationService.configuration.value.currentUser.roles);
  }

  async getRoles(input?: PagedAndSortedResultRequestDto) {
    const config = { params: input };
    return await this._httpService.get<ListResultDto<IdentityRoleDto>>(this.baseUrl, config);
  }

  async createRole(input: IdentityRoleCreateDto) {
    return await this._httpService.post<IdentityRoleDto>(this.baseUrl, input);
  }

  async getRoleById(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.get<IdentityRoleDto>(_url);
  }

  async updateRole(id: string, input: IdentityRoleUpdateDto) {
    const config = { params: input };
    return await this._httpService.get<PagedResultDto<IdentityRoleDto>>(this.baseUrl, config);
  }

  async deleteRole(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    await this._httpService.delete(_url);
  }
}

export const RoleServiceProvider = new TypeProvider<RoleService>(
  Symbol.for(RoleService.name),
  RoleService,
  [HttpServiceProvider, AbpConfigurationServiceProvider]
);
