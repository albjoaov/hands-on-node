import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    "titulo": {
      type: String,
      required: true
    },
    "editora": {
      type: String,
      required: true,
    },
    "numeroPaginas": {
      type: Number,
      required: true,
    },
    "publicado": {
      type: Boolean,
      required: true,
    },
    "criadoEm": {
      type: Date,
      default: Date.now
    }
  }
)

const Livro = mongoose.model('Livro', livroSchema);
export default Livro;