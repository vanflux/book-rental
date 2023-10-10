import { useParams } from "react-router-dom";

export function BookPage() {
  const { bookId } = useParams();
  return (
    <div>BookPage {bookId}</div>
  );
}
