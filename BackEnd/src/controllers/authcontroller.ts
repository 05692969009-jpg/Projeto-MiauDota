import { Request, Response } from "express";
import { db } from "../database/connection.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const registrar = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone, cpf, senha } = req.body;
    
    const usuarioExiste = await db("usuario").select('*').where({email}).first()

    if(usuarioExiste){
        res.status(409).json({message: "Email ja cadastrado"})
    }
    

    const hash = await bcrypt.hash(senha,10)

    console.log(hash);
    
    const id = await db("usuario").insert({
      nome,
      email,
      telefone,
      cpf,
      senha:hash,
    });
    console.log(id);
    
  return res.json({ id });
  
  } catch (e) {
    return res.status(500).send("Erro ao cadastrar usuário");
  }
};

export const login = async (req:Request, res:Response) =>{
    const {email,senha} = req.body
    const usuario:any = await db("usuario").select("*").where({email}).first()
    if(!usuario){
        res.status(401).json({message: "usuario não encontrado"})
    }
    const senhaHash = await bcrypt.compare(senha, usuario.senha)
     if(!senhaHash){
        res.status(401).json({message: "usuario não encontrado"})
     }
     const token = jwt.sign(
        {id:usuario.id, email:usuario.email},
        'miaudotasupersecreto',
        {expiresIn:'1d'}
     )
     res.status(201).json({token})
}