import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "merchant_navy",
  port: 3306 // change if needed
});

console.log("MySQL Connected");

export default db;
