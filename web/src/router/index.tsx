import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home";
import { BooksPage } from "../pages/books";
import { BookPage } from "../pages/book";
import { routes } from "./routes";
import { NotFoundPage } from "../pages/not-found";

export function Router() {
  console.log('asd', routes.BOOK_DETAILS());
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME()} element={<HomePage />} />
        <Route path={routes.BOOKS()} element={<BooksPage />} />
        <Route path={routes.BOOK_DETAILS()} element={<BookPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
