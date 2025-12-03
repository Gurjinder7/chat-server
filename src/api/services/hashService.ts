import bcrypt from "bcrypt";

const saltRounds = 10;

export const generatePassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

