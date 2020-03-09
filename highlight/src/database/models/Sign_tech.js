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
        tableName: "sign_techs",
        timestamps: false
      }

    let Sign_tech = sequelize.define(alias, col, config)
    
    
    
    Sign_tech.associate = function (models){

      /* Relacion con Sign */

      
      Sign_tech.hasMany(models.Sign , {
        as:'signs',
        foreignKey:'tech_id'
      });
    }
  return Sign_tech;

}

  
