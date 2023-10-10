
import { fn } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Book } from './book.model';
import { Genre } from './genre.model';

@Table({ tableName: 'books_genres' })
export class BookGenre extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.UUID, allowNull: false })
  public bookId: string;

  @ForeignKey(() => Genre)
  @Column({ type: DataType.UUID, allowNull: false })
  public genreId: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;
}
