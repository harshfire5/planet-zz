import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

//Layouts
import RootLayout from "./layouts/RootLayout";
import ActivityLayout from "./layouts/ActivityLayout";

//Pages
import Home from "./components/Home";
import About from "./components/About";

//Errors
import NotFound from "./components/NotFound";
import Apply from "./components/Apply";
import {applyAction} from "./components/ApplyForm";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="activities/:type?" element={<ActivityLayout />}></Route>
        <Route path="apply" element={<Apply />} action={applyAction}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
