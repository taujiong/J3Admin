import { TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class ApiScopeService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.IdentityServerApiScope;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }
}

export const ApiScopeServiceProvider = new TypeProvider(
  Symbol.for(ApiScopeService.name),
  ApiScopeService,
  [HttpServiceProvider]
);
