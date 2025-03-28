import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UUID } from 'mongodb';

export type ReadTodoListDocument = HydratedDocument<ReadTodoList>;

@Schema()
export class ReadTodoList {
  @Prop({ unique: true, type: UUID })
  id: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop(
    raw(
      Array<{
        id: string;
        title: string;
        description: string;
        listId: string;
        priority: string;
        state: string;
        estimatedTime: number;
        loggedTime: number;
      }>,
    ),
  )
  items: [];

  @Prop()
  userId: string;
}

export const ReadTodoListSchema = SchemaFactory.createForClass(ReadTodoList);

ReadTodoListSchema.index({ id: 1 }, { unique: true });
