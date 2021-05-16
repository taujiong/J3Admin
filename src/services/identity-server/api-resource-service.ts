import { TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class ApiResourceService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.IdentityServerApiResource;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }
}

export const ApiResourceServiceProvider = new TypeProvider(
  Symbol.for(ApiResourceService.name),
  ApiResourceService,
  [HttpServiceProvider]
);
