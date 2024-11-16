import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Register from './Register'; 

const loginSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  onClose: () => void;
}

function Login({ onClose }: LoginProps) {
  const [showRegister, setShowRegister] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Add your login logic here JJ
  };

  return (
    <>
      
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)} 
        />
      )}

      {!showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-80">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={onClose}
            >
              <AiOutlineClose size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  {...register("username")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Don't have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setShowRegister(true)} 
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
