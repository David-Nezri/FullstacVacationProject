import fsPromises from "fs/promises";
import fs from "fs";

async function safeDelete(fileName: string): Promise<void> {
    try {
        // if there is no file name > do nothing
        if (!fileName) return;
        if (fs.existsSync(fileName)) {
            // Check if file exist
            await fsPromises.unlink(fileName); // Delete the file
        }
    } catch (err: any) {
        console.log(err.msg);
    }
}

export default safeDelete;
