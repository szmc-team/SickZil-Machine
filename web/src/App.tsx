import React from "react";
import Topbar from "./components/Topbar";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider>
      <Topbar />
    </SnackbarProvider>
  );
};

export default App;
