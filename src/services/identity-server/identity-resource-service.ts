import { TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class IdentityResourceService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.IdentityServerIdentityResource;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }
}

export const IdentityResourceServiceProvider = new TypeProvider(
  Symbol.for(IdentityResourceService.name),
  IdentityResourceService,
  [HttpServiceProvider]
);
