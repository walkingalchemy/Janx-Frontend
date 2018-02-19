<p align="center"> <img src="https://png.icons8.com/dusk/64/000000/collaboration.png"> </p>

# Janx
> A simple web enabled chat app

Janx is a demo using WebSockets to allow real time simultaneous messaging between users.  This is the repository for the [React]((https://reactjs.org/)) based frontend.  The backend api repository resides at: [Janx-Backend](https://github.com/walkingalchemy/Janx-Backend)

## Installing / Getting started


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project uses [npm](https://www.npmjs.com/) and [react](https://reactjs.org/).  It also uses [react-actioncable-provider](https://www.npmjs.com/package/react-actioncable-provider) to connect WebSockets in React components. Go check them out if you don't have them locally installed. 

Begin by installing and running the backend API server [Janx-Backend](https://github.com/walkingalchemy/Janx-Backend).

Then in a separate directory:
Fork and/or clone the repository down then run:

```shell
npm install
```

to get dependencies installed locally.
Then
```shell
npm start
```
to get it serving to your local host.  If you are running your API server on localhost:3000 you will be asked if you would like to start the client server on a different port.  Press Y and enter to allow this.
Because it is a Create-React app this will automatically open a browser window pointing to the frontend and you will be able to interact from there.

In order to test multiple simultaneous users you can open a second browser window to the same url in "Incognito Mode" to spoof a different connection.

Alternatively you can serve the backend API using [ngrok](https://ngrok.com/) as discussed in the backend API README and then be able to access the same API from multiple computers on your local network.


## Licensing
[MIT](https://oss.ninja/mit?organization=Sebastian%20Royer) 
Copyright 2018 [Sebastian Royer](https://github.com/walkingalchemy) and [Kelly Sample](https://github.com/kstamps)


## Thanks to:

<a href="https://icons8.com">Icon pack by Icons8</a>
