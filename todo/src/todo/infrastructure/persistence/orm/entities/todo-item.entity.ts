import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { TodoListEntity } from './todo-list.entity';

@Entity('todo_item')
export class TodoItemEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => TodoListEntity)
  todoList: TodoItemEntity;

  @Column()
  priority: string;

  @Column()
  state: string;

  @Column()
  estimatedTime: number;

  @Column()
  loggedTime: number;
}
