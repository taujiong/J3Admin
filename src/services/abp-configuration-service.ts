import { ApplicationConfigurationDto } from 'src/models';
import { HttpService } from 'src/services/http-service';
import { ServiceDescriptor } from 'src/utils';
import { computed, ref } from 'vue';

export const AbpConfigurationServiceDescriptor: ServiceDescriptor<AbpConfigurationService> = {
  token: Symbol('abp-application-service'),
  create: () => new AbpConfigurationService()
};

export class AbpConfigurationService {
  private httpService!: HttpService;
  private readonly baseUrl = '/api/abp/application-configuration';
  private _configuration = ref(<ApplicationConfigurationDto>{});

  initialize(httpService: HttpService) {
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
