import { Tweet } from "@prisma/client";
import { prisma } from "../../clients/db";
import JWTToken from "../../services/jwt_token.service";

interface CreateTweetData {
  content: string;
  imageURL?: string;
}

const queries = {
  getAllTweets: async () => {
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
    });
    return tweets;
  },
};

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetData },
    ctx: any
  ) => {
    if (!ctx.auth) throw new Error("You are not authenticated!!");
    const user = await JWTToken.decode_jwt(ctx.auth.split(" ")[1]);
    if (!user || typeof user === "string")
      throw new Error("Wrong or expired token recieved!");
    const tweet = await prisma.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: user.id } },
      },
    });
    return tweet;
  },
};

const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) => {
      return prisma.user.findUnique({ where: { id: parent.authorId } });
    },
  },
};

export const resolvers = { mutations, extraResolvers, queries };
