
import { Request, Response } from "express";
import { db } from "../database/connection.js";

  export const listarUsuarios = async (req: Request, res: Response) =>{
    try {
    const data = await db("usuario").select("*");
    return res.json(data);
  } catch (e) {
    return res.status(500).send("Erro ao listar usuários");
  }
};

  export const buscarUsuario = async (req: Request, res: Response) => {
    try {
    const { id } = req.params;
    const data = await db("usuario").where({ id }).select("*");
    return res.json(data);
  } catch (e) {
    return res.status(500).send("Erro ao buscar usuário");
  }
};


export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {nome, email, telefone, cpf, senha} = req.body
    await db("usuario").where({ id }).update({nome, email, telefone, cpf, senha});
    return res.send("Atualizado!");
  } catch (e) {
    return res.status(500).send("Erro ao atualizar usuário");
  }
};

export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db("usuario").where({ id }).delete();
    return res.send("Excluído!");
  } catch (e) {
    return res.status(500).send("Erro ao excluir usuário");
  }
};

