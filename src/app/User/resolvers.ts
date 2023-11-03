import axios from "axios";
import JWTToken from "../../services/jwt_token.service";
import { prisma } from "../../clients/db";
import { User } from "@prisma/client";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      const googleToken = token;
      const googleAuthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
      googleAuthURL.searchParams.set("id_token", googleToken);
      const { data } = await axios.get(googleAuthURL.toString(), {
        responseType: "json",
      });

      const { email, picture, given_name, family_name } = data;

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Create User
        user = await prisma.user.create({
          data: {
            firstName: given_name,
            email,
            lastName: family_name,
            profileImageURL: picture,
          },
        });
      }

      if (!user) return "User not found";

      const JWTtoken = await JWTToken.generate_jwt({
        id: user.id,
        email: user.email,
      });

      return JWTtoken;
    } catch (error) {
      console.log(error);
      return "Something went wrong";
    }
  },
  getUserInfo: async (parent: any, args: any, context: any) => {
    try {
      const { auth } = context;
      if (!auth) throw new Error("Kindly Login!");
      const user = await JWTToken.decode_jwt(auth.split(" ")[1]);
      if (!user || typeof user === "string")
        throw new Error("Wrong or expired token recieved!");
      let userInfo = await prisma.user.findUnique({
        where: { email: user.email },
      });
      return userInfo;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

const extraResolvers = {
  User: {
    tweets: (parent: User) => {
      return prisma.tweet.findMany({ where: { authorId: parent.id } });
    },
  },
};

export const resolvers = { queries, extraResolvers };
