import {Request,Response} from 'express';
import { Entidad } from '../configuracion/Sequelize';
export let getEntidades=(req:Request,res:Response)=>{
    Entidad.findAll().then((objEntidad:any)=>{
        res.status(200).json({
            mensaje:'OK',
            contenido:objEntidad
        })
    })
}
export let getEntidadById = (req: Request, res: Response) => {
    Entidad.findByPk(req.params.id).then((objEntidad: any) => {
        if (objEntidad) {
            res.status(200).json({
                message: 'Entidad encontrado ',
                Entidad: objEntidad
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Entidad'
            })
        }
    })
}
export let postEntidad=(req:Request,res:Response)=>{
    let objEntidad=Entidad.build(req.body);
    objEntidad.save().then((objEntidadCreado:any)=>{
        res.status(201).json(
            {
                ok:true,
                contenido:objEntidadCreado,
                mensaje:"Entidad Creada correctamente"
            }
        )
    }).catch((error:any)=>{
        res.status(500).json(
            {
                ok:true,
                contenido:error,
                mensaje:"Error interno en el servidor"
            }
        )
    })
}

export let updateEntidad = (req: Request, res: Response) => {
    Entidad.update(
        {
            ent_nom: req.body.Entidad.ent_nom,
            ent_pweb: req.body.Entidad.ent_pweb,
            ent_dir: req.body.Entidad.ent_dir
        },
        {
            where:{
                ent_id:req.body.Entidad.ent_id
            }
        }).then(()=>{
            
            Entidad.findByPk(req.body.Entidad.ent_id).then((objEntidad:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objEntidad
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteEntidad = (req: Request, res: Response) => {
    let {id} = req.params;

    Entidad.destroy({
        where:{
            ent_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Entidad Eliminado",
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

