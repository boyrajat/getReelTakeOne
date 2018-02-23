# Eat Da Burger
 A full-stack web application that allows users to create and "eat" new varieties of burgers. Data is persisted in a MySQL database, allowing users to interact with one another's submissions. This application is an iteration upon a previous version that adds Sequelize ORM and customer associations. 

## Getting Started

### Prerequisites
- MySQL
- Node.js

### Installing
If you would like the view the site from a user's point of view, you have the option of viewing the site on Heroku. It is located at <http://eat-burger.herokuapp.com>.
 
If you would like to run the application locally, please ensure that you have the prerequisites installed, then take the following steps:
- Clone this repository to your local machine with `git clone <repo-url>`.
- Install NPM dependencies by running `npm install` in the project directory.
- If you use a MySQL username other than `root` or have a MySQL password, open `config/config.json` and update these values on lines 3 and 4.
- Log into MySQL CLI with `mysql -u root` (substitute your username and add `-p <your password>` if needed).
- Run `CREATE DATABASE burgers_db;`
- Exit MySQL with `exit`.
- Ensure that you are in the root project directory, then run `npm start`.
- The application will be running at `localhost:3000/`

## Built with
- Bootstrap (Front-end framework)
- DataGrip (Database GUI)
- Express.js (Server framework)
- Handlebars (Templating engine)
- Heroku (Cloud platform)
- JawsDB (Heroku database add-on)
- MySQL (RDBMS)
- Node.js (Javascript environment)
- Sequelize (ORM)
- WebStorm (Javascript GUI)

## Author
Mich Elliott - [mchlltt](https://github.com/mchlltt)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
