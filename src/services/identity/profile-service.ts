import { ChangePasswordInput, ProfileDto, TypeProvider, UpdateProfileDto } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class ProfileService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.Profile;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  async getProfile() {
    return await this._httpService.get<ProfileDto>(this.baseUrl);
  }

  async updateProfile(input: UpdateProfileDto) {
    return await this._httpService.put<ProfileDto>(this.baseUrl, input);
  }

  async changePassword(input: ChangePasswordInput) {
    const _url = this.baseUrl + '/change-password';
    await this._httpService.post(_url, input);
  }
}

export const ProfileServiceProvider = new TypeProvider(
  Symbol.for(ProfileService.name),
  ProfileService,
  [HttpServiceProvider]
);
