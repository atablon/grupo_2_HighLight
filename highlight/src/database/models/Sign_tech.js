
// modelode datos de tabla sings_techs
module.exports = (sequelize, dataType) => {

  let alias = "tecnología";

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

  let tecnología = sequelize.define(alias, col, config)
  return tecnología;

    }

  
