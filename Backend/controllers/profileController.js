const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.find();
  res.json(profile);
});

const createProfile = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const profile = new Profile({ user: req.user._id, title, content });
    const createdProfile = await profile.save();
    res.status(201).json(createdProfile);
  }
});

const getProfileByID = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const profile = await Profile.findById(req.params.id);

  if (profile.user.toString() !== req.user._id.toString()) {
    req.status(401);
    throw new Error("You can't perform this action");
  }

  if (profile) {
    profile.title = title;
    profile.content = content;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    res.status(404);
    throw new Error("Profile not found");
  }
});

const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile.user.toString() !== req.user._id.toString()) {
    req.status(401);
    throw new Error("You can't perform this action");
  }

  if (profile) {
    await profile.remove();
    res.json({ message: "Profile deleted" });
  } else {
    res.status(404);
    throw new Error("Profile not found");
  }
});

module.exports = {
  getProfile,
  createProfile,
  getProfileByID,
  updateProfile,
  deleteProfile,
};
