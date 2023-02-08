# DreamSports API

<p align=center>
    <img src="info/wallpaper.png">
</p>

## Overview

The main purpose of this project is to create an e-commerce to a cliente about bike gadgets.

<hr>

## Libraries

- BcryptJS => Encryption Library;
- Class-transformer => Serialize and deserialize data;
- DotEnv => Work with environment variables
- Express => Flexible framework;
- JSONWebToken => Tokenize access
- Nodemon => Update server when save;
- Postgres => PostgreSQL
- Reflect-metadata => Use decorators for declarative syntax
- TypeORM => ORM

<hr>

## Clone the repository

`git clone https://github.com/aleffaso/dreamsports`

<hr>

## Setting enviroment keys

Add `.env` file into main folder, and put:

- `POSTGRES_NAME=docker`
- `NEW_POSTGRES_NAME=docker`
- `POSTGRES_PASSWORD=docker`
- `POSTGRES_USER=docker`
- `POSTGRES_DB=docker`

- `ORMCONFIG_DB=dreamsports`
- `ORMCONFIG_USERNAME=dreamsports`
- `ORMCONFIG_PASSWORD=dreamsports`
- `ORMCONFIG_HOST=dreamsports`
- `ORMCONFIG_PORT=5432`

- `PORT=3000`
- `JWT=yourjwt`

<hr>

## Get docker

[docker.com](https://docs.docker.com/get-docker/)

<hr>

## Running the application

- Run: `docker-compose up --build`;

<hr>

## Output

`web_1  |:` `server started at http://localhost:3000`

`web_1  |:` `Data Source has been initialized`

## Congrats! Your API is working

<hr>
