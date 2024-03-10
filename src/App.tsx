import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthWrapper } from "./features/auth";
import "react-toastify/dist/ReactToastify.css";

import router from "./router";

const queryClient = new QueryClient();

axios.defaults.baseURL = "/api/v1";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthWrapper>
    </QueryClientProvider>
  );
}

export default App;
