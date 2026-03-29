import sequelize from './config/database.js';
import Client from './models/client.js';

await sequelize.sync();

console.log("Tables créées automatiquement !");