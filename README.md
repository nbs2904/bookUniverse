# Book Universe
A project by Nick Schroeder and Maxime Fritzsch
## Introduction
This is the README for our project, *book universe*. We chose *book universe* as the title because our goal for this application was to make books available everywhere by building this application, which enables users to read books in their browser, without the need for an additional reading device or software. We tried making the user experience quite close to an actual library or any other online book service to make it intuitive for new users.

### Components

**Catalogue:** Users can search through the catalogue to borrow new books they would like to read next. It is a list of all available books, where they find a short outline of every book. Clicking on a specific book will redirect a user to a more detailed view, revealing every information of a book. Right here they can also borrow books if they wish to, which redirects them directly to their library, where they can immediately start to read.

**Library:** A user can choose in the library from his borrowed books. After choosing any of them, he gets a more detailed view and has the option to either read the book, return it or extend the borrowed duration. Extending the duration will automatically prolong it for two weeks in the future, without the need for the user to set a specific date.

**Reader:** In the reader, the user can read the book in a responsive depiction of the book, including pictures. Furthermore, the reader always starts at the position they last stopped reading.



## Technologies
To develop the *book universe* Application, the **MEAN**-Stack was used.
- **M:** Storing Data in the document-based database MongoDB 
- **E:** To handle API requests, an express server was used.
- **A:** Using Angular as the frontend framework.
- **N:** Node.js served as runtime environment.

On our first attempt, implementing the reader failed since we did not manage to get the package [angular-epub-viewer](https://www.npmjs.com/package/angular-epub-viewer) to work, but after digging a bit deeper we found the underlying project the angular-epub-viewer is based on. Thanks to open-source, [futurepress/epub.js](https://github.com/futurepress/epub.js) made it possible for us to get a responsive epub-file reader, by simply adding the source code as the **epub.min.js** to our application's assets.

## Future Plans
Long term, there are several features we would like to add. First of all, we would like to add the possibility that the user can choose his favourite genres, which then could be used in some kind of suggestion algorithm so that the catalogue would show the books on the top which would be most interesting to the user.
Additionally, we still need to implement a proper payment model, which does not have any effect as of yet. After the implementation, the number of books one of the users with a lower subscription model tier will be able to choose from will be limited so that there is an incentive to choose one of the higher tiers.
Furthermore, the introduction of a rating and review system for the books would probably be helpful so that the users could inform themselves whether they want to read a book by looking at the reviews and ratings for the corresponding book.
Lastly, of course, it would be nice if we could expand the number of books we offer. This number is currently mainly limited by the work required to add more books from [Project Gutenberg](https://www.gutenberg.org/) but also the fact that we can only offer books that are part of the public domain. If we would want to offer additionally books, we would need to negotiate with the right holders of the books we want to offer.

## Installation Guide
To use our application locally just a few steps are needed.

1. Add a file named **.env** in the **backend** folder. Following environment variables are needed. The port is set to 3000 by default. If you would like to use another port feel free to change it. For the database credentials please refer to our private documentation.
    - DB_USER=*MongoDB_Username*
    - DB_PSWD=*MongoDB_Password*
    - PORT=*Preferred_Port*

2. Install necessary npm dependencies in the root folder of the project and the backend folder. 
```
npm install
cd ./backend
npm install
```

3. If you have not installed gulp globally yet, we recommend doing so.
```
npm i -g gulp
```

4. As the last step, you need to build the project.
_Note:_ You might need to return to the root folder in your terminal. 
```
cd ..
gulp
```
By just running the default task, the following tasks will be run successively.
1. **lint:** The code will be checked for style and syntax flaws, using eslint.
2. **unit-tests:** A handful of unit tests will be run testing parts of the application. 
3. **e2e:** Runs an e2e test to test the application from a user perspective. **Please note that the build automation might fail the first time, when you have not used cypress before. It should work on the second try. If it still fails, please consider to remove it from the gulp default task. You can run following npm scripts to execute the e2e manually.**
```
npm run cypress:run
// alternatively if you would like to get visual feedback from cypress
npm run cypress:open
```
4. **build:** ```ng build``` will be exectued to build the application.
5. **start:** The application will be run in production mode on **localhost:3000**. If you do not wish the server to be run after the application was tested and built, feel free to make changes to the **gulpfile.js** in the root directory and remove the start from the default task.