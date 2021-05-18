import {
  BlogPostCreateDto,
  BlogPostDto,
  BlogPostUpdateDto,
  BlogPostWithDetailDto,
  ListResultDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
  TypeProvider
} from 'src/models';
import { eApiUrl } from 'src/presets';
import { HttpService, HttpServiceProvider } from 'src/services';

export class PostService {
  private _httpService: HttpService;
  private readonly baseUrl = eApiUrl.BlogPost;

  constructor(httpService: HttpService) {
    this._httpService = httpService;
  }

  async getPostById(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.get<BlogPostWithDetailDto>(_url);
  }

  async getPosts(input?: PagedAndSortedResultRequestDto) {
    const config = { params: input };
    return await this._httpService.get<PagedResultDto<BlogPostDto>>(this.baseUrl, config);
  }

  async getPostsByTag(tag: string) {
    const _url = `${ this.baseUrl }/by-tag/${ tag }`;
    return await this._httpService.get<ListResultDto<BlogPostDto>>(_url);
  }

  async updatePost(id: string, input: BlogPostUpdateDto) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.put<BlogPostWithDetailDto>(_url, input);
  }

  async deletePost(id: string) {
    const _url = `${ this.baseUrl }/${ id }`;
    return await this._httpService.delete(_url);
  }

  async createPost(input: BlogPostCreateDto) {
    return await this._httpService.post<BlogPostWithDetailDto>(this.baseUrl, input);
  }
}

export const PostServiceProvider = new TypeProvider(
  Symbol.for(PostService.name),
  PostService,
  [HttpServiceProvider]
);
