import { Notyf } from "notyf";
class NotifyService {

    // Private field for displaying notifications
    private notify = new Notyf({
        duration: 3000,
        position: { x: "right", y: "bottom" },
        ripple: false,
        types: [
            {
                type: "success",
                className: 'notification',
                background: 'green',
            },
            {
                type: "error",
                className: 'notification',
            }
        ]
    });

    // Display success message
    public success(message: string): void {
        this.notify.success(message);
    }

    // Display error message
    public error(err: any): void {
        const message = this.extractErrorMessage(err)
        this.notify.error(message);
    }

    public extractErrorMessage(err: any): string {

        // 1. If the err is the string message:
        if(typeof err === "string" ) return err;

        // 2. If server response with error message to axios:
        if(typeof err.response?.data === "string" ) return err.response.data

        // 3. If server response with array of error messages to axios:
        if(Array.isArray(err.response?.data)) return err.response.data[0]

        // 4. If frontend throw new Error("..."):
        if(typeof err.message === "string" ) return err.message;

        // 5. On any other case:
        console.log(err)
        return "Some error occurred, please try again";

    }
}

const notifyService = new NotifyService();
export default notifyService;
