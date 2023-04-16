const ErrorHandler = require("../../interfaces/errors");
const User = require("./UserModel")

const getOne = async (payload) => {
    const { phone } = payload;
    const user = await User.find({ phone }, "phone").exec();
    if (!user) {
        throw ErrorHandler.notFound();
    }
    return user
}

const create = async (payload) => {
    const { phone } = payload;
    const existingUser = await User.find({ phone }, "phone").exec();
    if (existingUser) {
        return ErrorHandler.conflictError();
    }
    const newUser = await this.createDoc({
        ...payload,
        created_by: this.currentUser._id,
    });
    return newUser
}

const update = async (payload) => {
    const { phone } = payload;
    const existingUser = await User.find({ phone }, "phone").exec();
    if (!existingUser) {
        throw ErrorHandler.notFound();
    }
    const newUser = await User.findOneAndUpdate(
        { phone },
        { ...payload },
        { new: true }
    );
    return newUser;
}

const update_level = async (phone, level) => {
    const existingUser = await User.find({ phone }, "phone").exec();
    if (!existingUser) {
        throw ErrorHandler.notFound();
    }
    await User.findOneAndUpdate(
        { phone },
        { $set: { level: new_level } },
        { new: true }
    );
    return
}

const update_trials = async (phone, level) => {

    return
}

module.exports = {
    create, update, update_level, update_trials, getOne
}