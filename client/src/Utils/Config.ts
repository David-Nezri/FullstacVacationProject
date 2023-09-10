const config = {
    serverUrl: "http://localhost:3001/",
    serverStaticsImages: "http://localhost:3001/static/images/",
    serverStaticsIcons: "http://localhost:3001/static/icons/",
    serverStaticsGifs: "http://localhost:3001/static/gifs/",
    routes: {
        getAllVacations: "http://localhost:3001/api/vacations/",
        getVacation: "http://localhost:3001/api/vacation/",
        addFollower: "http://localhost:3001/api/followers",
        removeFollower: "http://localhost:3001/api/followers",
        register: "http://localhost:3001/api/auth/register",
        login: "http://localhost:3001/api/auth/login",
        deleteVacation: "http://localhost:3001/api/vacations/",
        updateVacation: "http://localhost:3001/api/vacations/",
        addVacation: "http://localhost:3001/api/vacation/",
        getReportData: "http://localhost:3001/api/report",
    },
    numOfVacationsOnPage: 9,
};

export default config;

