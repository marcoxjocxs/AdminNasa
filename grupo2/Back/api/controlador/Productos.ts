import {Request,Response} from 'express';
import { Producto } from '../configuracion/Sequelize';

export let getProducto=(req:Request,res:Response)=>{
    Producto.findAll().then((objProducto:any)=>{
        res.status(200).json({
            message:'Ok',
            content:objProducto
        })
    })
}

export let getProductoById = (req: Request, res: Response) => {
    Producto.findByPk(req.params.id).then((objProducto: any) => {
        if (objProducto) {
            res.status(200).json({
                message: 'Producto encontrado ',
                Producto: objProducto
            })
        } else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro al Producto'
            })
        }
    })
}

export let postProducto=(req:Request,res:Response)=>{
    let objProducto=Producto.build(req.body);
    objProducto.save().then((objProducto:any)=>{
        res.status(201).json({
            ok:true,
            contenido:objProducto,
            message:"Producto creado exitosamente"
        })
    }).catch((error:any)=>{
        res.status(400).json({
            ok:true,
            contenido:error,
            message:"Producto no creado"
        })
    })
}

export let updateProducto = (req: Request, res: Response) => {
    Producto.update(
        {
            prod_nomb: req.body.Producto.prod_nomb
        },
        {
            where:{
                prod_id:req.body.Producto.prod_id
            }
        }).then(()=>{
            
            Producto.findByPk(req.body.Producto.prod_id).then((objProducto:any)=>{
                res.status(200).json({
                    message:'ok',
                    content:objProducto
                })
            })
        }).catch((error:any)=>{
            res.status(501).json({
                message:'error',
                content:error
            })
        })
}

export let deleteProducto = (req: Request, res: Response) => {
    let {id} = req.params;

    Producto.destroy({
        where:{
            prod_id:id
        }
    }).then((cantidad:any)=>{
        if(cantidad>0){
            let rpta = {
                success:true,
                message:"Producto Eliminado",
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

