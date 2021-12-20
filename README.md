# BookUniverse
A project by Nick Schroeder and Maxime Fritzsch
## Introduction
This is the README for our project, bookuniverse. We chose bookuniverse as the titel, as our goal for this application was to make books available everywhere by building this application, which enables user to read books in their browser, without the need of an additional reading device or software. We tried making the user experience quite close to an actual library or any other online book service to make it intuitive for new users.

### Components

**Catalogue:** Users can search through the catalogue to borrow new books they would like to read next. It is basically a list of all available books, where they find a short outline of every book. Clicking on a specific book will redirect a user to a more detailed view, revealing every information of a book. Right here they can also borrow books if they wish to, which redirects them directly to their own library, where they can immediatly start to read.  

**Libary:** A user can choose in the libary from his borrowed books. After choosing any of them, he gets a more detailled view and has the options to either read the book, return it or extend the borrowed duration. Extending the duration will automatically prolong it for two weeks in the future, without the need of the user to set a specific date.

**Reader:** In the reader, the user is able to read the book in a responsive depiction of the book, including pictures. Furthermore, the reader always starts at the position the he or she last stopped reading.



## Technlogies
To develop the bookUniverse Application, the **MEAN**-Stack was used.
- **M:** Storing Data in the document based database MongoDB 
- **E:** To handle API requests, an express server was used.
- **A:** Using Angular as the frontend framework.
- **N:** Node.js served as runtime environment.

Our first attempt, implementing the reader failed since we did not manage to get the package [angular-epub-viewer](https://www.npmjs.com/package/angular-epub-viewer) to work, but after digging a bit deeper we found the underlying project the angular-epub-viewer is based on. Thanks to open-source, [futurepress/epub.js](https://github.com/futurepress/epub.js) made it possible for us to get a responsive epub-file reader, by simply adding the source code as the **epub.min.js** to our application's assets.

## Future Plans
Long term, there are several features we would like to add. First of all, we would like to add the possibility that the user can choose his favourite genres, which then could be used in some kind of suggestion algorithm so that the catalogue would show the books on the top which would be most interesting to the user.
Additionally, we still need to implement a proper payment model, which does not have any effect as of yet. After the implementation, the number of books one of the users with a lower subscription model tier will be able to choose from will be limited so that there is an incentive to choose one of the higher tiers.
Furthermore, the introduction of a rating and review system for the books would probably be helpful so that the users could inform themselves wether they want to read a book by looking at the reviews and ratings for the corresponding book.
Lastly, of course, it would be nice if we could expand the number of books we offer. This number is currently mainly limited by the work required to add more books from [Project Gutenberg](https://www.gutenberg.org/) but also the fact that we can only offer books which are part of the public domain. If we would want to offer additionaly books, we would need to negotiate with the right holders of the books we want to offer.

## Installation Guide
To use our application locally just a few steps are needed.


1. Install necessary npm dependecies in the root folder of the project and the backend folder. 
```
npm install
cd ./backend
npm install
```

2. If you have not installed gulp globally yet, we recommend doing so.
```
npm i -g gulp
```

3. As last step, you need to build the project.
```
gulp
```
By just running the default task, following tasks will be run successively.
1. **lint:** The code will be checked for style and syntax flaws, using eslint.
2. **unit-tests:** A handful of unit tests will be run testing parts of the application. 
3. **build:** ```ng build``` will be exectued to build the application.
4. **start:** The application will be run in production mode on **localhost** on port **3000**. If do not wish the server to be run after the application was tested and build, feel free to make changes to the **gulpfile.js** in the root directory.