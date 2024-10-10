import {conexion} from '../db.js';

export const getAreas = async(req,res)=>{
    try{
        const {id_area}=req.params;
        var where = (id_area===undefined) ? '' : 'WHERE id_area="'+id_area+'" ';
        const [rows] = await conexion.query('SELECT * FROM area '+where);
        return res.json(rows);
    }
    catch(error){
        return res.status(500).json({message:'error'});
    }
};

export const saveAreas = async(req,res)=>{
    try{
        const {id_area,descripcion_area} = req.body;
        var validacion = validar(id_area,descripcion_area);
        if(Object.entries(validacion).length===0){
            await conexion.query(
                'INSERT INTO area(id_area,descripcion_area)  VALUES (?,?)',
                [id_area,descripcion_area]
            );
            return res.status(200).json({status:'success'})
        }
        else{
            return res.status(500).json([{status:'error al insertar'},{errors:validacion}]);
        }
    }catch(error){
        return res.status(500).json({status:'error'})
    }
};

export const updateAreas = async(req,res)=>{
    try{
        const {id_area} = req.params
        const {descripcion_area} = req.body;
        var validacion = validar(id_area,descripcion_area);
        if(Object.entries(validacion).length===0){
            const[result] =  await conexion.query(
                'UPDATE area SET descripcion_area=? WHERE id_area = ?',
                [descripcion_area,id_area]
            );
            if(result.affectedRows === 0){
                return res.status(404).json({status:'error',errors:[{id_area:'No existe el id de area ingresado'}]});
            }else{
                return res.status(200).json({status:'success'})
            }
        }
        else{
            return res.status(500).json([{status:'error al modificar area'},{errors:validacion}]);
        }
    }catch(error){
        return res.status(500).json({status:'error'+error});
    }
};



export const deleteAreas = async(req,res)=>{
    try{
        const {id_area} = req.params
        const[result] =  await conexion.query('DELETE FROM area WHERE id_area = ?',[id_area]);
        if(result.affectedRows === 0){
            return res.status(404).json({status:'error',errors:[{id_area:'No existe el id de area ingresado'}]});
        }else{
            return res.status(200).json({status:'success'})
        }
    }catch(error){
        return res.status(500).json({status:'error'+error});
    }
};

function validar(id_area,descripcion_area){
    var errors =[];
    if(id_area===undefined || id_area.trim()==='' || isNaN(id_area) ){
        errors.push({id_area:['El id del área debe ser un id numérico y que aún no se encuentre registrado.']


        });
    }
    if(descripcion_area===undefined || descripcion_area.trim()==='' ){
        errors.push({descripcion_area:['El nombre del área no debe estar vacío.']

        });
    }
    return errors;
}
