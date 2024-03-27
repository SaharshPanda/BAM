const expressAsyncHandler = require("express-async-handler");
const users = require("../models/userModel")
const jwt = require("jsonwebtoken")

const registerUserController = expressAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error({ Message: "All fields are mandatory" });
  }
  const existingUser = await users.findOne({email});
  if(existingUser){
    res.status(400).json({"message" : "User already registered!"});
  }
  else {
    const userObject = {
      fullname,
      email,
      password,
      enabled: true, 
      role: "user",
    };
    const createUser = await users.create(userObject)
    res.status(200).json({"user" : createUser,
    "message" : "Registration Successfull"})
  }
});

const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const registeredUser = await users.findOne({email})
  if (!email || !password) {
    res.status(400);
    throw new Error({ Message: "All fields are mandatory" });
  }
  if(registeredUser && registeredUser.password === password && registeredUser.
    enabled === "true") {
    const accessToken = jwt.sign(
      {
          userData : {
              fullname : registeredUser.fullname,
              email : registeredUser.email,
              id : registeredUser.id

          },
      }, process.env.ACCESS_TOKEN_SECRET,{
          expiresIn : '30m'
      }
  );
    res.status(200).json({"message": "Successfully logged in",
  "accessToken" : accessToken})
  }
  else{
    res.status(400).json({message: "Failed to authenticate"})
  }
  res.status(200).json({ logindata: req.body });
});

const getUsers= expressAsyncHandler(async (req, res) => {
  const userList =await users.find();
  res.status(200).json(userList)
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userToDelete = await users.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ message: "Budget not found" });
    }
await userToDelete.deleteOne();
    
    res.status(200).json("User Deleted");
} catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error: error.message });
}
}
);


const updateUsers = expressAsyncHandler(async (req, res)=>{
  const availableUser = await users.findById(req.params.id);
  if(!availableUser){
      res.status(404);
      throw new Error("User not found")

  }

  const updateAvailableUser = await users.findByIdAndUpdate(req.params.id , req.body, {new: true}) 
      res.status(200).json(updateAvailableUser)
  })


const updatePassword = expressAsyncHandler(async (req, res)=>{
    const { email, password, newPassword } = req.body;
    const registeredUser = await users.findOne({ email });

  if (!registeredUser || password !== registeredUser.password) {
    res.status(400);
    throw new Error("Wrong password");
  }

  // Update only the password field
  registeredUser.password = newPassword;
  await registeredUser.save();

  res.status(200).json({ message: "Password updated successfully" });
    }
  )


  const getProfile = expressAsyncHandler(async (req, res)=>{
    const email = req.params.emaild;
    const registeredUser = await users.findOne({ email });
    res.status(200).json(registeredUser)
    }
  )

module.exports = { registerUserController, loginUserController, getUsers, deleteUser, updateUsers, updatePassword, getProfile };
