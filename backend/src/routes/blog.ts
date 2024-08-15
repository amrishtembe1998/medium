import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  PostSchema,
  UpdatePostSchema,
  IdSchema,
  postSchema,
  updatePostSchema,
  idSchema,
} from "@amrishtembe1998/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authorization = c.req.header("Authorization");
  const token = authorization?.split(" ")[1];
  if (!token) {
    c.status(401);
    return c.json({ error: "Please provide JWT token" });
  }
  try {
    const decodedPayload = await verify(token, c.env.JWT_SECRET);
    c.set("userId", decodedPayload.id as string);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ message: "JWT is invalid" });
  }
});

blogRouter.post("/", async (c) => {
  const validationResult = postSchema.safeParse(await c.req.json());
  if (!validationResult.success) {
    return c.json({
      message: "Input validation failed",
      error: validationResult.error,
    });
  }
  try {
    const { title, content, published }: PostSchema = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = String(c.get("userId"));

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId,
      },
    });

    return c.json({
      message: "Blog post created successfully",
      postId: post.id,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json({ error: "Failed to create post" }, 500);
  }
});

blogRouter.put("/", async (c) => {
  const validationResult = updatePostSchema.safeParse(await c.req.json());
  if (!validationResult.success) {
    return c.json({
      message: "Input validation failed",
      error: validationResult.error,
    });
  }
  try {
    const body = updatePostSchema.parse(await c.req.json());
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = String(c.get("userId"));

    const { id, title, content, published }: UpdatePostSchema = body;
    const post = await prisma.post.update({
      where: {
        id,
        authorId,
      },
      data: {
        title,
        content,
        published,
      },
    });

    return c.json({
      message: "Blog post updated successfully",
      postId: post.id,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json({ error: "Failed to update post" }, 500);
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const page = parseInt(c.req.query("page") || "1") || 1;
  const limit = parseInt(c.req.query("limit") || "10") || 10;
  const skip = (page - 1) * limit;
  console.log(`page: ${page}, limit: ${limit}, skip: ${skip}`);
  try {
    const blogs = await prisma.post.findMany({ skip: skip, take: limit });
    return c.json(blogs);
  } catch (error) {
    return c.json({ error });
  }
});

blogRouter.get("/:id", async (c) => {
  const validationResult = idSchema.safeParse(c.req.param("id"));
  if (!validationResult.success) {
    return c.json({
      message: "Input validation failed",
      error: validationResult.error,
    });
  }
  try {
    const id: IdSchema = idSchema.parse(c.req.param("id"));
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    return c.json({ post });
  } catch (error) {
    console.error("Error creating blogs:", error);
    return c.json({ error: "Failed to fetch blogs" }, 500);
  }
});
