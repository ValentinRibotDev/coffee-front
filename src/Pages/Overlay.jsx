import React, { useState,useEffect } from "react";
import { Navigation } from "../Components/NavBar"



export function Overlay({ active, setActive, max }) {

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

    const htmlDisplay = [
    boissons[0] && { name: boissons[0].name, color: '#d17d2e', description: boissons[0].description },
    boissons[1] && { name: boissons[1].name, color: '#c50000', description: boissons[1].description },
    ].filter(Boolean); // supprime les "undefined"

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
                    <Navigation color={htmlDisplay[active].color}/>
                </div>


                {/* Margin Top */}
                <div className="
                    col-span-12 row-span-11
                    xl:row-span-1"
                >
                </div>

                {/* Section Main */}
                <div className="
                    hidden col-span-4 row-span-12
                    xl:block
                    bg-green-300"
                >
                    Slogan
                </div>

                <div className="
                    hidden col-span-4 row-span-12
                    xl:block"
                >
                    Canvas
                </div>

                <div className="
                    grid grid-cols-4 col-span-12 row-span-3
                    xl:col-span-4 xl:col-start-9 xl:row-span-6 xl:row-start-6
                    bg-purple-300"
                >

                    <div className="
                        col-span-4 pointer-events-auto
                        sm:col-span-2 sm:order-2 
                        lg:col-span-2 lg:order-6"
                    >
                        <button onClick={handlePrev}>Prev</button>
                        <button onClick={handleNext}>Next</button>
                    </div> 

                    <div className="
                        col-span-4 
                        sm:col-span-2 sm:order-1 
                        lg:col-span-3"
                    >
                        Nom
                    </div>

                    <div className="
                        hidden 
                        lg:block lg:order-2"
                    >
                        Awards
                    </div>

                    <div className="
                        hidden col-span-4 order-4
                        sm:block 
                        lg:order-3"
                    >
                        Description
                    </div>

                    <div className="
                        col-span-4 order-5 pointer-events-auto
                        lg:col-span-2 lg:order-4"
                    >
                        Nav
                    </div>    
                </div>

                {/* Margin Bottom */}
                <div className="
                    hidden col-span-12
                    xl:block"
                >
                    margin bottom
                </div>

                {/* Footer */}
                <div className="col-span-12 pointer-events-auto bg-red-300">footer</div>    
            </div>
        </>
    )
}
