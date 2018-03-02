// Import Sequelize library for `Sequelize.literal`.
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        movie_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        movie_poster: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        movie_genre: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        movie_time: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        movie_plot: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        movie_director: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        movie_actors: {
            type: DataTypes.STRING,
            allowNull: false
        },
        movie_year: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        movie_trailer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        movie_ratingImdb: {
            type: DataTypes.STRING,
            allowNull: false
        },
        movie_ratingRotten: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        watched: {
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
    }, {
        // classMethods: {
        //     associate: function(models) {
        //         Movie.belongsTo(models.Customer, {
        //             onDelete: "cascade",
        //             foreignKey: {
        //                 allowNull: true
        //             }
        //         });
        //     }
        // }
    });

    // Return the model we defined.
    return Movie;
};