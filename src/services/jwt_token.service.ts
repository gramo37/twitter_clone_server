import jwt from "jsonwebtoken";

class JWTToken {
  public static async generate_jwt(data: any) {
    let token = jwt.sign(data, process.env.SECRET_KEY ?? "Something Secret", { expiresIn: '1h' });
    return token;
  }
}

export default JWTToken
