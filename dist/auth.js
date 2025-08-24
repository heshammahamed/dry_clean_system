import { hash, compare } from "bcrypt";
export function hashPassword(password) {
    return hash(password, 10);
}
export function checkPassword(password, hash) {
    return compare(password, hash);
}
