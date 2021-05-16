import { TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class ClientService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.IdentityServerClient;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }
}

export const ClientServiceProvider = new TypeProvider(
  Symbol.for(ClientService.name),
  ClientService,
  [HttpServiceProvider]
);
