import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
    @Prop()
    id: string
    @Prop()
    name: string
    @Prop()
    color?: string
}

export const TagSchema = SchemaFactory.createForClass(Tag);