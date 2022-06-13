const router = require("express").Router();
const controller = require("../controller/user");
const authenticateUser = require("../../middlewares/authenticateUser")

// Routes Endpoints
// testpassword
// philomina, boyz123
router.post("/register", controller.register)
router.post("/signup", controller.register)
router.post("/login", controller.login)
router.get("/profile", authenticateUser, controller.profile)
// router.put("/profile", controller.editProfile)
// router.post("/change-password", controller.changePassword)
// router.get("/" , controller.index)
// router.post("/logout", controller.logout)
// router.put("/:id", controller.editUser)
// router.post("/forgot-password", controller.forgotPassword)

module.exports = router;