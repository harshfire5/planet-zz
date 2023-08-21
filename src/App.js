import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

//Layouts
import RootLayout from "./RootLayout";
import ActivityLayout, {activityLoader} from "./ActivityLayout";

//Pages
import Home from "./Home";
import About from "./About";

//Errors
import NotFound from "./NotFound";
import ActivityError from "./ActivityError";
import Apply from "./Apply";
import {applyAction} from "./ApplyForm";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="activities/:type?"
               element={<ActivityLayout />}
               loader={activityLoader}
        errorElement={<ActivityError />}>
        </Route>
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
