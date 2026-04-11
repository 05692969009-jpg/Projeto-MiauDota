import { db } from "../database/connection.js";
import { Request, Response } from "express";

export const listarPedidos = async (req: Request, res: Response) => {
  const data = await db("pedido_adocao")
    .select("pedido_adocao.*", "usuario.nome as adotante", "gato.nome as gato")
    .innerJoin("usuario", "pedido_adocao.id_usuario", "usuario.id")
    .innerJoin("gato", "pedido_adocao.id_gato", "gato.id");
  return res.json(data);
};

export const solicitarAdocao = async (req: Request, res: Response) => {
  const { id_usuario, id_gato } = req.body;

  // Verificar se o gato existe e se já foi adotado
  const gato = await db("gato").where({ id: id_gato }).first();
  if (!gato) return res.status(404).json({ error: "Gato não encontrado" });
  
  // Lógica de "Estoque": se já estiver adotado, não pode solicitar
  if (gato.cadastrado === 0) { // Exemplo usando o campo que você tem
     // Aqui você poderia ter um campo 'status' no gato
  }

  const [id] = await db("pedido_adocao").insert({
    id_usuario,
    id_gato,
    data_horas: db.fn.now(),
    status: "pendente"
  });

  return res.status(201).json({ id, message: "Solicitação de adoção enviada!" });
};

export const atualizarStatusPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // pendente, recusado, feito

  await db("pedido_adocao").where({ id }).update({ status });
  
  return res.json({ message: `Status do pedido atualizado para: ${status}` });
};
