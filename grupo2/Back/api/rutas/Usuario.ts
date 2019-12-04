import { Router } from 'express';
import { postUsuario, getUsuario, updateUsuario, getUsuarioById, deleteUsuario } from '../controlador/Usuario';

export let usuario_router=Router();
usuario_router.post('/usuario', postUsuario);
usuario_router.get('/usuario', getUsuario);
usuario_router.get('/usuario/:id',getUsuarioById);
usuario_router.put('/usuario',updateUsuario);
usuario_router.delete('/usuario/:id_usuario',deleteUsuario);