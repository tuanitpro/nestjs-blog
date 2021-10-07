import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../schemas/post.schema';
import { PostModel } from 'src/models/post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel("Posts") private postCollection: Model<PostDocument>) { }
  onModuleInit() {
    console.log(`The module PostService has been initialized.`);
  }

  async findAllAsync(): Promise<Post[]> {
    return await this.postCollection.find().exec();
  }

  async findById(id: string) : Promise<Post> {
    return await this.postCollection.findById(id).exec();
  }

  async createAsync(postModel: PostModel): Promise<any> {
    const createdPost = new this.postCollection(postModel);
    return await createdPost.save()
  }

  async updateAsync(id: string, postModel: PostModel): Promise<any> {
    return await this.postCollection.updateOne({ _id: id }, postModel)
  }

  async deleteAsync(id: string): Promise<any> {
    return await this.postCollection.deleteOne({ _id: id })
  }
}
