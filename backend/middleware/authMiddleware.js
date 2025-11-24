

const protect = (req, res, next) => {
    // Bypass token check as requested
    next();
};

module.exports = { protect };
