import React, { useState} from "react";

import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router";

export default function Login () {
  const [email, setEmail] = useState("");
  const { setToken } = useAuth();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  

  try {
    const loginRes = await fetch("http://localhost:8080/api/login_check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (loginRes.ok) {
      alert("Connexion réussie !");
      navigate("/home");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  } catch (err) {
    console.error(err);
    alert("Une erreur est survenue lors de la connexion");
  }
};

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img
            alt="Your Company"
            src="./CoffeeTimeLogo.png"
            className="mx-auto h-10 w-auto mb-10"
          />
        </Link>
        <h2 className="text-center text-gray-900">
          It's time to connect !
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email adress
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium justify-center text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="rounded-md border-2 border-amber-50 w-[380px] h-[50px] relative group overflow-hidden transition-transform duration-300 ease-out hover:scale-110 cursor-pointer">
              <div className="bg-stone-800 text-white w-full h-full flex flex-col justify-center">
                Login
              </div>
            </button>  
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not already member ?{' '}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
