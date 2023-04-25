const User = require("./UserModel")
const ConflictError = require("../../interfaces/errors/ConflictError");
const ResourceNotFoundError = require("../../interfaces/errors/ResourceNotFoundError");

const getOne = async (payload) => {
    const { phone } = payload;
    const user = await User.findOne({ phone }).exec();
    // if (!user) {
    //     throw new ResourceNotFoundError("User does not exist");
    // }
    return user
}

const create = async (payload) => {
    const { phone, name } = payload;
    const existingUser = await User.find({ phone }).exec();
    if (existingUser && existingUser.length > 0) {
        throw new ConflictError("User already exists");
    }
    const newUser = await User.create({ phone, name });
    return newUser
}

const update = async (payload) => {
    const { phone } = payload;
    const existingUser = await User.find({ phone }, "phone").exec();
    if (!existingUser && existingUser.length === 0) {
        throw new ResourceNotFoundError("User does not exist");
    }
    const newUser = await User.findOneAndUpdate(
        { phone },
        { ...payload },
        { new: true }
    );
    return newUser;
}

const update_level = async (phone, level) => {
    const existingUser = await User.find({ phone }).exec();
    if (!existingUser && existingUser.length === 0) {
        throw new ResourceNotFoundError("User does not exist");
    }
    await User.findOneAndUpdate(
        { phone },
        { $set: { level } },
        { new: true }
    );
    return
}

const update_trials = async (phone, trials) => {
    const existingUser = await User.find({ phone }).exec();
    if (!existingUser && existingUser.length === 0) {
        throw new ResourceNotFoundError("User does not exist");
    }
    let user = await User.findOneAndUpdate(
        { phone },
        { $set: { trials } },
        { new: true }
    );
    return user
}

const update_name = async (phone, name) => {
    const existingUser = await User.find({ phone }).exec();
    if (!existingUser && existingUser.length === 0) {
        throw new ResourceNotFoundError("User does not exist");
    }
    let user = await User.findOneAndUpdate(
        { phone },
        { $set: { name } },
        { new: true, upsert: true }
    );
    return user
}

module.exports = {
    create, update, update_level, update_trials, getOne, update_name
}