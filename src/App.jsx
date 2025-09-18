import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// Pages
import { Home } from './Pages/Home.jsx'
import { Recipe } from './Pages/Recipe.jsx'
import { Products } from './Pages/Products.jsx'
import { About } from './Pages/About.jsx'
import { Profil } from './Pages/Profil.jsx'
import { Cart } from './Pages/Cart.jsx'
import { Login } from "./Pages/Login.jsx";

/**
 * Routes
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/recipe",
    element: <Recipe/>,
  },
  {
    path: "/products",
    element: <Products/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/profil",
    element: <Profil/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
