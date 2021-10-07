import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostService } from '../services/post.service'


@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}


  @Get()
  findAll(): string {
    return  "Post Page"
  }
}
