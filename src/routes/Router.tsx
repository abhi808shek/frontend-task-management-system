import { createBrowserRouter } from "react-router";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
     
  },
  {
    path: "/about",
    Component: About,
    children:[
        {index:true,Component:About},
        {path:"contact",Component:Contact}
    ]
  }
]);
export default router