/* eslint-disable */

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React, { useState } from "react";

function LoginForm({
  onSubmit,
  submitted,
  signup,
  loading,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, isSignup: boolean) => void;
  submitted: any;
  signup: boolean;
  loading: boolean;
}) {
  const [password, setPassword] = useState("");

  return (
    <Form className="w-full max-w-md" onSubmit={(e) => onSubmit(e, signup)}>
      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        className="min-w-full sm:min-w-[380px]"
      />
      <Input
        isRequired
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
        className="min-w-full sm:min-w-[380px]"
        onChange={(e) => setPassword(e.target.value)}
      />
      {signup ? (
        <Input
          isRequired
          label="Confirm Password"
          labelPlacement="outside"
          name="confirm password"
          placeholder="Confirm your password"
          type="password"
          className="min-w-full sm:min-w-[380px]"
          validate={(value) => {
            if (value !== password) {
              return "Passwords do not match";
            }
          }}
        />
      ) : (
        <></>
      )}
      <Button
        isLoading={loading}
        type="submit"
        variant="bordered"
        className="my-[16px]"
      >
        Submit
      </Button>
      {submitted && (
        <div className="text-small text-default-500">
          You submitted:{" "}
          <p className="whitespace-normal">{JSON.stringify(submitted)}</p>
        </div>
      )}
    </Form>
  );
}

export default LoginForm;
