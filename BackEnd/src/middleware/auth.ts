import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const Authmeio = async (req: Request, res: Response, next:NextFunction) => {
 const authcabeca = req.headers.authorization
 if(!authcabeca || !authcabeca.startsWith('Bearer')){
    res.status(401).json({message:"quem é vc?"})
 }
 const token = authcabeca?.split(' ')[1]
 try{
    const descodificado = jwt.verify(token as string,"miaudotasupersecreto") as any
    (req as any).usuario = descodificado
    next()

 }catch{
    return res.status(401).json({message: "token invalido ou expirado"})
 }
};
