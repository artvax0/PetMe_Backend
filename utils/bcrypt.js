import bcrypt from "bcryptjs";


const generateUserPassword = (pw) => bcrypt.hashSync(pw, 10);

const comparePasswords = (pw, cryptedPw) => bcrypt.compareSync(pw, cryptedPw);

export { generateUserPassword, comparePasswords };