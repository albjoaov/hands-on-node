import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class AuthController {

  static gerarToken(param) {
    return jwt.sign(param, process.env.API_SECRET, {
      expiresIn: 86400
    })
  }

  static userRegister = async(request, response) => {
    const { email, name, password } = request.body;
    // const email = request.body.email
    // const name = request.body.name
    // const password = request.body.password

    const possibleUser = await User.findOne({email})
    if(possibleUser)
      return response.status(400).send({error: "Usuário com e-mail já cadastrado"})

    const user = await User.create({ email, name, password })
    user.password = undefined;
    return response.status(200).send(
      {"message": "Usuário cadastrado com sucesso",
       user
      })
  }

  static auth = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user)
      return res.status(400).send({error: "Usuário não encontrado"})

    const aSenhaEhIgual = await bcrypt.compare(password, user.password)
    if(!aSenhaEhIgual)
      return res.status(400).send({error: "A senha é inválida"})

    user.password = undefined

    return res.send({
      user,
      token: this.gerarToken({id: user.id})
    })


  }
}

const auth2 = function name(req, res) {
  return res.send({})
}

export { auth2 }
export default AuthController;