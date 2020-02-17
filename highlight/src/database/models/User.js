
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "user";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
            name: dataType.STRING,
            surname: dataType.STRING,
            email: dataType.STRING,
            userType: dataType.STRING,
            password: dataType.STRING,
            profile_picture: dataType.STRING,
            }

    let config = {
        tableName: "users",
        timestamps: false
        }

    let user = sequelize.define(alias, col, config);
    
    return user;

}


