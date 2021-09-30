const options = {
    freezeTableName: true,
    tableName: 'category'
};

module.exports = (sequelize, Sequelize) => {
    var Category = sequelize.define("Category", {
        categoryName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
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

    return Category;
}