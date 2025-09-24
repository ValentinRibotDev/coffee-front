import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState,useEffect } from "react";

// Pages
import Layout from "./Layout.jsx"
import { Home } from './Pages/Home.jsx'
import { Recipe } from './Pages/Recipe.jsx'
import Products from './Pages/Products.jsx'
import { About } from './Pages/About.jsx'
import { Profil } from './Pages/Profil.jsx'
import { Cart } from './Pages/Cart.jsx'
import  Register from "./Pages/Register.jsx";
import { AuthProvider } from "./Pages/AuthContext.jsx";
import Login from "./Pages/Login.jsx";


function App() {

  //FETCH 
  
  // Fetch des boissons
  const [boissons, setBoissons] = useState([]);

  useEffect(() => {
    const fetchBoissons = async () => {
      try {              
        const res = await fetch("http://localhost:8080/api/boissons", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setBoissons(data);
        }
      } catch (err) {
      console.error(err);
      }
    };
  fetchBoissons();
  }, []);

/**
 * Routes
 */
const router = createBrowserRouter([

  {
  element: <Layout boissons={boissons} />,  // permet de passer le context a tout les enfants
  children: [

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
    },
    {
      path: "/register",
      element: <Register/>
    }
  ]},
]);



  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  )
}

export default App
