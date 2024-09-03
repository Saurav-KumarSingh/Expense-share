const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Successfully logged out', success: true });
};

module.exports = logout;
