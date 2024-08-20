"use client"

import axios from "axios";
import { useRouter} from "next/navigation";
import { useState } from "react";


export default function Profile() {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const logout = async () => {
    try {
      setloading(true);
      const reqBody = await axios.get('/api/users/logout')
      console.log(reqBody);
      router.push('/login')
            
    } catch (error: any) {
      console.log('Logout failed', error.message)
    }finally{
      setloading(false)
    }
  }
  const getUserDetail = async () => {
    try {
      setloading(true);
      const res = await axios.get('/api/users/getuser')
      router.push(`/profile/${res?.data?.data?.username}`)    
    } catch (error: any) {
      console.log('get user failed', error.message)
    }finally{
      setloading(false)
    }
    
    
  }

  return (

    <>
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{loading ? 'processing..' : 'Profile Page'}</h2>
        <button
          onClick={logout}
          type="submit"
          className="w-full mb-4 py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          logout
        </button>
        <button
          onClick={getUserDetail}
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Get user details
        </button>
    </div>
    </>

    
  )
}
