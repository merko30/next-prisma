"use client";

import { ChangeEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import error from "next/error";

interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const [values, setValues] = useState<LoginInput>({
    email: "john@gmail.com",
    password: "password",
  });
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = async (
    event
  ) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (response && response.error) {
      console.log({ response });

      setError(response.error);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <h1>login page</h1>
      <form onSubmit={onSubmit}>
        {error && <p>{error}</p>}
        <label>
          Email
          <input name="email" value={values.email} onChange={onChange} />
        </label>
        <label>
          Password
          <input name="password" value={values.password} onChange={onChange} />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
