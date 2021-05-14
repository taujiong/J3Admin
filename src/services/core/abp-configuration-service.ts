import { ApplicationConfigurationDto, TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';
import { readonly, ref } from 'vue';

export class AbpConfigurationService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.Configuration;
  private _configuration = ref(<ApplicationConfigurationDto>{});

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  get configuration() {
    return readonly(this._configuration);
  }

  async loadConfiguration() {
    this._configuration.value = await this._httpService.get<ApplicationConfigurationDto>(this.baseUrl);
  }
}

export const AbpConfigurationServiceProvider = new TypeProvider<AbpConfigurationService>(
  Symbol.for(AbpConfigurationService.name),
  AbpConfigurationService,
  [HttpServiceProvider]
);
