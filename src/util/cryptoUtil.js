import bcrypt from "bcrypt";

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { createHash, compareHash };
