import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home";
import { BooksPage } from "../pages/books";
import { BookPage } from "../pages/book";
import { routes } from "./routes";
import { NotFoundPage } from "../pages/not-found";
import { RegisterPage } from "../pages/register";
import { LoginPage } from "../pages/login";
import { ProtectedRoute } from "./protected-route";
import { Layout } from "../components/layout";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.HOME()}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route element={<Layout><Outlet /></Layout>}>
          <Route
            path={routes.BOOKS()}
            element={
              <ProtectedRoute>
                <BooksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={routes.BOOK_DETAILS()}
            element={
              <ProtectedRoute>
                <BookPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path={routes.REGISTER()}
          element={<RegisterPage />}
        />
        <Route
          path={routes.LOGIN()}
          element={<LoginPage />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
