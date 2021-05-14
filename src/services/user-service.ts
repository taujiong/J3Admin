import {
  CurrentUserDto,
  IdentityUserCreateDto,
  IdentityUserDto,
  IdentityUserUpdateDto,
  IdentityUserUpdateRolesDto,
  ListResultDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
  TypeProvider,
  VueComputedReadonlyRef
} from 'src/models';
import { IdentityRoleDto } from 'src/models/identity-role';
import { AbpConfigurationService, AbpConfigurationServiceProvider } from 'src/services/abp-configuration-service';
import { HttpService, HttpServiceProvider } from 'src/services/http-service';
import { computed } from 'vue';

export class UserService {
  private _httpService: HttpService;
  private readonly baseUrl = '/api/identity/users';
  currentUser: VueComputedReadonlyRef<CurrentUserDto>;

  constructor(httpService: HttpService, abpConfigurationService: AbpConfigurationService) {
    this._httpService = httpService;
    this.currentUser = computed(() => abpConfigurationService.configuration.value.currentUser);
  }

  async getUserById(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.get<IdentityUserDto>(_url);
  }

  async updateUser(id: string, input: IdentityUserUpdateDto) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.put<IdentityUserDto>(_url, input);
  }

  async deleteUser(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    await this._httpService.delete(_url);
  }

  async getUsers(input?: PagedAndSortedResultRequestDto) {
    const config = { params: input };
    return await this._httpService.get<PagedResultDto<IdentityUserDto>>(this.baseUrl, config);
  }

  async createUser(input: IdentityUserCreateDto) {
    return await this._httpService.post<IdentityUserDto>(this.baseUrl, input);
  }

  async getUserByEmail(email: string) {
    const _url = `${ this.baseUrl }/by-email/${ email }`;
    return await this._httpService.get<IdentityUserDto>(_url);
  }

  async getUserByUserName(userName: string) {
    const _url = `${ this.baseUrl }/by-email/${ userName }`;
    return await this._httpService.get<IdentityUserDto>(_url);
  }

  async getAssignableRoles() {
    const _url = this.baseUrl + '/assignable-roles';
    return await this._httpService.get<ListResultDto<IdentityRoleDto>>(_url);
  }

  async getRolesByUser(id: string) {
    const _url = `${ this.baseUrl }/${ id }/roles`;
    return this._httpService.get<ListResultDto<IdentityRoleDto>>(_url);
  }

  async updateRoles(id: string, input: IdentityUserUpdateRolesDto) {
    const _url = `/api/identity/users/${ id }/roles`;
    return await this._httpService.put(_url, input);
  }
}

export const UserServiceProvider = new TypeProvider<UserService>(
  Symbol.for(UserService.name),
  UserService,
  [HttpServiceProvider, AbpConfigurationServiceProvider]
);
