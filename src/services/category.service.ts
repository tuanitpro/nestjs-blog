import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CategoryModel } from 'src/models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel("Categories") private categoryCollection: Model<CategoryDocument>) { }
  onModuleInit() {
    console.log(`The module PostService has been initialized.`);
  }

  async findAllAsync(): Promise<Category[]> {
    return await this.categoryCollection.find().exec();
  }

  async findById(id: string) : Promise<Category> {
    return await this.categoryCollection.findById(id).exec();
  }

  async createAsync(postModel: CategoryModel): Promise<any> {
    const createdPost = new this.categoryCollection(postModel);
    return await createdPost.save()
  }

  async updateAsync(id: string, postModel: CategoryModel): Promise<any> {
    return await this.categoryCollection.updateOne({ _id: id }, postModel)
  }

  async deleteAsync(id: string): Promise<any> {
    return await this.categoryCollection.deleteOne({ _id: id })
  }
}
