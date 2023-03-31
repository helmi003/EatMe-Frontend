import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.scss";
import App from "./App";
import Loading from "./components/Loading/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loading />}>
    <Router>
      <App />
    </Router>
  </Suspense>
);
