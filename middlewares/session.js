const { verifyToken } = require("../services/userServices");

module.exports = () => async (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        try {
            const userVerify = verifyToken(token);
            req.user = userVerify;
            res.locals.email = userVerify.email;
        } catch(err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return
        }
    }
    next();
}