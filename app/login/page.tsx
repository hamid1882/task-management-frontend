/* eslint-disable */
"use client";

import { Tab, Tabs } from "@heroui/tabs";
import React, { useState } from "react";

import LoginForm from "@/components/LoginForm";
import { authService } from "@/services/api";
import { useRouter } from "next/navigation";
import { authUtils } from "@/utils/auth";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    isSignup: boolean
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isSignup) {
      try {
        const response = await authService.signup({ email, password });
        if (response.data.token) {
          authUtils.setToken(response.data.token);
        }

        setError("");
        router.push("/"); // Redirect after successful signup
      } catch (err: any) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await authService.login({ email, password });
        if (response.data.token) {
          authUtils.setToken(response.data.token);
        }
        setError("");
        router.push("/"); // Redirect after successful login
      } catch (err: any) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center my-[56px]">
      <div className="w-fit space-y-[16px] overflow-hidden">
        <Tabs>
          <Tab key="login" title="Login">
            <LoginForm
              onSubmit={onSubmit}
              submitted={submitted}
              signup={false}
              loading={loading}
            />
          </Tab>
          <Tab key="signup" title="Signup">
            <LoginForm
              onSubmit={onSubmit}
              submitted={submitted}
              signup={true}
              loading={loading}
            />
          </Tab>
        </Tabs>
      </div>
      {error ? <p className="text-red-800">{error}</p> : <></>}
    </div>
  );
}
