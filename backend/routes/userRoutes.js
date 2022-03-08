const express = require("express");
const { registerUser, authUser,allUser } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
                
const router = express.Router();

// Routes Defined
router.route("/").post(registerUser).get(protect,allUser);
router.post('/login', authUser)


module.exports = router; 