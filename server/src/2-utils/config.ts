import { AppConfigType } from "../4-models/AppConfigModel";

const config: AppConfigType = {
    host: "localhost",
    user: "root",
    password: "",
    database: "vacations",
    port: 3001,
    imagesFolderPath: "./src/1-assets/images/",
    devMode: true,
};

export default config;
