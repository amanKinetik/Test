import userModel, { validUserTypes } from "../models/user.js";

export const verifyAdminUser = async function(req, res, next) {
  try {
    const { query: { requestingUserId } } = req;
    if (!requestingUserId)
      throw "Invalid Request";      
    const user = await userModel.findOne({ userId: requestingUserId });
    console.log(user.toJSON());
    if (user?.userType !== validUserTypes.ADMIN)
      throw "Invalid Request";
    next();
  } catch (error) {
    next(error);
  }
}