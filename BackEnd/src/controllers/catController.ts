import { Request, Response } from 'express';
import { db } from '../database/knex.js';

export const gatosController = {
    listar: async (req: Request, res: Response) => {
        try {
            const gatos = await db('gato').select('*');
            res.json(gatos);
        } catch (error) {
            res.status(500).send('Erro ao listar gatos');
        }
    },

    cadastrar: async (req: Request, res: Response) => {
        try {
            await db('gato').insert(req.body);
            res.status(201).send('Gato cadastrado com sucesso!');
        } catch (error) {
            res.status(500).send('Erro ao cadastrar gato');
        }
    },

    buscarPorId: async (req: Request, res: Response) => {
        try {
            const gato = await db('gato').where({ id: req.params.id }).first();
            res.json(gato);
        } catch (error) {
            res.status(500).send('Erro ao buscar gato');
        }
    },

    atualizar: async (req: Request, res: Response) => {
        try {
            await db('gato').where({ id: req.params.id }).update(req.body);
            res.send('Gato atualizado!');
        } catch (error) {
            res.status(500).send('Erro ao atualizar gato');
        }
    },

    excluir: async (req: Request, res: Response) => {
        try {
            await db('gato').where({ id: req.params.id }).del();
            res.send('Gato excluído!');
        } catch (error) {
            res.status(500).send('Erro ao excluir gato');
        }
    }
};
