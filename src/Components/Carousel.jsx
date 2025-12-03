import { useState, useEffect } from "react";

export function Carousel() {

    //IMG Array
    const images = [
        { src: "/Promo/Noel.jpg" },
        { src: "/Promo/Cup.jpg" },
        { src: "/Promo/matcha.jpg"},
    ];

    const [current, setCurrent] = useState(0);

    //Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <div className="relative w-full h-56 sm:h-64 lg:h-80 overflow-hidden">
                {images.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
                        >

                        <img
                            src={item.src}
                            className="w-full h-full object-cover"
                        />

                    </div>
                ))}
            </div>
        </>
    );
}
