import { useNavigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";


export function InfoProfil () {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const user = [
        {firstname: 'Valentin', lastname: 'Ribot', profilPicture: '', email:'valentinribot91@gmail.com', tel:'0613881968'}
    ]

    const initials = `${user[0].firstname[0]}${user[0].lastname[0]}`

    return (
        <>
            <div className="flex flex-row lg:flex-col p-2 gap-y-2 ">

                <button 
                className="bg-red-500 rounded w-[100px] h-[40px] text-white roboto-regular uppercase"
                onClick={handleLogout}
                >
                    Logout
                </button>

                {/* PROFIL PICTURE */}
                <div className="
                flex justify-center items-center"
                >
                    <div className="
                    flex justify-center items-center 
                    w-[50px] h-[50px] 
                    roboto-bold text-2xl
                    profilPictureBackground rounded-full"
                    >
                        {user[0].profilPicture ?
                        <img src={user[0].profilPicture} alt="Profil" className="w-full h-full rounded-full object-cover"/>
                        : initials}
                    </div>
                </div>

                <div className="ml-5 lg:ml-3">
                    {/* NAME */}
                    <div className="flex flex-row items-center">
                        <p className="m-0 text-xs roboto-bold profilText uppercase">
                            Name:
                        </p>
                        <div className="pl-2 text-xs roboto-regular text-white">
                            {user[0].firstname} {user[0].lastname}
                        </div>     
                    </div>

                    <div className="">
                        {/* EMAIL */}
                        <div className="flex flex-row items-center">
                            <p className="m-0 roboto-bold text-xs profilText uppercase">Email:</p>
                            <div className="pl-2 roboto-regular text-xs text-white">
                                {user[0].email}
                            </div>
                        </div>
                        
                        {/* TEL */}
                        <div className="flex flex-row items-center">
                            <p className="m-0 roboto-bold text-xs profilText uppercase">Teléphone:</p>
                            <div className="pl-2 roboto-regular text-xs text-white">
                                {user[0].tel}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}