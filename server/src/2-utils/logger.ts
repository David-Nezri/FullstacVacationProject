import fsPromise from 'fs/promises'

export const logger = async (msg: string): Promise<void> => {
    const now = new Date()
    let line = `\n ${now.toLocaleString()} - ${msg}  \n ---------------------------------------------`
    await fsPromise.appendFile('./logger.txt', line)
}