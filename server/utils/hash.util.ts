import bcrypt from "bcrypt";

/**
 * Hashes the given password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

/**
 * Compares a given password to a given hash using bcrypt.
 * @param password - The password to compare.
 * @param hash - The hash to compare to.
 * @returns A boolean indicating whether the password matches the hash.
 */
export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
