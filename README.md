# Bugtracker

Build your team and track the progress of developing new features, solving issues, etc. [You can take a look at the live demo here.](https://www.bugtracker.tk/)

![thumbnail](/public/static/images/thumbnail.jpg)

This project was built using React, Typescript, TailwindCSS, and the [bugtracker API](https://github.com/Quibble7s/bugtracker-server).

## Features

- User authentication.
- Role based user authorization.
- Users can create or delete its own projects.
- Users can join other user's project to collaborate.
- Only project admins can add issues.
- Only project admins can edit the project.
- Project activity logs.

## How to run locally

### To run this project locally you'll need to run a local instance of the [bugtracker API](https://github.com/Quibble7s/bugtracker-server) aswell.

**Important note:** You'll have to change the value of the constant `BASE_URL` under [/src/Constants/Server.ts](/src/Constants/Server.ts) to match the current port you're running the API on.

- Run `npm install` or `npm i` to install all the dependencies.
- Run `npm start` to run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Planed features

- Real time project update.
- Give project admins the hability to assign issues to members.
- User profile pictures using firebase storage.
