const validateUserRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  // Name check
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ msg: "Name must be at least 2 characters long" });
  }

  // Email check (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email address" });
  }

  // Password check (min 6 chars, at least one letter and one number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({ 
      msg: "Password must be at least 6 characters long and contain both letters and numbers" 
    });
  }

  next(); // Validation passed
};

module.exports = validateUserRegistration;