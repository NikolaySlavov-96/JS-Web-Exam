module.exports = (...extLetter) => (req, res, next) => {
    if (req.body) {
        for(const key in req.body) {
            if(extLetter.includes(key) == false) {
                req.body[key] = req.body[key].trim();
            }
        }
    }
    next();
}