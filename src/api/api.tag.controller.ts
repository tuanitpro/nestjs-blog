import { Controller, Get, Post, Put, Delete, Param, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { TagModel } from '../models/tag.model'
import { TagService } from '../services/tag.service'
import { Tag as TagData } from 'src/schemas/tag.schema';

@Controller("api/v1/tags")
export class ApiTagController {
  constructor(private readonly tagService: TagService) { }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response): Promise<any> {
    const posts: TagData[] = await this.tagService.findAllAsync()
    return response.status(200).json(posts)
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    var post: TagData = await await this.tagService.findById(id)
    return response.status(200).json(post)
  }

  @Post()
  async post(@Body() tagModel: TagModel, @Res() response: Response): Promise<any> {
    await this.tagService.createAsync(tagModel);
    return response.status(201).json({ tagModel })
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() tagModel: TagModel, @Res() response: Response): Promise<any> {
    await this.tagService.updateAsync(id, tagModel);
    return response.status(200).json({ tagModel })
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response: Response): Promise<any> {
    var result = await this.tagService.deleteAsync(id);
    return response.status(204).json({ result })
  }
}
