import { Router } from 'express';
import { getProducto, postProducto, getProductoById, updateProducto, deleteProducto } from '../controlador/Productos';

export let producto_router=Router();

producto_router.get('/producto',getProducto);
producto_router.post('/producto',postProducto);
producto_router.get('/producto/:id',getProductoById)
producto_router.put('/producto',updateProducto);
producto_router.delete('/producto/:id',deleteProducto)