import { ChangeEvent, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Input from "@/components/Input";

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
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto pt-16">
      <h1 className="text-2xl mb-4">Welcome back</h1>
      <form onSubmit={onSubmit} className="w-full">
        {error && <p>{error}</p>}
        <Input
          value={values.email}
          onChange={onChange}
          name="email"
          label="Email"
          containerClass="mb-2"
        />

        <Input
          value={values.password}
          onChange={onChange}
          label="Password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
