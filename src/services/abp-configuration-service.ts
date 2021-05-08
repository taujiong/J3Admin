import { AxiosInstance } from 'axios';
import { ApplicationConfigurationDto } from 'src/models';
import { readonly, ref } from 'vue';

export const abpConfigurationServiceToken = Symbol('abp-application-service');

export class AbpConfigurationService {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl = '/api/abp/application-configuration';

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  private _configuration = ref<ApplicationConfigurationDto>(<ApplicationConfigurationDto>{});
  get configuration() {
    return readonly(this._configuration);
  }

  async loadConfiguration() {
    const response = await this.axiosInstance.get<ApplicationConfigurationDto>(this.baseUrl);
    this._configuration.value = response.data;
  }
}

export function createAbpConfigurationService(axiosInstance: AxiosInstance) {
  return new AbpConfigurationService(axiosInstance);
}
