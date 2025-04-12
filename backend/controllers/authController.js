const prisma = require('../utils/prisma');

exports.registerUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    const user = await prisma.user.create({
      data: { email, name }
    });

    res.status(201).json(user);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: err.message });
  }
};
