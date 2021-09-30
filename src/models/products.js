const options = {
    freezeTableName: true,
    tableName: 'products'
};

module.exports = (sequelize, Sequelize) => {
    var Product = sequelize.define("Product", {
        productName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        image: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        origionalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        netSellingPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        shortDescription: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        categoryId: {
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

    return Product;
}
