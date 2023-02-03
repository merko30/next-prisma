import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const handler: NextApiHandler = async (req, res) => {
  if (!req.body) {
    res.status(401).json("Please provide information");
  }

  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: {
      email: { equals: req.body.email },
    },
  });

  console.log({ b: req.body });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const password = await hash(req.body.password, 10);

  const data = { ...req.body, password };

  const newUser = await prisma.user.create({ data });

  console.log({ newUser });

  res.status(200).json({ message: "User successfully created" });
};

export default handler;
