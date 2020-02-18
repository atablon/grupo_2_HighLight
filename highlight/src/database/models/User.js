
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "user";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
            user_name: dataType.STRING,
            email: dataType.STRING,
            user_type: dataType.STRING,
            user_password: dataType.STRING,
            profile_picture: dataType.STRING,
            }

    let config = {
        tableName: "users",
        timestamps: false
        }

    let user = sequelize.define(alias, col, config);

    user.associate = (models) => {
        user.hasMany(models.order, {
            as: "orderUser",
            foreingKey: "user_id"
        })
    }

    return user;

}