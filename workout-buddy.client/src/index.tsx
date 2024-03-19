import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import configRouter from "./router/configRouter";
import configTheme from "./theme/configTheme";
import { Provider } from "react-redux";
import store from "./store";
import "./globalStyles.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={configTheme()}>
        <ColorModeScript />
        <RouterProvider router={configRouter()} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
