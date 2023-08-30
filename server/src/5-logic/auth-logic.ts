import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../4-models/client-errors";
import {UserModel} from "../4-models/user-model";
import auth from "../2-utils/auth";
import {CredentialModel, validateCredential} from "../4-models/credentials-model";
import hash from "../2-utils/cyber";
import { v4 as uuid } from "uuid";

async function register(user: UserModel): Promise<string> {
    
    // Hash password
    user.password = hash(user.password);

    // user UUID  
    user.userUuid = uuid();

    //default roleId 
    user.roleId = 2;

     //Validate user data
     const validationError = validateCredential(user);
     if (validationError) {
         console.error("Validation error:", validationError);
     } else {
         console.log("user are valid.");
     }

    // Insert new user 
    const sql =
        `INSERT IGNORE INTO users(userUuid, firstName, lastName, username, password)
         VALUES (?, ?, ?, ?, ? );
        `
    const result: OkPacket = await dal.execute(sql, [ user.userUuid, user.firstName, user.lastName, user.username, user.password, user.username, ]);
    //throw new error if user exist
    if (result.affectedRows === 0)
        throw  ValidationError("username is already exist");

    // Delete password from user object
    delete user.password;
    delete user.userId;

    //new token to user
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialModel): Promise<string> {

    // Hash user password
    credentials.password = hash(credentials.password);
    // Validate user data
     const validationError = validateCredential(credentials);
     if (validationError) {
         console.error("Validation error:", validationError);
     } else {
         console.log("credentials are valid.");
     }
    // Get user by username and password
    const sql =  `SELECT *
                  FROM users
                  WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [
        credentials.username,
        credentials.password,
    ]);
    
    if (users.length === 0)
        throw  UnauthorizedError("Incorrect username or password");

    // Extract user 
    const user = users[0];

    // Delete password from user object
    delete user.password;
    delete user.userId;

    //new token
    const token = auth.generateNewToken(user);
    return token;
}

export default {
    register,
    login,
};
