import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.fileupload.js";

const registerUser = asyncHandler(async (req, res) => {
  /*
    -----------Steps for register user ------------
    1.get user detail (FE)
    2. check if all required fields exists or not and according to validation or not (FE)
    3. check if files are there not i.e images and then check avatar or cover images (FE)
    4. send data to BE
    5. check if it is duplicate entry or not: email or username (BE validation if existing user or not)
    6. check if files are there not i.e images and then check avatar or cover images (BE)
    7. upload them in multer and then in cloudinary, check if avatar uploaded in cloudinary successfully or not
    8. create user object once all checksand upload done. -> Entry creation in db
    9. send the user data created once user creation done successfuly to FE -> but remove password and refresh token from response
  */

  // req.body => payload from frontend
  const { userName = "", email = "", fullName = "", password = "" } = req.body;
  const checkIfAnyFieldEmptyString = [userName, email, fullName, password].some(
    (item) => item.trim() === ""
  );

  if (checkIfAnyFieldEmptyString) {
    throw new ApiError(400, "All fields are required");
  }
  // TODO CHECK EMAIL VALIDATION IF IT IS VALID EMAIL FORMAT OR NOT

  // Check if existing user or not
  // User.findOne({userName: userName}, () => {});
  const existedUser = User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // MULTER gives req.files
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const resAvatar = await cloudinaryUpload(avatarFile);
  const resCoverImage = await cloudinaryUpload(coverImageLocalPath);

  if (!resAvatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const userCreateRes = await User.create({
    fullName,
    userName: userName.toLowercase(),
    password,
    email,
    avatar: resAvatar?.url,
    coverImage: resCoverImage?.url || "",
  });

  // check if user has created or not and once
  // we got the response, remove password and refreshtoken fields.
  const createdUser = await User.findById(userCreateRes).select(
    "-password -refreshToken"
  );

  if (createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).send({
    message: "ok",
  });
});

export { registerUser, loginUser };
