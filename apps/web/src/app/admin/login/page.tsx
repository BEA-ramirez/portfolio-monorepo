"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // send data to express
      await axios.post("http://localhost:4000/api/auth/login", data, {
        withCredentials: true,
      });

      router.push("/admin/bea/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="font-mono flex flex-col flex-1 bg-[#0a0a0a] items-center justify-center">
      <div className="w-95 border border-white bg-[#111] rounded-lg p-8 px-12">
        <h1 className="mb-1 text-body font-semibold">~/admin</h1>
        <p className="text-small font-light">Sign in to manage content.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-6"
        >
          {/* Email */}
          <div className="flex flex-col gap-0.5">
            <label className="text-xsmall">email</label>
            <input
              type="email"
              {...register("email", {
                onChange: () => clearErrors("email"),
              })}
              className="border border-white px-3 py-2 rounded-md text-small outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {errors.email && (
              <p className="mt-1 text-xsmall text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-0.5 ">
            <label className="text-xsmall">password</label>
            <input
              type="password"
              {...register("password", {
                onChange: () => clearErrors("password"),
              })}
              className="border border-white px-3 py-2 rounded-md text-small outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            {errors.password && (
              <p className="mt-1 text-xsmall text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 px-4 py-3 text-sm flex items-center justify-center gap-3 bg-violet-500 hover:bg-violet-400 rounded-md cursor-pointer transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
