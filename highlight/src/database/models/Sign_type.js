
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "tipificacion";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            },
        name: dataType.STRING,
       }

    let config = {
        tableName: "sign_types",
        timestamps: false
        }

    let tipificacion = sequelize.define(alias, col, config)
    return tipificacion;

}


