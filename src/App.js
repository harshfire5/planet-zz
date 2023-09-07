import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

//Layouts
import RootLayout from "./layouts/RootLayout";

//Pages
import Home from "./components/Home";
import About from "./components/About";
import Activities from "./components/Activities";
import Activity from "./components/Activity";
import Apply from "./components/Apply";

//Forms
import {applyAction} from "./components/ApplyForm";

//Errors
import NotFound from "./components/NotFound";


const types = {
  aerial: "Aerial Adventures",
  aqua: "Aqua Escapades",
  land: "Land Lifestyles"
}

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout types={types} />}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="activities" element={<Activities  types={types} />}></Route>
        <Route path="activities/:type" element={<Activity  types={types} />}></Route>
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
