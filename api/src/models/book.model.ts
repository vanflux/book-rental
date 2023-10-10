
import { fn } from 'sequelize';
import { Table, Column, Model, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { BookGenre } from './book-renre';
import { Genre } from './genre.model';
import { Language } from './language.model';
import { Rental } from './rental.model';
import { User } from './user.model';

@Table({ tableName: 'books' })
export class Book extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public slug: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public authorName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public publishedYear: number;

  @Column({ type: DataType.STRING })
  public bannerImageUrl?: string;

  @Column({ type: DataType.STRING })
  public editorName?: string;

  @ForeignKey(() => Language)
  @Column({ type: DataType.UUID })
  public languageId?: string;

  @Column({ type: DataType.INTEGER })
  public pageCount?: number;

  @ForeignKey(() => Rental)
  @Column({ type: DataType.UUID })
  public rentalId: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public createdAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;

  @BelongsToMany(() => Genre, () => BookGenre)
  genres: Array<Genre & { BookGenre: BookGenre }>;

  @BelongsTo(() => Language)
  language?: Language;

  @BelongsToMany(() => User, () => Rental)
  users: Array<User & { Rental: Rental }>;
}
