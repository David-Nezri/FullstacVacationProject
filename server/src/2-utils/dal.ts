import mysql from "mysql";
import config from "./config";

// Creating a connection object:
const connection = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

console.log("you r connected to db");

function execute(sql: string, values: any[]): Promise<any> {

    return new Promise<any>((resolve, reject) => {

        // Execute the sql on MySQL:
        connection.query(sql, values, (err, result) => {

            // If there is an error: 
            if (err) {
                reject(err);
                return;
            }

            // No error - report data: 
            resolve(result);
        });

    });
}

export default {
    execute
};