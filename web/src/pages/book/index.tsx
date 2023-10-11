import { useParams } from "react-router-dom";

export function BookPage() {
  const { slug } = useParams();
  return (
    <div>BookPage {slug}</div>
  );
}
