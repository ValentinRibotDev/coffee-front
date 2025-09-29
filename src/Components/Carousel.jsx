import { useState, useEffect } from "react";

export function Carousel() {

    //IMG Array
    const images = [
        { src: "/img1.jpg", caption: "Première image" },
        { src: "/img2.jpg", caption: "Deuxième image" },
        { src: "/img3.jpg", caption: "Troisième image" },
        { src: "/img3.jpg", caption: "Quatrième image" },
        { src: "/img3.jpg", caption: "Cinquième image" },
    ];

    const [current, setCurrent] = useState(0);

    //Auto Slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

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
                            alt={item.caption}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                            {item.caption}
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}
