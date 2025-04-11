import { RouterProvider } from "react-router-dom";

import router from "./routes/RootRoute";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
