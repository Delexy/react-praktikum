import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@components/app";

import "./index.css";

import { store } from "@services/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </DndProvider>
  </StrictMode>
);
