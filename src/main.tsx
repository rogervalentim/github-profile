import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import { GithubProvider } from "./context/github-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </React.StrictMode>,
);
