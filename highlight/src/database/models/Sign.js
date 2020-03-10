

module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Sign';

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        address:{
            type: dataTypes.STRING
        },
        street_number:{
            type: dataTypes.INTEGER
        },
        street_1:{
            type: dataTypes.STRING
        },
        street_2:{
            type: dataTypes.STRING
        },
        city:{
            type: dataTypes.STRING
        },
        state:{
            type: dataTypes.STRING
        },
        reference:{
            type: dataTypes.STRING
        },
        star:{
            type: dataTypes.INTEGER
        },
        picture_filename:{
            type: dataTypes.STRING
        },
        tech_id:{
            type: dataTypes.INTEGER
        },
        type_id:{
            type: dataTypes.INTEGER
        },
        heigth:{
            type: dataTypes.DECIMAL(10,2)
        },
        width:{
            type: dataTypes.DECIMAL(10,2)
        },
        monthly_cost:{
            type: dataTypes.DECIMAL(10,2)
        },
        user_id:{
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName:'signs',// El nombre de la tabla es igual que el nombre de este modelo hecho minuscula y en plural
        timestamps: false
    };

    const Sign = sequelize.define(alias,cols,config);

    

    Sign.associate = function(models){

        /* Relacion con Sign_tech */

        Sign.belongsTo(models.Sign_tech,{
            as:'techs',
            foreignKey:'tech_id'
        });

        /* Relacion con Sign_type */

        Sign.belongsTo(models.Sign_type,{
            as:'types',
            foreignKey:'type_id'
        });

        /* Relacion con User */

        Sign.belongsTo(models.User,{
            as:'users',
            foreignKey:'user_id'
        });

        /* Relacion con Orders a traves de tabla intermedia signs_orders */

        Sign.belongsToMany(models.Order,{
            as:'orders',
            through:'signs_orders',
            foreignKey:'sign_id',
            otherKey:'order_id',
            timestamps: false
        })
    }

    


    return Sign;
}