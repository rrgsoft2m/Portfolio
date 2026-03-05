'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Upload, ExternalLink, Save } from 'lucide-react';
import { projectsAPI, uploadAPI } from '@/lib/api';

interface Project {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    link: string | null;
    category: string | null;
    featured: boolean;
    order: number;
}

const emptyProject = {
    title: '', description: '', image: '', link: '', category: 'Website', featured: false, order: 0,
};

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [form, setForm] = useState(emptyProject);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProjects = async () => {
        try {
            const res = await projectsAPI.getAll();
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const openCreate = () => {
        setEditingProject(null);
        setForm(emptyProject);
        setModalOpen(true);
    };

    const openEdit = (project: Project) => {
        setEditingProject(project);
        setForm({
            title: project.title,
            description: project.description || '',
            image: project.image || '',
            link: project.link || '',
            category: project.category || 'Website',
            featured: project.featured,
            order: project.order,
        });
        setModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editingProject) {
                await projectsAPI.update(editingProject.id, form);
            } else {
                await projectsAPI.create(form);
            }
            setModalOpen(false);
            fetchProjects();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId || deleting) return;
        setDeleting(true);
        try {
            await projectsAPI.delete(deleteId);
            fetchProjects();
        } catch (err) {
            console.error(err);
        } finally {
            setDeleteId(null);
            setDeleting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await uploadAPI.uploadImage(file);
            setForm({ ...form, image: res.data.url });
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Loyihalar</h1>
                    <p className="text-muted-foreground">Loyihalarni boshqaring</p>
                </div>
                <motion.button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus className="w-4 h-4" />
                    Yangi loyiha
                </motion.button>
            </div>

            {/* Projects Table */}
            <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-border">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nomi</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Kategoriya</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Featured</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.map((project, i) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-accent/50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{project.order || i + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {project.image ? (
                                                <img src={project.image.startsWith('http') ? project.image : `${process.env.NEXT_PUBLIC_API_URL}${project.image}`} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                                                    {project.title.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-sm">{project.title}</p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">{project.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm hidden md:table-cell">
                                        <span className="px-2.5 py-1 rounded-full bg-accent text-xs font-medium">{project.category}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${project.featured ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                                            {project.featured ? 'Ha' : 'Yo\'q'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button onClick={() => handleDeleteClick(project.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />
                )}
                {modalOpen && (
                    <motion.div
                        key="modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 w-auto md:w-full md:max-w-lg glass-card rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">
                                {editingProject ? 'Loyihani tahrirlash' : 'Yangi loyiha'}
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-accent">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Nomi</label>
                                <input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                    placeholder="Loyiha nomi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Tavsif</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm resize-none"
                                    placeholder="Loyiha tavsifi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Rasm</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                        placeholder="Rasm URL"
                                    />
                                    <label className="p-2.5 rounded-xl bg-accent hover:bg-accent/80 cursor-pointer transition-colors">
                                        <Upload className="w-5 h-5" />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </div>
                                {uploading && <p className="text-xs text-muted-foreground mt-1">Yuklanmoqda...</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5">Havola</label>
                                <input
                                    value={form.link}
                                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Kategoriya</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                    >
                                        <option value="Website">Website</option>
                                        <option value="Web App">Web App</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Education">Education</option>
                                        <option value="Bot">Bot</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Tartib</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={form.featured}
                                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                />
                                <label htmlFor="featured" className="text-sm font-medium">Featured loyiha</label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
                                >
                                    Bekor qilish
                                </button>
                                <motion.button
                                    onClick={handleSave}
                                    disabled={saving || !form.title}
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {saving ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Saqlash
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {deleteId && (
                    <motion.div
                        key="delete-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setDeleteId(null)}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />
                )}
                {deleteId && (
                    <motion.div
                        key="delete-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[30%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 w-auto md:w-full md:max-w-md glass-card rounded-2xl p-6"
                    >
                        <h2 className="text-xl font-bold mb-2">O'chirishni tasdiqlang</h2>
                        <p className="text-muted-foreground text-sm mb-6">Siz rostdan ham ushbu loyihani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={deleting}
                                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors disabled:opacity-50"
                            >
                                {deleting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "O'chirish"
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
