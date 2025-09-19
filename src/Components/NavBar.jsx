import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi2";

export function Navigation({color}) {

    const homeColor = color || "#000000";

    return (
        <>
            {/* LOGO */}
            <div className="flex">
                <div className="flex w-1/5 ml-4 items-center">
                    <a href="/" className="flex items-center w-full h-full !no-underline">

                        <img src="./CoffeeTimeLogo.png" alt="Logo" className="h-10 w-auto" />
                        
                        <span className="
                            hidden 
                            lg:block 
                            pl-4
                            roboto-bold font-medium uppercase text-[1.6rem] text-black
                            "
                        >
                            Coffee Time
                        </span>
                    </a>
                </div>

                {/* Link */}
                <div className="w-3/5 flex justify-around items-center border-bottom">
                    <a
                        href="/recipe"
                        className="
                            flex justify-center items-center
                            w-1/9 h-1/2 pt-1 
                            roboto-bold uppercase !no-underline text-sm
                            duration-400 ease-in-out 
                            md:hover:tracking-[0.20em] md:hover:!text-white
                        "
                        style={{ color: homeColor }}
                    >
                        Recipe
                    </a>

                    <a
                        href="/products"
                        className="
                            flex justify-center items-center
                            w-1/9 h-1/2 pt-1 
                            roboto-bold uppercase !no-underline text-sm
                            duration-400 ease-in-out 
                            md:hover:tracking-[0.15em] md:hover:!text-white
                        "
                        style={{ color: homeColor }}
                    >
                        Products
                    </a>

                    <a
                        href="/about"
                        className="
                            flex justify-center items-center
                            w-1/9 h-1/2 pt-1 
                            roboto-bold uppercase !no-underline text-sm
                            duration-400 ease-in-out 
                            md:hover:tracking-[0.20em] md:hover:!text-white
                        "
                        style={{ color: homeColor }}
                    >
                        About
                    </a>
                </div>

                {/* Icon */}
                <div className="w-1/5 flex justify-center items-center">
                
                    <div className="
                        w-full sm:w-[90px] h-[30px] rounded-lg
                        px-3 py-2 space-x-3
                        flex items-center justify-center
                        bg-black
                        "
                    >
                    
                        {/* Panier */}
                        <a href="/cart" className="text-white text-xl flex items-center justify-center">
                            <HiOutlineShoppingCart />
                        </a>

                        {/* Séparateur */}
                        <span className="text-white">|</span>

                        {/* User */}
                        <a href="/profil" className="text-white text-xl flex items-center justify-center">
                            <HiOutlineUser />
                        </a>

                    </div>

                </div>
            </div>   
        </>
    );
}

