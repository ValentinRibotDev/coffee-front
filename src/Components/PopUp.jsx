export function PopUp({ message, color }) {
    return (
        <div
            className={`
                fixed
                flex justify-center items-center
                left-1/2 top-12
                min-w-[240px] 
                transform -translate-x-1/2 
                p-2 rounded-xl shadow-lg roboto-regular uppercase text-white font-bold
                ${color}

                /* ANIMATIONS */
                animate-[fadeSlide_3.0s_ease-out]
            `}
        >
            {message}
        </div>
    );
}