"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEventHandler, useState } from "react";

interface RegisterInput {
  email: string;
  password: string;
}

const Register = () => {
  const [values, setValues] = useState<RegisterInput>({
    email: "john@gmail.com",
    password: "password",
  });
  const [error, setError] = useState(null);

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

    const response = await axios("/api/auth/register", {
      method: "POST",
      data: values,

      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log({ response });

    if (response.status === 200) {
      router.push("/login");
    } else {
      const { data } = await response;
      setError(data.error);
    }
  };

  return (
    <>
      <h1>Register page</h1>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
