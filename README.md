# getReel
A Full stack web application that serves as a personal media library to keep track of movies that you would like to watch as well as the ones that you have watched already.

Direct link to app: https://pure-waters-38367.herokuapp.com

## Home page 
<img width="1346" alt="screen shot 2018-03-02 at 1 28 19 pm" src="https://user-images.githubusercontent.com/31390306/36915243-fff2e5f2-1e1d-11e8-8e1a-21493d66acdf.png">

### Result:

In this application we utilized the Open Movie Database (OMDb) API to implement a search for movie titles. Ultimately, getReel allows the user to keep a list of movies they want to watch. Once the movie is selected, a modal generates a brief description of the movie including; movie poster, genre, cast, director(s), year of release and ratings. We also utilized The Movie database API to add a trailer feature of the selected movie. The user has the option to keep the movie in the watchlist or mark the movie as “watched”. 

## Movie general info 
<img width="1347" alt="screen shot 2018-03-02 at 1 27 21 pm" src="https://user-images.githubusercontent.com/31390306/36915244-00008d10-1e1e-11e8-86ee-589262a79986.png">

### Technologies used:

Bootstrap 4 (Front-end framework)

Cards, Modal

Express.js (Server framework)

Handlebars (Templating engine)

Heroku (Cloud platform)

JawsDB (Heroku database add-on)

MySQL (RDBMS)

Node.js (Javascript environment)

Sequelize (ORM)


### Prerequisites
- MySQL
- Node.js

### Installing
If you would like the view the site from a user's point of view, you have the option of viewing the site on Heroku. It is located at <"coming soon">.
 
If you would like to run the application locally, please ensure that you have the prerequisites installed, then take the following steps:
- Clone this repository to your local machine with `git clone <repo-url>`.
- Install NPM dependencies by running `npm install` in the project directory.
- If you use a MySQL username other than `root` or have a MySQL password, open `config/config.json` and update these values on lines 3 and 4.
- Log into MySQL CLI with `mysql -u root` (substitute your username and add `-p <your password>` if needed).
- Run `CREATE DATABASE movies_db;`
- Exit MySQL with `exit`.
- Ensure that you are in the root project directory, then run `npm start`.
- The application will be running at `localhost:3000/`


## Author
Raj Narula, Mariela Pascual, Ashley Calixte
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
