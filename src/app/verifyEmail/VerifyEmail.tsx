"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const VerifyEmail = () => {
  const params = useSearchParams()
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)


  useEffect(() => {
    const urlToken = params.get("token");
    setToken(urlToken || '')
  }, [])

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyEmail", { token })
      console.log("verifyemaildata---", response.data)
      setVerified(true);
    } catch (error: any) {
      console.log("Verification failed", error.message)
      setError(true)
    }

  }

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 text-center">

        {/* Title */}
        {verified ?
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Email Verified Successfully
          </h2> :
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Verify Your Email
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Please check your inbox for the verification link.
            </p>
          </div>}


        {/* Token Section */}
        {verified && (
          <div className="mb-6">
            <h2 className="px-4 py-2 bg-orange-500 text-black rounded-lg inline-block font-semibold break-all items-start">
              {token}
            </h2>
          </div>
        )}

        {/* Success Message */}
        {verified && (
          <div className="mb-4">
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              You can now log in to your account.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div>
            <h2 className="text-2xl font-semibold text-red-600">
              ❌ Verification Failed
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              The token is invalid or expired. Please try again.
            </p>
          </div>
        )}

        {/* Action Button */}
        {verified && (
          <button
            className="mt-6 w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg active:scale-95"
            disabled={error || token === ''}
          >
           <Link href= "/login"> Go to Login </Link>
          </button>
        )}
      </div>
    </div>
  );

}



export default VerifyEmail;
