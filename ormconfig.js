console.log(process.env.ENTITIES)
module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    process.env.ENTITIES
  ],
  "migrations": [
    process.env.MIGRATIONS
  ],
  "cli": {
    "migrationsDir": process.env.MIGRATIONS_DIR
  }
}
