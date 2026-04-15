import {db} from "../database/connection.js";
import { Request, Response } from "express";
export const listarGatos = async (req: Request, res: Response) => {
  try {
    const gatos = await db("gato").select("*");
    return res.json(gatos);
  } catch (error) {
    return res.status(500).send("Erro ao listar gatos");
  }
};

export const listarGatosCompleto = async (req: Request, res: Response) => {
  try {
    const data = await db("gato")
      .select(
        "gato.*",
        "usuario.nome as protetor"
      )
      .innerJoin("usuario", "gato.id_usuario", "usuario.id");
    return res.json(data);
  } catch (error) {
    return res.status(500).send("Erro ao listar gatos completo");
  }
};

export const buscarGato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gato = await db("gato").where({ id }).first();
    return res.json(gato);
  } catch (error) {
    return res.status(500).send("Erro ao buscar gato");
  }
};

export const criarGato = async (req: Request, res: Response) => {
  console.log("FUI CHAMADO");
  

  try {
    console.log(req.body);
    
    const { nome, raca, idade, descricao, sexo, foto_principal, castrado, vacinado } = req.body;
    console.log(typeof vacinado);
    console.log(typeof castrado);
    
    const id_usuario = 1
const cadastrado = true
    const [id] = await db("gato").insert({
      nome,
      raca,
      idade,
      descricao,
      sexo,
      foto_principal,
      cadastrado: cadastrado || false,
      castrado: castrado || false,
      vacinado: vacinado || false,
      id_usuario
    });

    return res.status(201).json({ id, message: "Gato cadastrado com sucesso!" });
  } catch (error) {
    return res.status(500).send("Erro ao cadastrar gato");
  }
};

export const atualizarGato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, raca, idade, descricao, sexo, porte, foto_principal, cadastrado, vacinado, id_usuario } = req.body;

    await db("gato")
      .where({ id })
      .update({ 
          nome, 
          raca, 
          idade, 
          descricao, 
          sexo, 
          porte, 
          foto_principal, 
          cadastrado, 
          vacinado, 
          id_usuario 
      });

    return res.json({ message: "Gato atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).send("Erro ao atualizar gato");
  }
};

export const deletarGato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db("gato").where({ id }).delete();
    return res.send("Gato excluído!");
  } catch (error) {
    return res.status(500).send("Erro ao excluir gato");
  }
};
