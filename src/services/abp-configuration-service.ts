import { AxiosInstance } from 'axios';
import { ApplicationConfigurationDto } from 'src/models';
import { httpService } from 'src/services/http-service';
import { readonly } from 'vue';

class AbpConfigurationService {
  private readonly httpService: AxiosInstance;
  private readonly baseUrl: string;

  constructor(baseUrl: string, axiosInstance: AxiosInstance) {
    this.baseUrl = baseUrl;
    this.httpService = axiosInstance;
  }

  private _configuration: ApplicationConfigurationDto = <ApplicationConfigurationDto>{};

  get configuration() {
    return readonly<ApplicationConfigurationDto>(this._configuration);
  }

  async loadConfiguration() {
    const response = await this.httpService.get<ApplicationConfigurationDto>(this.baseUrl);
    this._configuration = response.data;
  }
}

const baseUrl = '/api/abp/application-configuration';
export const abpConfigurationService = new AbpConfigurationService(baseUrl, httpService);
