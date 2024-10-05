import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TodoItemEntity } from './todo-item.entity';

@Entity('todo_list')
export class TodoListEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => TodoItemEntity, (item) => item.listId)
  items: TodoItemEntity[];

  @Column('uuid')
  userId: string;
}
