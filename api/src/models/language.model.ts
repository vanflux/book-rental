import { fn } from 'sequelize';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Book } from './book.model';

@Table({ tableName: 'languages' })
export class Language extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public name: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;

  @HasMany(() => Book)
  books: Book[];
}
