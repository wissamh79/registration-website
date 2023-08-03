"use client";
import React, { useEffect, useState } from "react";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <section className="flex flex-col items-center justify-center w-full h-full py-10 space-y-10">
      <h1 className="">{success ? success : "Welcome Back"}</h1>
      <h2 className="">Please sign in to see the dashboard.</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center space-y-4 w-full md:w-[25%] h-full"
      >
        <Label htmlFor="Password" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="col-span-3"
          type="email"
        />

        <div className="relative w-full">
          <Label htmlFor="Password" className="text-right">
            Password
          </Label>
          <Input
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute right-0 px-3 py-2 top-7 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={password === ""}
          >
            {showPassword ? (
              <Icons.view className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Icons.hide className="w-4 h-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        </div>

        <Button className="w-full" type="submit">
          Login
        </Button>
        {error && error}
      </form>
      {/* <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button> */}
      {/* <span className="">- OR -</span>
      <Button variant="outline">
        <Link className="" href="/dashboard/register">
          Create new account
        </Link>
      </Button> */}
      {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
    </section>
  );
};

export default Login;
