import { TypeProvider } from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class FileService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.BlogFile;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  async getFile(fileName: string) {
    const _url = `${ this.baseUrl }/${ fileName }`;
    return await this._httpService.get<File>(_url);
  }

  async getFileForWeb(fileName: string) {
    const _url = `${ this.baseUrl }/www/${ fileName }`;
    return await this._httpService.get<File>(_url);
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return await this._httpService.post<string>(this.baseUrl, formData);
  }
}

export const FileServiceProvider = new TypeProvider(
  Symbol.for(FileService.name),
  FileService,
  [HttpServiceProvider]
);
