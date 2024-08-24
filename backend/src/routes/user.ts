import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
  SignUpSchema,
  SignInSchema,
  signUpSchema,
  signInSchema,
  idSchema,
  IdSchema,
} from "@amrishtembe1998/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const validationResult = signUpSchema.safeParse(await c.req.json());
  if (!validationResult.success) {
    return c.json({
      message: "Input validation failed",
      error: validationResult.error,
    });
  }
  const { name, email, password }: SignUpSchema = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const signedJWT = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ message: "Signed up successfully", jwtToken: signedJWT });
  } catch (error) {
    c.status(411);
    return c.json({ error });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const validationResult = signInSchema.safeParse(await c.req.json());
  if (!validationResult.success) {
    return c.json({
      message: "Input validation failed",
      error: validationResult.error,
    });
  }
  const { email, password }: SignInSchema = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });
  if (!user) {
    c.status(404);
    return c.json({ error: "User not found" });
  }
  const signedJWT = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ message: "Signed In successfully", jwtToken: signedJWT });
});
