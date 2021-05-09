import { AxiosInstance } from 'axios';
import { ApplicationConfigurationDto } from 'src/models';
import { computed, ref } from 'vue';

export const abpConfigurationServiceToken = Symbol('abp-application-service');

export class AbpConfigurationService {
  private readonly axiosInstance: AxiosInstance;
  private readonly baseUrl = '/api/abp/application-configuration';
  private _configuration = ref(<ApplicationConfigurationDto>{});

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  get currentUser() {
    return computed(() => this._configuration.value.currentUser);
  }

  async loadConfiguration() {
    const response = await this.axiosInstance.get<ApplicationConfigurationDto>(this.baseUrl);
    this._configuration.value = response.data;
  }
}

export function createAbpConfigurationService(axiosInstance: AxiosInstance) {
  return new AbpConfigurationService(axiosInstance);
}
