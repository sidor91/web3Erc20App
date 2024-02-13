import { users } from "../constants/users";

export function validatePrivateKey(privateKey: string) {
  return Object.values(users).includes(privateKey);
}