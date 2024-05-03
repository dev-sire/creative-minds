import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login(){
    const googleProvider = new GoogleAuthProvider();
    const[user, loading] = useAuthState(auth);
    const route = useRouter();
    const googleLogin = async() => {
        try{
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);
            route.push("/");
            
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        if(user){
            route.push("/");
        }else{
            console.log("Login in now!");
        }
    }, [user])

    return(
        <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg dark:bg-[#011222] dark:text-white">
            <h2 className="text-2xl font-medium">Join Today!</h2>
            <div className="py-4">
                <h3 className="py-4">Sign in with of our Providers</h3>
                <button onClick={googleLogin} className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2">
                    <FcGoogle className="text-2xl" />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}