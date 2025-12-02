export function PopUp({ message, color }) {
    return (
        <div
            className={`
                fixed
                flex justify-center items-center
                left-1/2 top-12
                md:left-[8%] md:bottom-9 md:top-auto
                min-w-[200px] max-w-sm
                transform -translate-x-1/2 
                p-3 rounded-xl shadow-lg roboto-regular uppercase text-white font-bold
                ${color}

                /* ANIMATIONS */
                animate-[fadeSlide_3.0s_ease-out]
            `}
        >
            {message}
        </div>
    );
}