import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { signupService } from "@/resource/services/signup.service";
import Link from "next/link";
import { loginService } from "@/resource/services/login.service";
import toast from "react-hot-toast";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutate({ email: data.email, password: data.password });
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await signupService(data);
      await loginService(data);
    },
    onMutate: (variables) => {
      setIsLoading(true);
    },
    onError: (error, variables, context) => {
      console.log(error);
      toast.error("User already exists! Please sign in");
      setIsLoading(false);
    },
    onSuccess: async (data) => {
      console.log(data);
      toast.success("You have successfully signed up");
      setIsLoading(false);
      router.push("/trade");
    },
  });

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Image src="/DCL_logo_1.png" alt="DCL Logo" width={300} height={0} />

        <div className="w-full max-w-md bg-white mt-3 p-10 shadow-xl rounded-lg border border-blue-500">
          <h1 className="text-2xl font-bold mb-4">Get Started</h1>
          <p className="text-gray-600 mb-8 opacity-50">Create your account now</p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters long.",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password.message}</p>
              )}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
              type="submit"
            >
              Sign up
            </button>
            <p className="text-gray-600">
              {"Have an account? "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
