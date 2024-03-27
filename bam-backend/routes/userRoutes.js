const express = require("express");
const { registerUserController, loginUserController, getUsers, deleteUser, updateUsers, updatePassword, getProfile } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUserController);

router.post("/login", loginUserController);

router.get("/getUsers", getUsers);

router.delete("/deleteUser/:id", deleteUser);

router.put("/updateUsers/:id", updateUsers);

router.put("/updatePassword", updatePassword);

router.get("/getProfile/:emaild", getProfile);


module.exports = router;