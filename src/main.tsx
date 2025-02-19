import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthProvider from "./context/authContext.tsx";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";

// == step 1 to wrap App in BrowserRouter
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);

// == step 2 App file
