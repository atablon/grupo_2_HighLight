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
        sight_rate:{
            type: dataTypes.INTEGER
        },
        monthly_cost:{
            type: dataTypes.DECIMAL(10,2)
        },
        user_id:{
            type: dataTypes.INTEGER
        },
    };

    let config = {
        // El nombre de la tabla es igual que el nombre de este modelo hecho minuscula y en plural
        timestamps: false
    };

    const Sign = sequelize.define(alias,cols,config);

    // Sign.associate = function(models){
        

    // }
    return Sign;
}