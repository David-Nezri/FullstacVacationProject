class FormValidate {

    public disablePastDate(daysFromToday: number) {
        const today = new Date();
        const dd = String(today.getDate() + daysFromToday).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    public formatDate(date: string) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

}

const validateDate = new FormValidate();
export default validateDate