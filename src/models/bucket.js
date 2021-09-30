const options = {
    freezeTableName: true,
    tableName: 'bucket'
};

module.exports = (sequelize, Sequelize) => {
    var Bucket = sequelize.define("Bucket", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isActive: {
            type: Sequelize.ENUM,
            values: ['true', 'false'],
            allowNull: true
        },
        timestamp: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, options);

    return Bucket;
}