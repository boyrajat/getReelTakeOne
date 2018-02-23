// Import Sequelize library for `Sequelize.literal`.
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define('Burger', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            burger_name: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            devoured: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            classMethods: {
                associate: function(models) {
                    Burger.belongsTo(models.Customer,
                        {
                            onDelete: "cascade",
                            foreignKey: {
                                allowNull: true
                            }
                        });

                }

            }
        });

    // Return the model we defined.
    return Burger;
};

