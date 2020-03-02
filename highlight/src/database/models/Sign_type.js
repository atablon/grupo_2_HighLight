
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "Sign_type";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            },
        sign_type: dataType.STRING,
        }

    let config = {
        tableName: "sign_types",
        timestamps: false
        }

    let tipificacion = sequelize.define(alias, col, config)
    return tipificacion;

}


