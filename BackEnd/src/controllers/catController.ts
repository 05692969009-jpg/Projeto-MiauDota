import { db } from "../database/connection.js";
import { Request, Response } from "express";


export const listarGatos = async (req: Request, res: Response) => {
  const data = await db("gato").select("*");
  return res.json(data);
};

export const listarGatosCompleto = async (req: Request, res: Response) => {
  const data = await db("gato")
    .select("gato.*", "usuario.nome as protetor_nome")
    .innerJoin("usuario", "gato.id_usuario", "usuario.id");
  return res.json(data);
};

export const buscarGato = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await db("gato").where({ id }).first();
  if (!data) return res.status(404).json({ error: "Gato não encontrado" });
  return res.json(data);
};

export const criarGato = async (req: Request, res: Response) => {
  try {
    const [id] = await db("gato").insert(req.body);
    return res.status(201).json({ id, message: "Gato cadastrado com sucesso!" });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao cadastrar gato" });
  }
};

export const atualizarGato = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db("gato").where({ id }).update(req.body);
  return res.json({ message: "Gato atualizado com sucesso" });
};

export const deletarGato = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db("gato").where({ id }).delete();
  return res.json({ message: "Gato deletado" });
};
