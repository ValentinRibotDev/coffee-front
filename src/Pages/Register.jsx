import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router';


export default function Register () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  try{
  const registerRes = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, firstName, name}),
  });

      if (!registerRes.ok) {
        alert("Échec de l'inscription");
        return;
      }

      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    }
  };
    return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
                <img
                  alt="Your Company"
                  src="./CoffeeTimeLogo.png"
                  className="mx-auto h-10 w-auto"/>
            </Link>
            <h2 className="text-center text-gray-90">
                Create your account
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
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </div>
            </div>
            <div>
                <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">
                    Firstname
                </label>
                <div className="mt-2">
                    <input
                        id="firstName"
                        name="firstName"
                        type="txt"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
                </div>
            </div>
            <div>
                <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                    Lastname
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="txt"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={name} onChange={(e)=> setName(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                type="submit"
                className="rounded-md border-2 border-amber-50 w-[380px] h-[50px] relative group overflow-hidden transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                >
                <div className="bg-stone-800 text-white w-full h-full flex flex-col justify-center">
                    Submit
                </div>
                <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-100">&nbsp;</div>
                </button>  
            </div>
          </form>
        </div>
      </div>
    </>
    )
}
