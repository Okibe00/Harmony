import bcrypt  from 'bcrypt';

/**
 * @param {string} plain - string representation of password
 * @param {number} salt - salt round for hashing
 * @returns hashed password
 */

const hashPassword = async (plain, salt) => {
  const genSalt = await bcrypt.genSalt(salt);
  return await bcrypt.hash(plain, genSalt);
}

export default hashPassword;
