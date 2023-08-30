import crypto from "crypto"

const salt = "wooowwwooowww"

function hash(plainText: string) : string {

    // if there is no text > don't do anything
    if (!plainText) return null;

    // Salt and Hash the input string and return it
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex")

}

export default hash