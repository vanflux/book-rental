import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home";
import { BooksPage } from "../pages/books";
import { BookPage } from "../pages/book";
import { routes } from "./routes";
import { NotFoundPage } from "../pages/not-found";
import { RegisterPage } from "../pages/register";
import { LoginPage } from "../pages/login";

export function Router() {
  console.log('asd', routes.BOOK_DETAILS());
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME()} element={<HomePage />} />
        <Route path={routes.BOOKS()} element={<BooksPage />} />
        <Route path={routes.BOOK_DETAILS()} element={<BookPage />} />
        <Route path={routes.REGISTER()} element={<RegisterPage />} />
        <Route path={routes.LOGIN()} element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
