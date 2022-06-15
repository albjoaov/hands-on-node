import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController {

  static userRegister = async (request, response) => {
    const { email } = request.body;

    const possibleUser = await User.findOne({ email })
    if (possibleUser) {
      return response.status(400).send({ error: "Usuário já cadastrado"})
    }

    const user = await User.create(request.body)
    user.password = undefined;
    return response.status(200).send({ user })
  }

  static login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({error: "Usuário não encontrado"})

    const isTheSame = await bcrypt.compare(password, user.password)
    if (!isTheSame) {
      return res.status(400).send({error: "Credenciais incorretas!"})
    }

    user.password = undefined
    return res.send(
      {
        user,
        token: this.generateToken(user)
      }
    )
  }

  static generateToken(user) {
    return jwt.sign({id: user.id, name: user.name}, process.env.API_SECRET, {expiresIn: 86400})
  }
}

export default AuthController;
