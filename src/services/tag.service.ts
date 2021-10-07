import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from '../schemas/tag.schema';
import { TagModel } from 'src/models/tag.model';

@Injectable()
export class TagService {
  constructor(@InjectModel("Tags") private tagCollection: Model<TagDocument>) { }
  onModuleInit() {
    console.log(`The module TagService has been initialized.`);
  }

  async findAllAsync(): Promise<Tag[]> {
    return await this.tagCollection.find().exec();
  }

  async findById(id: string) : Promise<Tag> {
    return await this.tagCollection.findById(id).exec();
  }

  async createAsync(postModel: TagModel): Promise<any> {
    const createdPost = new this.tagCollection(postModel);
    return await createdPost.save()
  }

  async updateAsync(id: string, postModel: TagModel): Promise<any> {
    return await this.tagCollection.updateOne({ _id: id }, postModel)
  }

  async deleteAsync(id: string): Promise<any> {
    return await this.tagCollection.deleteOne({ _id: id })
  }
}
