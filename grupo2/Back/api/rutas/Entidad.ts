import { Router } from "express";
import { postEntidad, getEntidades, getEntidadById, updateEntidad, deleteEntidad } from '../controlador/Entidad';

export let entidad_router=Router();
entidad_router.post('/entidad',postEntidad);
entidad_router.get('/entidad',getEntidades);
entidad_router.get('/entidad/:id',getEntidadById);
entidad_router.put('/entidad',updateEntidad);
entidad_router.delete('/entidad/:id',deleteEntidad);