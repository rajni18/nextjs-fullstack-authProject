'use client'

import { useState } from "react"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export interface loginUser {
    email: string;
    password: string
}

const Login = () => {
    const router = useRouter();
    const [userLogin, setUserLogin] = useState<loginUser>({
        email: '',
        password: ''
    })

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false)

    const isLoginFormValid = userLogin.email.trim().length > 0 && userLogin.password.trim().length > 0;

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoginFormValid) {
            toast.error("plz fill the form")
            return
        }
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", userLogin);
            console.log("Login Succesfully", response.data)
            setUserLogin(userLogin)
            router.push('/Profile')

        } catch (error: any) {
            console.log("Login failed", error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-grey p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-slate-200 ">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Login</h1>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition"
                            value={userLogin.email}
                            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}

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
                            value={userLogin.password}
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}

                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2.5 font-semibold rounded-lg transition duration-200 shadow-md ${isLoginFormValid && !loading
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:shadow-lg active:scale-95 cursor-pointer'
                                : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                            }`}
                        disabled={!isLoginFormValid || loading}

                    >
                        {loading ? "Login processing..." : isLoginFormValid ? "Login" : "login"}
                    </button>

                </form>


            </div>
        </div>
    )
}

export default Login