"use client";

import { useSession } from "next-auth/react";

const UserGreeting = () => {
  const { data } = useSession();

  console.log({ data });
  if (data) {
    return <p>{data!.user!.email}</p>;
  }

  return null;
};

export default UserGreeting;
