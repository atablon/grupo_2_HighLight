// Modelo de entidad de tecnologia (sign_techs)
// DER:
// - Relacion 1 -> N con Signs
// - Un tipo (Sign_type) hasmany Signs
//  - Una Signal belongsto one Sign_typ
//
module.exports = (sequelize, dataType) => {

    let alias = 'Sign_type';

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            },
        sign_type: dataType.STRING,
        }

    let config = {
        tableName: "sign_types", // deberia ser el plural(del ingles) del nombre del modelo en este caso el plural de Sign_type osea Sign_types
        timestamps: false
        }

    let Sign_type = sequelize.define(alias, col, config)

    

    Sign_type.associate = function(models){

        /* Relacion con Sign */

        Sign_type.hasMany(models.Sign,{
            as:'signs',
            foreignKey:'type_id'
        });
    }

    return Sign_type;
}


