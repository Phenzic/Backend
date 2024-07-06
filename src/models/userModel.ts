import bcrypt from 'bcryptjs';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const users: User[] = [];

const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (enteredPassword: string, storedPassword: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, storedPassword);
};

const getUserId = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};


export {getUserId, hashPassword, comparePassword}