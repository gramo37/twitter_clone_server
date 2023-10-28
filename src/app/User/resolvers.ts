import axios from "axios";
import JWTToken from "../../services/jwt_token.service";
import { prisma } from "../../clients/db";

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
  
      if (!user) return("User not found");
  
      const JWTtoken = await JWTToken.generate_jwt({
        id: user.id,
        email: user.email,
      });
  
      return JWTtoken;
    } catch (error) {
      console.log(error);
      return "Something went wrong"
    }
  },
};

export const resolvers = { queries };
