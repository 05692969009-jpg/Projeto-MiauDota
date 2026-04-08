import { Request, Response } from 'express';
import { db } from '../database/knex';

export const pedidosController = {
    listar: async (req: Request, res: Response) => {
        try {
            const pedidos = await db('pedido_adocao')
                .join('usuario', 'pedido_adocao.id_usuario', 'usuario.id')
                .join('gato', 'pedido_adocao.id_gato', 'gato.id')
                .select(
                    'pedido_adocao.id',
                    'pedido_adocao.data_horas',
                    'pedido_adocao.status',
                    'usuario.nome as usuario_nome',
                    'gato.nome as gato_nome'
                );
            res.json(pedidos);
        } catch (error) {
            res.status(500).send('Erro ao listar pedidos');
        }
    },

    cadastrar: async (req: Request, res: Response) => {
        try {
            const { id_usuario, id_gato } = req.body;
            await db('pedido_adocao').insert({
                id_usuario,
                id_gato,
                data_horas: new Date(),
                status: 'pendente'
            });
            res.status(201).send('Pedido de adoção realizado!');
        } catch (error) {
            res.status(500).send('Erro ao criar pedido');
        }
    },

    atualizarStatus: async (req: Request, res: Response) => {
        try {
            await db('pedido_adocao').where({ id: req.params.id }).update(req.body);
            res.send('Status atualizado!');
        } catch (error) {
            res.status(500).send('Erro ao atualizar status');
        }
    },

    excluir: async (req: Request, res: Response) => {
        try {
            await db('pedido_adocao').where({ id: req.params.id }).del();
            res.send('Pedido removido!');
        } catch (error) {
            res.status(500).send('Erro ao excluir pedido');
        }
    }
};
