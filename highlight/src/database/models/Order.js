// Modelo de entidad de Order
// DER:
// - Relacion 1 -> N con Signs
// - Una te
module.exports = (sequelize, dataType) => {

    let alias = "Order";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        user_id: dataType.INTEGER,
        total_cost: dataType.DECIMAL(10,0),
    };

    let config = {
        tableName: "orders", // El plural del nombre del modelo (en ingles) sera la tabla que busque
        timestamps: false
    };


    let Order = sequelize.define(alias, col, config);

    Order.associate = (models) => {

        /* Relacion con User */

        Order.belongsTo(models.User, {
            as:"users", 
            foreignKey: "user_id"
        })

        /* Relacion con Sign a traves de tabla intermedia signs_orders */

        Order.belongsToMany(models.Sign,{
            as:'signs',
            through: 'signs_orders', // la tabla que los relaciona en la base de datos
            foreignKey: 'order_id',
            otherKey:'sign_id',
            timestamps: false
        })

    };


    return Order;

}


