import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Create contact message
    const contactMessage = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    await contactMessage.save();

    res.status(201).json({
      message: 'Thank you for your message! We will get back to you soon.',
      success: true
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error while submitting your message' });
  }
});

// Get all contact messages (admin only - for future implementation)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find({})
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
});

// Mark message as read (admin only - for future implementation)
router.patch('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    
    const message = await ContactMessage.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Server error updating message' });
  }
});

export default router;