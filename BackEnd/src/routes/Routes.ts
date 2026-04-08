import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController.js';
import { gatosController } from '../controllers/catController.js';
import { pedidosController } from '../controllers/pedidosController.js';

const routes = Router();

// --- ROTAS DE USUÁRIOS ---
routes.get('/usuarios', usuariosController.listar);
routes.post('/usuarios', usuariosController.cadastrar);
routes.get('/usuarios/:id', usuariosController.buscarPorId);
routes.put('/usuarios/:id', usuariosController.atualizar);
routes.delete('/usuarios/:id', usuariosController.excluir);

// --- ROTAS DE GATOS ---
routes.get('/gatos', gatosController.listar);
routes.post('/gatos', gatosController.cadastrar);
routes.get('/gatos/:id', gatosController.buscarPorId);
routes.put('/gatos/:id', gatosController.atualizar);
routes.delete('/gatos/:id', gatosController.excluir);

// --- ROTAS DE PEDIDOS DE ADOÇÃO ---
routes.get('/pedidos', pedidosController.listar);
routes.post('/pedidos', pedidosController.cadastrar);
routes.patch('/pedidos/:id', pedidosController.atualizarStatus);
routes.delete('/pedidos/:id', pedidosController.excluir);

export default routes;
