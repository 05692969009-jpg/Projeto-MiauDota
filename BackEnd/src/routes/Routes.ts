import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  listarUsuarios, buscarUsuario, criarUsuario, 
  login, atualizarUsuario, deletarUsuario
} from "../controllers/usuariosController.js";
import {
  listarGatos, listarGatosCompleto, buscarGato, 
  criarGato, atualizarGato, deletarGato
} from "../controllers/catController.js";
import {
  listarPedidos, solicitarAdocao, atualizarStatusPedido
} from "../controllers/pedidosController.js";

export const router = Router();

// --- ROTAS DE USUÁRIO (E LOGIN) ---
router.post("/login", login);
router.post("/usuarios", criarUsuario);
router.get("/usuarios", authMiddleware, listarUsuarios);
router.get("/usuarios/:id", authMiddleware, buscarUsuario);
router.put("/usuarios/:id", authMiddleware, atualizarUsuario);
router.delete("/usuarios/:id", authMiddleware, deletarUsuario);

// --- ROTAS DE GATO ---
router.get("/gatos", listarGatos);
router.get("/gatos-completo", listarGatosCompleto);
router.get("/gatos/:id", buscarGato);
router.post("/gatos", authMiddleware, criarGato);
router.put("/gatos/:id", authMiddleware, atualizarGato);
router.delete("/gatos/:id", authMiddleware, deletarGato);

// --- ROTAS DE ADOÇÃO (NEGÓCIO) ---
router.get("/pedidos", authMiddleware, listarPedidos);
router.post("/pedidos/solicitar", authMiddleware, solicitarAdocao);
router.patch("/pedidos/:id/status", authMiddleware, atualizarStatusPedido);

