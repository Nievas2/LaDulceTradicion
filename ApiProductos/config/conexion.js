const mysql2 = require('mysql2');

const conexion = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'angelgaby2',
    port:'3306',
    database: 'db_LaDulceTradicion'
});

conexion.connect((err)=>{
    if(err){
        console.log('ha ocurrido un error :'+ err)
    }
    else
    {console.log(' la base de datos se conecto!!!')}
});

module.exports=conexion