import {useContext} from "react";
import {AuthContext} from "../CustomLogic/AuthProvider.jsx";


function Profiles() {
    const {authStatus} = useContext(AuthContext);
    const profiles = [...authStatus.userCredentials.profiles]
    return (
        <main className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-5">
                <section className=" bg-white p-[10%] w-[700px] rounded-xl">
                    {profiles.map((profile, index) => (
                    <div key={index} className="p-4 border rounded-md mb-2">
                        <p className="text-lg font-bold">Username: {profile.username}</p>
                    </div>
                ))}
                </section>
            </div>
        </main>
    );
}

export default Profiles;