const bcrypt = require('bcryptjs');

module.exports = {
    crypt: async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            
            return await bcrypt.hash(password, salt);
        } catch (err) {
            throw new Error(err);
        }
    },

    uncrypt: async (password, heshedPassword) => {
        try {
            return await bcrypt.compare(password, heshedPassword);
        } catch (err) {
            throw new Error(err);
        }
    }
}