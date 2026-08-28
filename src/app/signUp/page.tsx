'use client'
import { FormEvent, useState} from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface User{
    userName : string;
    email : string;
    password : string
}

const SignUp = () => {
    const router = useRouter();

    const [user,setUser] = useState<User>({
        userName : '',
        email : '',
        password : ''
    })

    const [loading,setLoading] = useState<boolean>(false);

    const isFormValid = user.userName.trim().length > 0 && 
                        user.email.trim().length > 0 && 
                        user.password.length > 0;

    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        // Extra validation check
        if (!isFormValid) {
            toast.error("Please fill all fields");
            return;
        }

        try{
            setLoading(true)
            const response = await axios.post("/api/users/signUp",user);
            console.log("signUp success",response.data);
            toast.success("Account created! Redirecting...");
            router.push("/verifyEmail")
        }catch(error:any){
            console.log("Signup failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen bg-grey p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
                    <p className="text-slate-600 dark:text-slate-400">Join us today and get started</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="userName" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Full Name
                        </label>
                        <input
                            id="userName"
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition"
                            value={user.userName}
                            onChange={(e)=>setUser({...user,userName:e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition"
                            value={user.email}
                            onChange={(e)=>setUser({...user,email:e.target.value})}
                            
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition"
                            value={user.password}
                            onChange={(e)=>setUser({...user,password:e.target.value})}
                            
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid || loading}
                        className={`w-full py-2.5 font-semibold rounded-lg transition duration-200 shadow-md ${
                            isFormValid && !loading
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg active:scale-95 cursor-pointer'
                                : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                        }`}
                    >
                        {loading ? "Creating Account..." : isFormValid ? "Sign Up" : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp