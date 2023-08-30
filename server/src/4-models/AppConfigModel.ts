export type AppConfigType = {
    host: string // localhost / computer name/adress of our database
    user: string; // DB user
    password: string // the DB user password
    database: string // northwind
    port: number // our port number
    imagesFolderPath: string
    devMode:boolean
}