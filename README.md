# Bugtracker

Build your team and track the progress of developing new features, solving issues, etc. [You can take a look at the live demo here.](https://www.bugtracker.tk/)

![thumbnail](/public/static/images/thumbnail.jpg)

## How to run locally

To run this project locally you'll need to run an instance of the [bugtracker API](https://github.com/Quibble7s/bugtracker-server) aswell. Or you can check the docs of the bugtracker production API and use that.

_Important note:_ if you plan on using a local hosted API instance you'll have to change the value of the constant `BASE_URL` under [/src/Constants/Server.ts](/src/Constants/Server.ts) to match the current port you're running the app in.

In the project directory, you can run:

### `npm install`

To install all the dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Planed features

- Real time project update.
