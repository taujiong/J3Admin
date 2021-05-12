import { ApplicationConfigurationDto } from 'src/models';
import { TypeProvider } from 'src/models/dependency-inject-provider';
import { HttpService, HttpServiceProvider } from 'src/services/http-service';
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

export const AbpConfigurationServiceProvider = new TypeProvider<AbpConfigurationService>(
  Symbol.for(AbpConfigurationService.name),
  AbpConfigurationService,
  [HttpServiceProvider]
);
