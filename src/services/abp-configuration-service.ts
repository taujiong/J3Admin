import { ApplicationConfigurationDto } from 'src/models';
import { HttpService } from 'src/services/http-service';
import { ServiceDescriptor } from 'src/utils';
import { computed, ref } from 'vue';

export class AbpConfigurationService {
  private _httpService: HttpService;
  private readonly baseUrl = '/api/abp/application-configuration';
  private _configuration = ref(<ApplicationConfigurationDto>{});

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  get currentUser() {
    return computed(() => this._configuration.value?.currentUser);
  }

  get localization() {
    return computed(() => this._configuration.value?.localization);
  }

  async loadConfiguration() {
    const response = await this._httpService.get<ApplicationConfigurationDto>(this.baseUrl);
    this._configuration.value = response.data;
  }
}

export const AbpConfigurationServiceDescriptor: ServiceDescriptor<AbpConfigurationService> = {
  tokenKey: AbpConfigurationService.name,
  create: (...dependency) => {
    if (dependency.length !== 1) throw new Error(`dependency should be of type ${ HttpService.name }`);
    const httpService = dependency[0] as HttpService;
    return new AbpConfigurationService(httpService);
  }
};
