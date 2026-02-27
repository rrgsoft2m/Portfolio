const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/visitors - Track visit (public)
router.post('/', async (req, res) => {
    try {
        const visitor = await prisma.visitor.create({
            data: {
                ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
                userAgent: req.headers['user-agent'] || '',
                page: req.body.page || '/',
                country: req.body.country || null,
            },
        });
        res.status(201).json({ success: true });
    } catch (error) {
        console.error('Track visitor error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

// GET /api/visitors - Admin stats
router.get('/', auth, async (req, res) => {
    try {
        const totalVisitors = await prisma.visitor.count();

        // Unique visitors (by IP)
        const uniqueVisitors = await prisma.visitor.groupBy({
            by: ['ip'],
        });

        // Last 30 days daily visitors
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const dailyVisitors = await prisma.visitor.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: { gte: thirtyDaysAgo },
            },
            _count: { id: true },
        });

        // Process daily stats
        const dailyStats = {};
        const visitors = await prisma.visitor.findMany({
            where: { createdAt: { gte: thirtyDaysAgo } },
            select: { createdAt: true },
        });

        visitors.forEach((v) => {
            const date = v.createdAt.toISOString().split('T')[0];
            dailyStats[date] = (dailyStats[date] || 0) + 1;
        });

        // Top pages
        const topPages = await prisma.visitor.groupBy({
            by: ['page'],
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 10,
        });

        res.json({
            totalVisitors,
            uniqueVisitors: uniqueVisitors.length,
            dailyStats: Object.entries(dailyStats).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
            topPages: topPages.map((p) => ({ page: p.page || '/', count: p._count.id })),
        });
    } catch (error) {
        console.error('Get visitors error:', error);
        res.status(500).json({ error: 'Server xatosi.' });
    }
});

module.exports = router;
