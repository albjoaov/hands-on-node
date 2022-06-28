import Livro from "../models/Livro.js"

class LivroController {

  static create = async (req, res) => {
    const {titulo, editora, numeroPaginas, publicado} = req.body;
    const livroCriado = await Livro.create({titulo, editora, numeroPaginas, publicado})
    return res.status(201).send({livroCriado})
  }

  static update = async (req, res) => {
    const {titulo, editora, numeroPaginas, publicado} = req.body;
    const novoLivro = await Livro.findByIdAndUpdate(req.params.id,
     {titulo, editora, numeroPaginas, publicado}, {returnDocument: "after"})

    return res.status(200).send(
      {novoLivro,
      message: "livro atualizado com sucesso!"})
  }

  static read = async (req, res) => {
    const livroId = req.params.id
    try {
      const livro = await Livro.findById(livroId)
      return res.status(200).send({ livro })
    } catch(error) {
      console.log(error);
      return res.status(500).send({"message": "Olá, nossos desenvolvedores já estão trabalhando na solução! Pfv, aguarde!"})
    }
  }

  static delete = async (req, res) => {
    const livroId = req.params.id
    await Livro.findByIdAndDelete(livroId)
    return res.status(204).send()
  }
}

export default LivroController;