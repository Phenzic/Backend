import bcrypt from "bcryptjs";
import { Db, Collection } from 'mongodb';


export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  phoneNumber: string;
  photo: string;
  profileDescription: string;
  facility: string;
  cadre: string;
  firstTimeConsultationFee: number;
  followUpConsultationFee: number;
  availableTime: string;
  annualLicense: string;
  fullLicense: string;
  nationalIdentification: string;
  medicalIndustryInsurance: string;
  lAndA: string;
  role: 'doctor' | 'nurse' | 'patient';
}

let usersCollection: Collection<User>;

const getUsersCollection = (db: Db): Collection<User> => {
  if (!usersCollection) {
    usersCollection = db.collection<User>('users');
  }
  return usersCollection;
};

// export const users: User[] = [];

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (
  enteredPassword: string,
  storedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

// const getUserId = (id: string): User | undefined => {
//   return users.find((user) => user.id === id);
// };

export { hashPassword, comparePassword, getUsersCollection };
