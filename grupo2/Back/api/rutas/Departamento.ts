import { Router } from 'express';
import { getDepartamento, postDepartamento, getDepartamentoById, updateDepartamento, deleteDepartamento } from '../controlador/Departamento';

export let Departamento_router=Router();

Departamento_router.get('/dep',getDepartamento);
Departamento_router.post('/dep',postDepartamento);
Departamento_router.get('/dep/:id',getDepartamentoById)
Departamento_router.put('/dep',updateDepartamento);
Departamento_router.delete('/dep/:id',deleteDepartamento)