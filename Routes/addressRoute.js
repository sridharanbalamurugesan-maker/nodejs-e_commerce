const express = require("express");
const auth = require("../MiddleWare/AuthValidate");
const validate = require("../MiddleWare/validation");
const addressDto = require("../Dto/addressDto");
const {
  addAddress,
  getAddressesByUser,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../Controller/addressController");

const router = express.Router();

router.post("/add", auth, validate(addressDto), addAddress);
router.get("/get-by-user", auth, getAddressesByUser);
router.put("/update/:id", auth, validate(addressDto), updateAddress);
router.delete("/delete/:id", auth, deleteAddress);
router.put("/set-default/:id", auth, setDefaultAddress);

module.exports = router;
