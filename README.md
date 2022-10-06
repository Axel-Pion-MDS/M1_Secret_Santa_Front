- `http://localhost:3000/`

# SecretSantaFront
![Nodejs16.15.0](https://img.shields.io/badge/Nodejs-v16.15.0-%2384ba64)
![React18.2.0](https://img.shields.io/badge/React-v18.2.0-%2361dafb)

## Getting started

This repository is used to interact with our back application in order add users to a santa

## How use application

### Create folder

```bash
$ mkdir secret-santa-front
```
Go to folder
```bash
$ cd secret-santa-front
```

### Clone from repository

```bash
$ git clone https://gitlab.com/mds-m1/secret_santa_front.git
```

### Build application

```bash
$ docker-compose build
```

### Start application

```bash
$ docker-compose up -d
```


## Routes

### Home page

```
http://localhost:3000
```
`A simple page that allows to present the principle of secret santa`

### Join page

```
http://localhost:3000/join/
```
`This is the main page that allows users to register. Data on promotions and santas are retrieved from the back-end. Once a user validates his registration, he registers a local storage. Then he is redirected to the congratulations page`

### Congratulation page

```
http://localhost:3000/congratulation/
```
`A simple registration validation page`

## Authors

- [Sylvain Dendele](https://gitlab.com/sylvaindnd)
- [Axel Pion](https://gitlab.com/Maengdok)
- [Rémi Rubis](https://gitlab.com/remirubis)
