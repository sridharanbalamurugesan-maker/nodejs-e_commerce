const Address = require("../Models/Address");

exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, mobile, addressLine, city, state, pincode, isDefault } =
      req.validatedData;

    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const addressCount = await Address.countDocuments({ user: userId });
    const shouldBeDefault = isDefault || addressCount === 0;

    if (shouldBeDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const newAddress = await Address.create({
      user: userId,
      fullName,
      mobile,
      addressLine,
      city,
      state,
      pincode,
      isDefault: shouldBeDefault,
    });

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAddressesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ user: userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { fullName, mobile, addressLine, city, state, pincode, isDefault } =
      req.validatedData;

    const address = await Address.findOne({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      { fullName, mobile, addressLine, city, state, pincode, isDefault },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await Address.findOneAndDelete({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (address.isDefault) {
      const nextDefault = await Address.findOne({ user: userId }).sort({
        createdAt: -1,
      });
      if (nextDefault) {
        nextDefault.isDefault = true;
        await nextDefault.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    await Address.updateMany({ user: userId }, { isDefault: false });
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated",
      data: address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
