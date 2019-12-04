import { Request, Response } from 'express';
import { Usuario } from '../configuracion/Sequelize';

export let getUsuario = (res: Response, req: Request) => {
    Usuario.finAll.then((objUsuario: any) => {
        res.status(200).json({
            mensaje: 'ok',
            content: objUsuario
        })
    })
}
export let getUsuarioById = (req: Request, res: Response) => {
    Usuario.findByPk(req.params.id).then((objUsuario: any) => {
        if (objUsuario) {
            res.status(200).json({
                message: 'Usuario encontrado ',
                usuario: objUsuario
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al usuario'
            })
        }
    })
}
export let postUsuario = (req: Request, res: Response) => {
    let objUsuario = Usuario.build(req.body);
    objUsuario.save().then((objUsuarioCreado: any) => {
        res.status(201).json(
            {
                ok: true,
                content: objUsuarioCreado,
                mensaje: "Usuario creado correctamente"
            }
        )
    }).catch((error: any) => {

        res.status(500).json(
            {
                ok: true,
                content: error,
                mensaje: "Error interno del servidor"
            }
        )
    })
}



/**
 * funcion para actualizar
 * @param req 
 * @param res 
 */
export let updateUsuario = (req: Request, res: Response) => {
    Usuario.update(
        {
            usu_email: req.body.Usuario.usu_email
        },
        {
            where:{
                usu_id:req.body.Usuario.usu_id
            }
        }).then(()=>{
            
            Usuario.findByPk(req.body.Usuario.usu_id).then((objUsuario:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objUsuario
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteUsuario = (req: Request, res: Response) => {
    let {id} = req.params;

    Usuario.destroy({
        where:{
            usu_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Usuario Eliminado",
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

