const router = require('express').Router()
const conexion = require('./config/conexion')


//get productos
router.get('/',(req, res)=>{
    let sql ='select * from tb_Productos'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

// get un Productos
router.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from tb_Productos where id_productos = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//agregar Productos
router.post('/',( req, res)=>{
    const{nombre, descripcion, precio, imagen} = req.body

    let sql = `insert into tb_Productos(nombre, descripcion, precio, imagen) values('${nombre}','${descripcion}','${precio}','${imagen}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto agregado'})
        }
    })
})

//eliminar 
router.delete('/:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from tb_Productos where id_productos = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto eliminado'})
        }
    })
});

//modificar
router.put('/:id',(req, res)=>{
    const{id}=req.params
    const{nombre, descripcion, precio, imagen} = req.body

    let sql = `update tb_Productos set 
                nombre ='${nombre}',
                descripcion = '${descripcion}',
                precio = '${precio}',
                imagen='${imagen}'
                where id_productos = '${id}'`
    
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'producto modificado'})
        }
    })

})
module.exports=router;