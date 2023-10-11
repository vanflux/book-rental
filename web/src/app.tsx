import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/auth";
import { Router } from "./router";
import { queryClient } from "./services/queryClient";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider >
        <Router />
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}
