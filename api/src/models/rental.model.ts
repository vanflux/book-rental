
import { fn } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Book } from './book.model';
import { User } from './user.model';

@Table({ tableName: 'rentals' })
export class Rental extends Model {
  @Column({ type: DataType.UUID, primaryKey: true })
  public id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  public userId: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.UUID, allowNull: false })
  public bookId: string;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public startedAt: Date;

  @Column({ type: DataType.DATE })
  public endedAt: Date;

  @Column({ type: DataType.DATE, defaultValue: fn('now') })
  public updatedAt: Date;
}
