import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop()
    id: string
    @Prop()
    name: string
    @Prop()
    content?: string
    @Prop()
    author?: string
    @Prop()
    pictureUrl?: string
    @Prop([String])
    tagId?: string[]
    @Prop([String])
    categoryId?: string[]
    @Prop()
    created?: Date
    @Prop()
    createdBy?: string
}

export const PostSchema = SchemaFactory.createForClass(Post);