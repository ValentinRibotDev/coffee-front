export function PopUp ({ message, color }) {
    return (
        <div className={`fixed bottom-[0%] left-[50%] md:left-[8%] transform -translate-x-1/2 -translate-y-1/2 p-2 rounded shadow-lg roboto-regular uppercase text-white !font-bold ${color}`}>
            {message}
        </div>
    );
}
