import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY ?? "Something Secret";

class JWTToken {
  public static async generate_jwt(data: any) {
    let token = await jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  public static async decode_jwt(token: any) {
    return await jwt.verify(token, SECRET_KEY)
  }
}

export default JWTToken
