import { AuditedEntityDto } from 'src/models/dtos';

export type BlogPostCreateDto = BlogPostCreateUpdateDtoBase

export interface BlogPostCreateUpdateDtoBase {
  title: string,
  content: string,
  tags: string,
  description: string
}

export interface BlogPostDto extends AuditedEntityDto {
  title: string,
  description: string,
  tags: string[]
}

export interface BlogPostWithDetailDto extends BlogPostDto {
  content: string
}

export type BlogPostUpdateDto = BlogPostCreateUpdateDtoBase
