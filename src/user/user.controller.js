const { GetUserByIdMongo, userUpdateMongo } = require("./user.actions");
const auth = require("../auth/auth.actions");

async function GetUserById(id) {
  const user = await GetUserByIdMongo(id);
  return user;
}

async function updateUser(id, data) {
  const { password } = data;
  if (password) {
    data.password = await auth.encryptPassword(password);
  }
  const userUpdated = await userUpdateMongo(id, data);
  
  const updatedUserInfo = {
    id: userUpdated.id,
    email: userUpdated.email,
    name: userUpdated.name,
  };

  return updatedUserInfo;
}

module.exports = { GetUserById, updateUser };
