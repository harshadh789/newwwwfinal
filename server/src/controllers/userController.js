const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');

const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        mobile: true,
        dob: true,
        city: true,
        country: true,
        avatarUrl: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateMe = async (req, res) => {
  try {
    const { fullName, mobile, dob, city, country, avatarUrl } = req.body;
    
    // Process Date of Birth if provided
    let parsedDob = undefined;
    if (dob) {
      parsedDob = new Date(dob);
    } else if (dob === "") {
      parsedDob = null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        fullName: fullName !== undefined ? fullName : undefined,
        mobile: mobile !== undefined ? mobile : undefined,
        dob: parsedDob,
        city: city !== undefined ? city : undefined,
        country: country !== undefined ? country : undefined,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        mobile: true,
        dob: true,
        city: true,
        country: true,
        avatarUrl: true,
        role: true
      }
    });

    return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('updateMe error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const savedItems = await prisma.savedItem.findMany({
      where: { userId: req.user.id },
      include: {
        package: true,
        destination: true
      }
    });

    return res.status(200).json(savedItems);
  } catch (error) {
    console.error('getWishlist error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  getMe,
  updateMe,
  getWishlist
};
