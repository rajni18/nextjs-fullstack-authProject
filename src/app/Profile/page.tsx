'use client'

import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Profile() {
  const router = useRouter();
  const [userInfo , setUserInfo] = useState<object>({})

  useEffect(()=>{
    fetchUserData();
  },[])

  const handleLogout=async()=>{
    try{
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully")
      router.push('/login')
    }catch(error:any){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const fetchUserData = async()=>{
    try{ 
      const response = await axios.post("/api/users/Profile");
      console.log(response.data)
      setUserInfo(response.data.data)
    }catch(error :any){
      console.log("Error in fetching Data",error.message)
      toast.error("User not found",error.message)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">AuthApp</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Welcome Banner */}
      <div className="bg-blue-500 text-white min-h-screen">
      <header className="text-center py-12">
        <h2 className="text-3xl font-semibold">Welcome back!</h2>
        <p className="mt-2 text-lg">You are successfully logged in 🎉</p>
      </header>

      {/* Content Section */}
      <main className="p-8 flex flex-col items-center text-lg">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
          <h3 className="text-3xl font-bold text-gray-800">Your Dashboard</h3>
          <p className="text-gray-600 mt-4">
            User Name: {userInfo.userName}
          </p>
          <p className="text-gray-600">Email: {userInfo.email}</p>

          
        </div>
      </main>

      </div>
    </div>
  );
}
