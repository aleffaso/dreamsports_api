module.exports ={
    "type": "postgres",
    "host": process.env.ORMCONFIG, 
    "port": process.env.ORMCONFIG_PORT,
    "username": process.env.ORMCONFIG,
    "password": process.env.ORMCONFIG,
    "database": process.env.ORMCONFIG,
    "entities": [
        "src/app/models/*.ts"
    ],
    "migrations": [
        "src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations/*.ts"
    }
}