const { model: User } = require('./userModel');

exports.createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (e) {
        throw e;
    }
}

exports.isUser = async ({ email, password }) => {
    try {
        const [user] = await User.find({ email });
        if (user) {
            const match = await user.comparePassword(password);
            if (match) {
                return user;
            }
        }
    } catch (e) {
        throw e;
    }
}