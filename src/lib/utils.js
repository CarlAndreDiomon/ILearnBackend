import jwt from "jsonwebtoken";

export const generateToken = (userId,role, res) => {

    const token = jwt.sign({userId, role}, process.env.JWT_SECRET, {
        expiresIn:"30d"
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: 'None', // CSRF attacks cross-site request forgery attacks
        secure: true,
    });

    return token;
};