
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "User";

    let col = {
        id:{
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        user_name: dataType.STRING,
        email: dataType.STRING,
        user_type: dataType.STRING,
        user_password: dataType.STRING,
        profile_picture: dataType.STRING,
        }

    let config = {
        tableName: "users", //el nombre del modelo en plural (de ingles) y minuscula
        timestamps: false
    }

    let User = sequelize.define(alias, col, config);


    User.associate = (models) => {
        
        /* Relacion con Order */

        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "user_id"
        });

        /* Relacion con Sign */

        User.hasMany(models.Sign,{
            as:'signs',
            foreignKey:'user_id'
        });


    }



    return User;

}