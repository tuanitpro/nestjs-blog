import { Controller, Get, Post, Put, Delete, Param, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { PostModel } from '../models/post.model'
import { PostService } from '../services/post.service'
import { Post as PostData } from 'src/schemas/post.schema';

@Controller("api/v1/posts")
export class ApiPostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response): Promise<any> {
    const posts:PostData[] = await this.postService.findAllAsync()
    return response.status(200).json(posts)
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    var post: PostData = await  await this.postService.findById(id)
    return response.status(200).json(post)
  }

  @Get('author/:id')
  async findByAuthor(@Param('id') id: string, @Res() response: Response): Promise<any> {
    var posts: PostData[] = await  await this.postService.findAllAsync()
    return response.status(200).json(posts)
  }

  @Post()
  async post(@Body() postModel :PostModel,  @Res() response: Response): Promise<any> {
    await this.postService.createAsync(postModel);
    return response.status(201).json({ postModel })
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() postModel :PostModel,  @Res() response: Response): Promise<any> {
    await this.postService.updateAsync(id, postModel);
    return response.status(200).json({ postModel })
  }

  @Delete(':id')
  async delete(@Param('id') id: string,  @Res() response: Response): Promise<any> {
    var result = await this.postService.deleteAsync(id);
    return response.status(204).json({ result })
  }
}
