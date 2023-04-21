const fs = require("fs/promises");
const jimp = require('jimp');
const path = require("path");
const { User } = require("../../models/user");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res, next) => {
    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;
    const avatarName = `${_id}_${filename}`
    const resultUpload = path.join(avatarsDir, filename);
    const avatarURL = path.join("avatars", avatarName);

    await fs.rename(tempUpload, resultUpload);
    
    const avatar = await jimp.read(resultUpload);
    await avatar.resize(250, 250);
    await avatar.write(resultUpload);
    
    await User.findByIdAndUpdate(_id, {avatarURL});
    

    res.json({avatarURL});
};

module.exports = updateAvatar;
