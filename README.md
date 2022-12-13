 # Part of Speech

In English language, words can be categorized according to their syntactic functions, which is known as "Part of Speech".
Examples of part of speech: (noun, verb, adjective, ...)

## Tech Stack

The project is developed using 
- NodeJS
- Typescript
- MongoDB
- React


## Files Structure

### Backend

The project consists of 3 main directory `src`, `dist`, `tests`

- **src:** the one containing the typeScript source code.
- **dist:** the compiled version from which we run our code.
- **tests:** contains the test case.

### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Getting Started

### System Requirments


your system should have nodeJs, typescript and mongoDB up and running to run this app.

- [Node Js installation Guide](`https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`)
- TypeScript installation Guide
```sh
# after installing node and NPM you can easily install typescript using the following command
npm install -g typescript
```
- [MongoDB installation Guide](`https://www.mongodb.com/docs/manual/installation/`)



### Install and Run


Aftre cloining the repo

**Backend Part**

1. move into the backend directory

```sh
cd partOfSpeech_backend/
```

2. Install the required dependencies 

```sh
npm install
```


3. In case you made any changes to the code, you should recompile the source to get the new dist (optional)

```sh
npm build
```

4. run the tests

```sh
npm test
```

5. run the server

```sh
npm start
```

**Frontend Part**

1. move into the backend directory

```sh
cd partOfSpeech_frontend/
```

2. Install the required dependencies 

```sh
npm install
```

5. start UI

```sh
npm start
```


### Usage

access the app at `http://localhost:8080/`



## License
[MIT](https://choosealicense.com/licenses/mit/)



