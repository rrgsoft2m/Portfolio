const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/projects - Public
router.get('/', async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        });
        res.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// GET /api/projects/:id - Public
router.get('/:id', async (req, res) => {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project topilmadi.' });
        }
        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// POST /api/projects - Admin only
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, image, link, category, featured, order } = req.body;
        const project = await prisma.project.create({
            data: { title, description, image, link, category, featured, order },
        });
        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// PUT /api/projects/:id - Admin only
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, image, link, category, featured, order } = req.body;
        const project = await prisma.project.update({
            where: { id: req.params.id },
            data: { title, description, image, link, category, featured, order },
        });
        res.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// DELETE /api/projects/:id - Admin only
router.delete('/:id', auth, async (req, res) => {
    try {
        await prisma.project.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Project o\'chirildi.' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

module.exports = router;
