import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import { Home } from './Pages/Home.jsx'
import { Recipe } from './Pages/Recipe.jsx'
import { Products } from './Pages/Products.jsx'
import { About } from './Pages/About.jsx'
import { Profil } from './Pages/Profil.jsx'
import { Fav } from './Pages/Fav.jsx'
import { Cart } from './Pages/Cart.jsx'
import { Login } from "./Pages/Login.jsx";
import { Register } from "./Pages/Register.jsx";
import { AuthProvider } from "./Pages/AuthContext.jsx";

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
    path: "/users/profil",
    element: <Profil/>,
  },
  {
    path: "/users/fav",
    element: <Fav/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
