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

Rename `.env_example` file as `.env` into main folder, and put your own credentials:

- `POSTGRES_NAME=dreamsports`
- `NEW_POSTGRES_NAME=dreamsports`
- `POSTGRES_PASSWORD=dreamsports`
- `POSTGRES_USER=dreamsports`
- `POSTGRES_DB=dreamsports`

- `ORM_CONFIG_DB=dreamsports`
- `ORM_CONFIG_USERNAME=dreamsports`
- `ORM_CONFIG_PASSWORD=dreamsports`
- `ORM_CONFIG_HOST=dreamsports`
- `ORM_CONFIG_PORT=5432`

- `PORT=80`
- `JWT_USER=dreamsports`
- `JWT_CUSTOMER=dreamsports`

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
