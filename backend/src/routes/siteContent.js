const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/site-content - Public
router.get('/', async (req, res) => {
    try {
        const contents = await prisma.siteContent.findMany();
        // Convert to key-value object for easier consumption
        const contentMap = {};
        contents.forEach((c) => {
            contentMap[c.key] = { value: c.value, type: c.type, id: c.id };
        });
        res.json(contentMap);
    } catch (error) {
        console.error('Get site content error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// PUT /api/site-content - Admin only (update multiple)
router.put('/', auth, async (req, res) => {
    try {
        const updates = req.body; // { key: value, key2: value2, ... }

        const results = [];
        for (const [key, value] of Object.entries(updates)) {
            const result = await prisma.siteContent.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value), type: 'text' },
            });
            results.push(result);
        }

        res.json({ success: true, updated: results.length });
    } catch (error) {
        console.error('Update site content error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// PUT /api/site-content/:key - Admin only (update single)
router.put('/:key', auth, async (req, res) => {
    try {
        const { value, type } = req.body;
        const result = await prisma.siteContent.upsert({
            where: { key: req.params.key },
            update: { value: String(value), ...(type && { type }) },
            create: { key: req.params.key, value: String(value), type: type || 'text' },
        });
        res.json(result);
    } catch (error) {
        console.error('Update single content error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

module.exports = router;
