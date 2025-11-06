import bcrypt from "bcryptjs";

/**
 * Description
 * @param {string} password
 * @returns {any}
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
/**
 * Description
 * @param {string} password
 * @param {string} hash
 * @returns {any}
 */
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
