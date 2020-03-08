// Modelo de entidad de tecnologia (sign_techs)
// DER:
// - Relacion 1 -> N con Signs
// - Una tecnologia hasmany Signs
//  - Una Signal belongsto one tecnologia
//
module.exports = (sequelize, dataType) => {

    let alias = 'Sign_tech'; //"tecnologias";

      let col = {
          id: {
              type: dataType.INTEGER,
              primaryKey: true,
            },
          sign_tech: dataType.STRING,
          }

      let config = {
<<<<<<< HEAD
        tableName: "sign_techs",
=======
        tableName: "sign_techs", //no deberia hacer falta de acuerdo a como fue nombrado 
>>>>>>> 289109001fef8ed0f99b811a5c2c007984d2e41d
        timestamps: false
      }

    let Sign_tech = sequelize.define(alias, col, config)
    
    
    
    Sign_tech.associate = function (models){

      /* Relacion con Sign */

<<<<<<< HEAD
      Sign_tech.hasMany(models.Sign , {
=======
      Sign_tech.hasMany(models.Sign,{
>>>>>>> 289109001fef8ed0f99b811a5c2c007984d2e41d
        as:'signs',
        foreignKey:'tech_id'
      });
    }

  return Sign_tech;

}

  
