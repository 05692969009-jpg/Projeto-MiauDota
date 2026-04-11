import { db } from "../database/connection.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET || 'miau_dota_secret_key_2024';

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const data = await db("usuario").select("id", "nome", "email", "telefone", "cpf");
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const buscarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db("usuario").where({ id }).select("id", "nome", "email", "telefone", "cpf").first();
    if (!data) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone, cpf, senha } = req.body;
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const [id] = await db("usuario").insert({
      nome, email, telefone, cpf, senha: senhaHash
    });

    return res.status(201).json({ id, message: "Usuário cadastrado com sucesso!" });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await db("usuario").where({ email }).first();

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
    return res.json({ user: { id: user.id, nome: user.nome, email: user.email }, token });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao realizar login" });
  }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dados = { ...req.body };
    if (dados.senha) {
      const salt = await bcrypt.genSalt(10);
      dados.senha = await bcrypt.hash(dados.senha, salt);
    }
    await db("usuario").where({ id }).update(dados);
    return res.json({ message: "Usuário atualizado" });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db("usuario").where({ id }).delete();
    return res.json({ message: "Usuário deletado" });
  } catch (e) {
    return res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
