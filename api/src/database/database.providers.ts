import { getDatabaseConnectionCredentials } from "./database.credentials";
import { Sequelize } from 'sequelize-typescript';
import { Book } from "../models/book.model";
import { BookGenre } from "../models/book-renre";
import { Genre } from "../models/genre.model";
import { Language } from "../models/language.model";
import { Rental } from "../models/rental.model";
import { User } from "../models/user.model";
import { Provider } from "@nestjs/common";
import { Constants } from "../constants";

export const databaseProviders: Provider[] = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(getDatabaseConnectionCredentials());
      sequelize.addModels([BookGenre, Book, Genre, Language, Rental, User]);
      await sequelize.sync({
        alter: true,
      });
      return sequelize;
    },
  },
  {
    provide: Constants.REPOSITORY.BOOK_GENRE,
    useValue: BookGenre,
  },
  {
    provide: Constants.REPOSITORY.BOOK,
    useValue: Book,
  },
  {
    provide: Constants.REPOSITORY.GENRE,
    useValue: Genre,
  },
  {
    provide: Constants.REPOSITORY.LANGUAGE,
    useValue: Language,
  },
  {
    provide: Constants.REPOSITORY.RENTAL,
    useValue: Rental,
  },
  {
    provide: Constants.REPOSITORY.USER,
    useValue: User,
  },
];
