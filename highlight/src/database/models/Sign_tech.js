
// modelode datos de tabla sings_techs
module.exports = (sequelize, dataType) => {

    let alias = "tecnologia";

    let col = {
         id: {
            type: dataType.INTEGER,
            primaryKey: true,
          },
          name: dataType.STRING,
        }

    let config = {
        tableName: "sign_techs",
        timestamps: false
    }

    let tecnologia = sequelize.define(alias, col, config)
    return tecnologia;

    }

  
