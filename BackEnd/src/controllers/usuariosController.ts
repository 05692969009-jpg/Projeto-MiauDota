import { Request, Response } from 'express';
import { db } from '../database/knex.js';

export const usuariosController = {
    listar: async (req: Request, res: Response) => {
        try {
            const result = await db('usuario');
            res.json(result);
        } catch (e) {
            res.status(500).send('Erro ao listar usuários');
        }
    },

    cadastrar: async (req: Request, res: Response) => {
        try {
            await db('usuario').insert(req.body);
            res.status(201).send('Usuário cadastrado!');
        } catch (e) {
            res.status(500).send('Erro ao cadastrar usuário');
        }
    },

    buscarPorId: async (req: Request, res: Response) => {
        try {
            const result = await db('usuario').where({ id: req.params.id }).first();
            res.json(result);
        } catch (e) {
            res.status(500).send('Erro ao buscar usuário');
        }
    },

    atualizar: async (req: Request, res: Response) => {
        try {
            await db('usuario').where({ id: req.params.id }).update(req.body);
            res.send('Atualizado!');
        } catch (e) {
            res.status(500).send('Erro ao atualizar usuário');
        }
    },

    excluir: async (req: Request, res: Response) => {
        try {
            await db('usuario').where({ id: req.params.id }).del();
            res.send('Excluído!');
        } catch (e) {
            res.status(500).send('Erro ao excluir usuário');
        }
    }
};
