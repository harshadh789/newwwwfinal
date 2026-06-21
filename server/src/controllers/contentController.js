const prisma = require('../utils/prisma');

const getPackages = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      where: { status: 'PUBLISHED' },
      include: { destination: true }
    });
    return res.status(200).json(packages);
  } catch (error) {
    console.error('getPackages error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const getDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    return res.status(200).json(destinations);
  } catch (error) {
    console.error('getDestinations error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const submitInquiry = async (req, res) => {
  try {
    // Only authenticated users can submit inquiries natively via this endpoint
    // Requires requireAuth middleware on the route
    const { packageId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        userId: req.user.id,
        packageId: packageId || undefined,
        message: message,
        status: 'PENDING'
      }
    });

    return res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    console.error('submitInquiry error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

const getMyInquiries = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: { userId: req.user.id },
      include: { package: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error('getMyInquiries error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  getPackages,
  getDestinations,
  submitInquiry,
  getMyInquiries
};
