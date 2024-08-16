'use client'
import { useState, ChangeEvent, } from 'react';
import {useRouter} from 'next/navigation'
import axios from 'axios';
// Define the shape of the form state
interface FormState {
  email: string;
  password: string;
  username: string;
}

export default function Signup() {
  const router = useRouter();
  // Initialize state with an object
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    username: ''
  });
  const [loading, setloading] = useState(false);


  // Handle changes to form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: any) => {
    try {
      setloading(true);
      const repsonse = await axios.post('/api/users/signup', formState);
      console.log('Signup sucess', repsonse.data);
      router.push('/login');
      
    } catch (error: any) {
      console.log('Signup failed', error.message)
    }finally{
      setloading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{loading ? 'processing...' : 'Signup'}</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-100">username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Signup
        </button>
    </div>
  );
}
