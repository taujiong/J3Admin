import { ApplicationConfigurationDto } from 'src/models';
import { HttpService } from 'src/services/http-service';
import { computed, ref } from 'vue';

export const abpConfigurationServiceToken = Symbol('abp-application-service');

export class AbpConfigurationService {
  private readonly httpService: HttpService;
  private readonly baseUrl = '/api/abp/application-configuration';
  private _configuration = ref(<ApplicationConfigurationDto>{});

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  get currentUser() {
    return computed(() => this._configuration.value?.currentUser);
  }

  get localization() {
    return computed(() => this._configuration.value?.localization);
  }

  async loadConfiguration() {
    const response = await this.httpService.get<ApplicationConfigurationDto>(this.baseUrl);
    this._configuration.value = response.data;
  }
}

export function createAbpConfigurationService(httpService: HttpService) {
  return new AbpConfigurationService(httpService);
}
