import { CurrentUserDto, TypeProvider, VueComputedReadonlyRef } from 'src/models';
import { AbpConfigurationService, AbpConfigurationServiceProvider } from 'src/services/abp-configuration-service';
import { HttpService, HttpServiceProvider } from 'src/services/http-service';
import { computed } from 'vue';

export class UserService {
  currentUser: VueComputedReadonlyRef<CurrentUserDto>;
  private _httpService: HttpService;

  constructor(httpService: HttpService, abpConfigurationService: AbpConfigurationService) {
    this._httpService = httpService;
    this.currentUser = computed(() => abpConfigurationService.configuration.value.currentUser);
  }
}

export const UserServiceProvider = new TypeProvider<UserService>(
  Symbol.for(UserService.name),
  UserService,
  [HttpServiceProvider, AbpConfigurationServiceProvider]
);
