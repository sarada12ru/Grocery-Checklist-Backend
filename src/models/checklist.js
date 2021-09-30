const options = {
    freezeTableName: true,
    tableName: 'checklist'
};

module.exports = (sequelize, Sequelize) => {
    var Checklist = sequelize.define("Checklist", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
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

    return Checklist;
}