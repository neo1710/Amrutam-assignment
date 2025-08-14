module.exports = function (req, res, next) {
    const { name, email, password, specialization, mode } = req.body;
    if (!name || !email || !password || !specialization || !mode) {
        return res.status(400).send({ msg: "All fields are required" });
    }
    if (!["online", "in-person"].includes(mode)) {
        return res.status(400).send({ msg: "Mode must be either 'online' or 'in-person'" });
    }
    next();
};
