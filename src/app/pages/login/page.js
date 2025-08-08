"use client";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import useForm from "@/app/hooks/useFrom";
import { loginUser } from "@/app/lib/user";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";

const initialFormState = {
  email: "",
  password: ""
};

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { formData, handleChange, resetForm } = useForm(initialFormState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
          email: formData.email,
          password: formData.password,
        };
        const result = await loginUser(user)
        
        if (result) {
          login(result);
          router.push(`/pages/profile/${result._id}`);
        } else {
        }
        resetForm();
      }

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center mt-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            width={400}
            height={70}
            alt="Dorpon"
            src="/b_logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/pages/forget"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={isVisible ? "text" : "password"}
                    required
                    onChange={handleChange}
                    value={formData.password}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                  className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                >
                  {isVisible ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
          <div className="p-2">
            <p className="text-center text-sm/6 text-gray-900">
              Don&apos;t have an account?{" "}
              <Link
                href="/pages/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
            </p>
          </div>
          <div className="my-4 flex items-center gap-4 content-center">
            <hr className="w-7/22 border-gray-700" />
            <span className="text-sm flex text-slate-800 text-center">
              Or continue with
            </span>
            <hr className="w-7/22 border-gray-700" />
          </div>
          <div className="px-3 py-1.5 flex content-center gap-4 items-center justify-center rounded-md border-1">
            <FcGoogle />
            <span className="text-center ">Google</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
