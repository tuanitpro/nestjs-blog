import { Controller, Get, Post, Put, Delete, Param, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryModel } from '../models/category.model'
import { CategoryService } from '../services/category.service'
import { Category as CategoryData } from 'src/schemas/category.schema';

@Controller("api/v1/categories")
export class ApiCategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response): Promise<any> {
    const posts:CategoryData[] = await this.categoryService.findAllAsync()
    return response.status(200).json(posts)
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response): Promise<any> {
    var post: CategoryData = await  await this.categoryService.findById(id)
    return response.status(200).json(post)
  }

  @Post()
  async post(@Body() categoryModel :CategoryModel,  @Res() response: Response): Promise<any> {
    await this.categoryService.createAsync(categoryModel);
    return response.status(201).json({ categoryModel })
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() categoryModel :CategoryModel,  @Res() response: Response): Promise<any> {
    await this.categoryService.updateAsync(id, categoryModel);
    return response.status(200).json({ categoryModel })
  }

  @Delete(':id')
  async delete(@Param('id') id: string,  @Res() response: Response): Promise<any> {
    var result = await this.categoryService.deleteAsync(id);
    return response.status(204).json({ result })
  }
}
