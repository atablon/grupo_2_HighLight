
// modelode datos de tabla sings_techs
module.exports = (sequelize, dataType) => {

  let alias = "Sign_tech";

    let col = {
         id: {
            type: dataType.INTEGER,
            primaryKey: true,
          },
         sign_tech: dataType.STRING,
        }

    let config = {
      tableName: "sign_techs",
        timestamps: false
    }

  let tecnologia = sequelize.define(alias, col, config)
  return tecnologia;

    }

  
