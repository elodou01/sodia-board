# Sodia Board

The application is available here: https://sodia-board.vercel.app/

To be able to reach their maximum potential, social media posts should be published at particular hours of the day depending on the weekday. Sodia Board uses international data to display to most active hours of each weekday in terms of social media publications.

The application is composed of two pages, displaying statistics of published posts on different media. The home page shows the user a preview of the statistics for each media. The second page displays the chart for the selected media, with the option to change the type of visualization.

This web application has been developed for Upfluence technical test.

Data comes from Upfluence's data stream, available here: https://stream.upfluence.co/stream.

### Known issues

- The stream reading and database update might stop unvoluntarily. A browser refresh is needed to start the live update of the charts again. This may be caused by a faulty error management when reading the stream.

# Technical choices

Technical choices have been made considering the requirements of the project. It is a small project consisting in only one feature, with a few simple frontend pages, and a simple backend. The technologies have been chosen according to the needs of this specific application. With a larger ecosystem, the technological choices may have been very different.

Note that the job offer is for a fronted software engineer, so most of the technical choices are oriented towards the frontend part of the project.

## Frontend

This project is written with [Typescript](https://www.typescriptlang.org), using [React](https://fr.react.dev) framework. React is a javascript framework used to create Single Page Applications. It eases the frontend development by providing tools to create and combine components. It is widely documented and supported on the web.

Tests code and management are using [jest](https://jestjs.io/fr/).

[Eslint](https://eslint.org) is used to keep the code clean.

The data is displayed as charts using the library [Highcharts](https://www.highcharts.com). Highcharts provides a lot of different chart styles, including 3D charts that are most useful in our project. We used in particular their bubble chart and heatmap chart.

The application is using [SWR](https://swr.vercel.app/fr-FR) to manage live updating data between the database and the client. SWR is a React library that works well with Vercel and is a powerful tool to update automatically the needed data. In this project's case, SWR is used with a refresh interval to keep the delay between new data arrival and its display under 5 seconds.

## Backend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app). Since the project is small, with a minor backend - only a few API routes, NextJS is a good choice to simplify the code and configuration.

The app is deployed with [Vercel](https://vercel.com/docs). Vercel is a serverless, free, easy to use, no-configuration deployement tool made by the NextJS team. Its fast auto-deployement tool is its main advantage for this kind of project. In comparison, [Heroku](https://www.heroku.com) could have been a good choice due to its great community and documentation, and its adaptability to lots of different languages. However, it would have taken longer to configure and use correctly. Note that the use of a serverless tool like Vercel prevents the use of websockets in the application.

The database is created using [Neon](https://neon.tech/docs/introduction). It is a [PostgreSQL](https://www.postgresql.org) database plugged with Vercel, that is free and has an auto-scale feature. The main choice here was to use a PostgreSQL database as it is well adapted for databases with a lot of data and performances requirements. PostgreSQL manages efficiently big volumes of data and queries. For example, a [MySQL](https://www.mysql.com/fr/) database would have been a better choice for a smaller, read-only database.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Technical discussions

## Scalability

Neon database has an auto-scale feature. Thus, the amount of data can increase a lot without being an issue. In order to not flood the database with all the information from the stream, only the relevant information - date, media, number of publications - is stored in the database. This limits the number of database lines as several publications for a media in the same hour will not create new lines but only increment a counter.

The code have been made to be able to scale. In particular, if new media types were to be added, developers would only need to get the new media names in the stream and add it to the corresponding enumerate in the code. The corresponding logo would also need to be added, and the app would do the rest: the new media pages would be immediately accessible with the right data.

However, what is not well scalable is the way the stream is managed: a faster stream could cause issues. See [stream management](#stream-management) for more discussion on this topic.

## Stream management

As the project is seen from a frontend point of view, the stream is managed client side and the browser is triggering the stream reading. This is not ideal for several reasons.

First, if more than one browser is opened on the application, the streaming data will be saved in database more than once, making the statistics incorrect. On the contrary, if the application isn't opened on any browser, the data will be lost.

Another issue with the client-based stream reading is that the API is called several times per second for each instance of the application. The database update relies on the browser and is therefore dependant on the internet connection of the user. This is not scalable and could cause issues for users with slow connection.

To avoid these problems, we may manage the stream from a dedicated backend server that would be running without interruption. For example we could use a lambda function that would read the stream and send the data to the database. The client would only need to call the API once every few seconds to read the database to get the data and display it in the charts.

## Folder architecture

For this project, my choice was to keep a simple and straightforward architecture, with dedicated folders for the components, the methods, etc...

However, this architecture is not scalable and, for a bigger application, several folder architecture could be chosen.
My preference goes to an architecture separated in two main folders `core` and `ui`. The `core` folder would include `types`, `context`, `hooks`, `functions` folders. The `ui` folder would only contain components files and be divided following a domain separation: `feature 1`, `feature 2`, etc. Each of the `core` subfolders would be divided following the same domain separations, so we could easily find the "feature 1" components or functions.

## Tests

The code coverage of the project is minimal. A few tests have been made to show the kind of tests we could add to secure the app, but it is insufficiant for a production build. Most of the time in production we would want at least 70-80% of code coverage.

## UI/UX

With more time, I would have loved working more on the design and UX of this project. However, as I am not used to design applications by myself instead of having already designed prototypes, the result is often centered on the features more than on having a pleasant design.

## Timestamp to Date conversion

To save some time, the conversion from a timestamp data to a date does not take into account the timezone. When working with international users, we always need to add some timezone management to make sure that the data is consistent worldwide.

## Highcharts

There is currently an issue with Highcharts using React and NextJS, so some workaround had to be developed to import the correct dependencies. The corresponding code can be found under `src/components/highchartsLazyLoad.tsx`.
