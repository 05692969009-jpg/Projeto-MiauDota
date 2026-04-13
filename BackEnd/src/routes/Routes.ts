import express from 'express'
import { Router } from 'express';
import { 
  listarUsuarios, 
  buscarUsuario, 
  atualizarUsuario, 
  deletarUsuario 
} from '../controllers/usuariosController.js';
import { 
  listarGatos, 
  criarGato, 
  buscarGato, 
  atualizarGato, 
  deletarGato 
} from '../controllers/catController.js';
import { 
  listarPedidos, 
  criarPedido, 
  atualizarPedido, 
  deletarPedido 
} from '../controllers/pedidosController.js';
import { login, registrar } from '../controllers/authcontroller.js';
import { Authmeio } from '../middleware/auth.js';

const routes = Router();

//rota AUTH
routes.post('/login', login)
routes.post('/registrar', registrar)

// --- ROTAS DE USUÁRIOS ---
routes.get('/usuarios', Authmeio, listarUsuarios); //role
routes.get('/usuarios/:id', buscarUsuario); //role
routes.put('/usuarios/:id', Authmeio, atualizarUsuario);
routes.delete('/usuarios/:id', deletarUsuario); //role

// --- ROTAS DE GATOS ---
routes.get('/gatos', listarGatos);
routes.post('/gatos', Authmeio, criarGato);
routes.get('/gatos/:id', buscarGato);
routes.put('/gatos/:id', atualizarGato); //role
routes.delete('/gatos/:id', deletarGato); //role

// --- ROTAS DE PEDIDOS DE ADOÇÃO ---
routes.get('/pedidos', Authmeio, listarPedidos);
routes.post('/pedidos', Authmeio, criarPedido);
routes.patch('/pedidos/:id', Authmeio, atualizarPedido);
routes.delete('/pedidos/:id', deletarPedido); //role

export default routes;
