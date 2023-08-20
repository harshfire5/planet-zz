import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

//Layouts
import RootLayout from "./RootLayout";
import ActivityLayout, {activityLoader} from "./ActivityLayout";

//Pages
import Home from "./Home";
import About from "./About";
import AerialActivities from "./AerialActivities";
import Aquavities from "./Aquavities";
import Groundivities from "./Groundivities";
import NotFound from "./NotFound";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="activities/:type?" element={<ActivityLayout />} loader={activityLoader}>
          {/*<Route path=":type" element={<AerialActivities />} loader={activityLoader}></Route>*/}
          {/*<Route path="aqua" element={<Aquavities />} loader={activityLoader}></Route>*/}
          {/*<Route path="land" element={<Groundivities />} loader={activityLoader}></Route>*/}
        </Route>
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
