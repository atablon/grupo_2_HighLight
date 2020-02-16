

// modelode datos de tabla sings_techs
module.exports = (sequelize, dataType) => {
    //const Sign_tech = ("alias", estructura, configuraciones);
    const Sign_tech = ("Sign_techs", {
        id: {
            type:dataType.INTEGER,
            primaryKey:true,
        }, 
        name: dataType.STRING,

    }, {
        tableName: "Tipo_de_cartel", 
    }
    );

    return Sign_tech;
}   
