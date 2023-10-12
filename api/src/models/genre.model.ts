import { fn } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { BookGenre } from './book-renre';
import { Book } from './book.model';

@Table({ tableName: 'genres' })
export class Genre extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public slug: string;

  @Column({ type: DataType.STRING })
  public description: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;

  @BelongsToMany(() => Book, () => BookGenre)
  books: Array<Book & { BookGenre: BookGenre }>;
}
