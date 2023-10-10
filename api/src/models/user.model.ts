
import { fn } from 'sequelize';
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Book } from './book.model';
import { Rental } from './rental.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public password: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;

  @BelongsToMany(() => Book, () => Rental)
  books: Array<Book & { Rental: Rental }>;
}
