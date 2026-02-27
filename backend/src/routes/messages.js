const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/messages - Public
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Barcha maydonlar talab qilinadi.' });
        }

        const newMessage = await prisma.message.create({
            data: { name, email, message },
        });

        res.status(201).json({ success: true, message: 'Xabar muvaffaqiyatli yuborildi!' });
    } catch (error) {
        console.error('Create message error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// GET /api/messages - Admin only
router.get('/', auth, async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// PUT /api/messages/:id/read - Mark as read
router.put('/:id/read', auth, async (req, res) => {
    try {
        const message = await prisma.message.update({
            where: { id: req.params.id },
            data: { read: true },
        });
        res.json(message);
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// DELETE /api/messages/:id - Admin only
router.delete('/:id', auth, async (req, res) => {
    try {
        await prisma.message.delete({
            where: { id: req.params.id },
        });
        res.json({ message: "Xabar o'chirildi." });
    } catch (error) {
        console.error('Delete message error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

module.exports = router;
