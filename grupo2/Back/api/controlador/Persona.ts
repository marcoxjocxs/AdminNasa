import { Request, Response } from 'express';
import { Persona } from '../configuracion/Sequelize';
export let getPersona = (req: Request, res: Response) => {
    Persona.findAll().then((objPersona: any) => {
        res.status(200).json({
            mensaje: 'OK',
            contenido: objPersona
        })
    })
}

export let getPersonaById = (req: Request, res: Response) => {
    Persona.findByPk(req.params.id).then((objPersona: any) => {
        if (objPersona) {
            res.status(200).json({
                message: 'Persona encontrado ',
                Persona: objPersona
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Persona'
            })
        }
    })
}
export let postPersona = (req: Request, res: Response) => {
    let objPersona = Persona.build(req.body);
    objPersona.save().then((objPersonaCreado: any) => {
        res.status(201).json(
            {
                ok: true,
                contenido: objPersonaCreado,
                mensaje: "Persona Creada correctamente"
            }
        )
    }).catch((error: any) => {
        res.status(500).json(
            {
                ok: true,
                contenido: error,
                mensaje: "Error interno en el servidor"
            }
        )
    })
}

/** @updatePersona funcion para actualizar datos de persona*/

export let updatePersona = (req: Request, res: Response) => {
    Persona.update(
        {
            per_nom: req.body.Persona.per_nom,
            per_ape: req.body.Persona.per_ape,
            per_tel: req.body.Persona.per_tel,
            per_dir: req.body.Persona.per_dir
        },
        {
            where:{
                per_id:req.body.Persona.per_id
            }
        }).then(()=>{
            
            Persona.findByPk(req.body.Persona.per_id).then((objPersona:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objPersona
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deletePersona = (req: Request, res: Response) => {
    let {id} = req.params;

    Persona.destroy({
        where:{
            per_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Persona Eliminado",
                id:id
            }
            res.status(200).send(rpta);
        }else{
            let rpta = {
                success:false,
                message:'No se ha Eliminado',
                id:''
            }
            res.status(500).send(rpta);
        }
    })
}

