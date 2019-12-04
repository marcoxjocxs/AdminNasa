import { Router } from 'express';
import { postPersona, getPersona, updatePersona, getPersonaById, deletePersona } from '../controlador/Persona';


export let persona_router= Router();
persona_router.post('/persona',postPersona);
persona_router.get('/persona',getPersona);
persona_router.get('/persona/:id',getPersonaById);
persona_router.put('/persona',updatePersona);
persona_router.delete('/persona/:id',deletePersona);