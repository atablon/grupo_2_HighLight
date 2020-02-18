
// modelode datos de tabla sings_type
module.exports = (sequelize, dataType) => {

    let alias = "order";

    let col = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        user_id: dataType.INTEGER,
        total_cost: dataType.DECIMAL,
    }
    let config = {
        tableName: "orders",
        timestamps: false
    }


    let order = sequelize.define(alias, col, config);

    order.associate = (models) => {
        order.belongsTo(models.user, {
            as:"userorde", 
            foreingKey: "user_id"
        })

    }
    return order;

}


