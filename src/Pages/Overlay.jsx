import React, { useState,useEffect } from "react";
import { Navigation } from "../Components/NavBar"
import { Footer } from "../Components/footer";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export function Overlay({ active, setActive, max }) {

    //HandleActive
    const handlePrev = () => setActive((prev) => (prev - 1 + max) % max)
    const handleNext = () => setActive((prev) => (prev + 1) % max)

  const [boissons, setBoissons] = useState([]);
  
// FETCH 
  useEffect(() => {
    const fetchBoissons = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/boissons", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setBoissons(data); // stocke les boissons dans l'état
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoissons();
  }, []);

console.log(boissons)

// FETCH 
  useEffect(() => {
    const fetchBoissons = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/boissons", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setBoissons(data); // stocke les boissons dans l'état
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBoissons();
  }, []);

    const htmlDisplay = [
    boissons[0] && { name: boissons[0].name, color: '#d17d2e', description: boissons[0].description },
    boissons[1] && { name: boissons[1].name, color: '#5da3c4', description: boissons[1].description },
    boissons[2] && { name: boissons[2].name, color: '#c50000', description: boissons[2].description },
    boissons[3] && { name: boissons[3].name, color: '#a88256', description: boissons[3].description },
    boissons[4] && { name: boissons[4].name, color: '#badd3d', description: boissons[4].description },
    boissons[5] && { name: boissons[5].name, color: '#f172b2', description: boissons[5].description },
    boissons[6] && { name: boissons[6].name, color: '#101010', description: boissons[6].description },
    ].filter(Boolean); // supprime les "undefined"

  // ← Ici : si htmlDisplay est vide, on retourne un loader
  if (htmlDisplay.length === 0) {
    return <div>Loading...</div>;
  }

    return (
        <>
            <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                max-w-[1920px] w-full h-screen
                grid grid-rows-16 grid-cols-12
                pointer-events-none"
                >

                {/* Navbar */}
                <div className="col-span-12 pointer-events-auto">
                    <Navigation color={htmlDisplay[active]?.color|| "#000"}/>
                </div>


                {/* Margin Top */}
                <div className="
                    col-span-12 row-span-12
                    sm:row-span-11
                    xl:row-span-1"
                    >
                </div>

                {/* Section Main */}
                <div className="hidden col-span-4 row-span-12 xl:flex flex-col leading-none items-center">

                    <div className="w-[60%]">

                        <div className="roboto-regular text-3xl">Take your</div>

                        <div
                            className="roboto-bold text-[10rem] leading-none"
                            style={{ color: htmlDisplay[active].color }}
                        >
                            TIME
                        </div>

                        <div className="roboto-regular text-3xl leading-none">Enjoy our</div>

                        <div
                            className="roboto-bold text-[10rem] leading-none"
                            style={{ color: htmlDisplay[active].color }}
                        >
                            COFFEE
                        </div>

                    </div>

                </div>

                <div className="
                    hidden col-span-4 row-span-12
                    xl:block"
                    >
                </div>

                <div className="
                    grid grid-cols-4 col-span-12 row-span-3 ml-3
                    sm:row-span-4
                    xl:col-span-4 xl:col-start-9 xl:row-span-4 xl:row-start-4"        
                    >

                    {/* Previous Next Button */}
                    <div className="
                        col-span-4 pointer-events-auto
                        flex justify-center justify-evenly items-center gap-4
                        sm:col-span-2 sm:order-2 sm:justify-start
                        lg:col-span-2 lg:order-6"
                        >

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center
                            text-white"
                            onClick={handlePrev}
                            >
                            <GrFormPrevious size={32}  />
                        </button>

                        <button className="
                            w-8 h-8 rounded-full
                            bg-transparent border-2 border-white
                            flex items-center justify-center 
                            text-white"
                            onClick={handleNext}
                            >
                            <GrFormNext size={32}/>
                        </button>

                    </div>

                    {/* Drink Name */}
                    <div className="
                        col-span-4
                        flex justify-center 
                        sm:col-span-2 sm:order-1 sm:justify-start
                        lg:col-span-3 
                        roboto-bold uppercase text-[3rem] m-0 p-0"
                        >
                        {htmlDisplay[active].name}
                    </div>


                    {/* Drink Description */}
                    <div
                    className="hidden col-span-4 order-4 roboto-regular sm:block lg:order-3 lg:col-span-3"
                    dangerouslySetInnerHTML={{ __html: htmlDisplay[active].description }} // permet de ne pas faire apparaitre le html de la description
                    ></div>

                    {/* Nav Button products/recipe */}
                    <div className="
                        col-span-4 order-5 gap-4 pointer-events-auto
                        flex justify-center items-center
                        lg:col-span-2 lg:order-4 lg:justify-start"
                        >

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer"
                            style={{background:htmlDisplay[active].color}}
                            >
                            Add Product
                        </div>

                        <div className="
                            w-[120px] h-[30px]
                            sm:h-[40px]
                            border
                            rounded-lg bg-stone-600
                            flex justify-center items-center
                            text-white uppercase font-bold text-xs
                            cursor-pointer
                            duration-500 ease-in-out
                            hover:bg-stone-300"
                            >
                            See Recipe
                        </div>

                    </div>


                </div>

                {/* Margin Bottom */}
                <div className="
                    col-span-12 h-[10px]
                    xl:block"
                    >
                </div>

                {/* Footer */}
                <div className="col-span-12 pointer-events-auto bg-red-300">
                    <Footer/>
                </div>    
            </div>
        </>
    )
}
