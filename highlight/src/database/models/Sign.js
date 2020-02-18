module.exports = (sequelize, dataTypes) => {
    
    let alias = 'Sign';

    let cols = {
        id:{
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        address:{
            type: dataTypes.STRING
        },
        street_number:{
            type: dataType.INTEGER
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
            type: dataType.INTEGER
        },
        picture_filename:{
            type: dataTypes.STRING
        },
        tech_id:{
            type: dataType.INTEGER
        },
        type_id:{
            type: dataType.INTEGER
        },
        height:{
            type: dataType.DECIMAL
        },
        width:{
            type: dataType.DECIMAL
        },
        sight_rate:{
            type: dataType.DECIMAL
        },
        monthly_cost:{
            type: dataType.DECIMAL
        },
        user_id:{
            type: dataType.INTEGER
        },
    };

    let config = {
        // El nombre de la tabla es igual que el nombre de este modelo hecho minuscula y en plural
        timestamps: false
    };

    const Sign = sequelize.define(alias,cols,config);

    Sign.associate = function(models){
        
        
    }
    return Sign;
}