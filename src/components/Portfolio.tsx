import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { VIDEO_CATEGORIES, VIDEO_PATHS, getVideosByCategory } from "@/data/videoPaths";

interface VideoData {
    video: string;
    category: string;
    title: string;
    desc: string;
    index: string;
}

export default function Portfolio({category}: {category: string}) {
    const [selectedCategory, setSelectedCategory] = useState<string>(category || VIDEO_CATEGORIES.CGI_VFX);
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
    const [isPlayingOverlay, setIsPlayingOverlay] = useState(false);

    const videos = getVideosByCategory(selectedCategory);

    const categories = [
        { name: VIDEO_CATEGORIES.CGI_VFX, label: "CGI & VFX", color: "from-primary to-yellow-500" },
        { name: VIDEO_CATEGORIES["3D_ANIMATION"], label: "3D Animation", color: "from-primary to-yellow-500" },
        { name: VIDEO_CATEGORIES.MOTION_GRAPHICS, label: "Motion Graphics", color: "from-primary to-yellow-500" },
        { name: VIDEO_CATEGORIES.VIDEO_EDITING, label: "Video Editing", color: "from-primary to-yellow-500" },
    ];

    useEffect(() => {
        setSelectedCategory(category);
    }, [category]);

    return (
        <section className="py-24 px-6 relative z-100" id="portfolio">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block"
                    >
            // Portfolio
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-black uppercase mb-6"
                    >
                        Our Creative Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-lg font-sans"
                    >
                        Explore our portfolio by category. Click on any video to view it in full detail.
                    </motion.p>
                </div>

                {/* Category Badges */}
                <motion.div
                    id="category-badges"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.05 }}
                            className={`relative px-6 py-3 rounded-full font-heading font-bold text-sm tracking-wider uppercase transition-all duration-300 ${selectedCategory === cat.name
                                ? `bg-gradient-to-r ${cat.color} text-black shadow-[0_0_30px_rgba(255,215,0,0.5)]`
                                : "border border-border/30 text-foreground/60 hover:border-border/60 hover:text-foreground"
                                }`}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Video Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    <AnimatePresence mode="wait">
                        {videos.map((video, idx) => (
                            <motion.div
                                key={`${selectedCategory}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => {
                                    setSelectedVideo(video);
                                    setIsPlayingOverlay(true);
                                }}
                                className="group relative h-40 sm:h-48 rounded-lg overflow-hidden cursor-pointer border border-border/20 hover:border-secondary/40 transition-all duration-300"
                            >
                                {/* Video Thumbnail Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />

                                {/* Play Button Icon */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-300"
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.6)]">
                                        <Play className="w-8 h-8 text-black fill-black" />
                                    </div>
                                </motion.div>

                                {/* Video Info */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-1">
                                        {video.index}
                                    </p>
                                    <h3 className="text-white font-heading font-bold text-sm line-clamp-2">
                                        {video.title}
                                    </h3>
                                    <p className="text-white/60 text-xs mt-1 line-clamp-1">{video.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Video Count */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground text-sm font-sans">
                        Showing <span className="text-secondary font-bold">{videos.length}</span> videos in{" "}
                        <span className="text-secondary font-bold">{selectedCategory}</span>
                    </p>
                </motion.div>
            </div>

            {/* Video Overlay Player */}
            <AnimatePresence>
                {isPlayingOverlay && selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsPlayingOverlay(false)}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 mt-16"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsPlayingOverlay(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-all duration-300"
                                aria-label="Close video"
                            >
                                <X className="w-6 h-6 text-black" />
                            </motion.button>

                            {/* Video Player */}
                            <div className="aspect-video bg-black flex items-center justify-center relative group">
                                <video
                                    src={selectedVideo.video}
                                    controls
                                    autoPlay
                                    className="w-full h-full"
                                    controlsList="nodownload"
                                />
                            </div>

                            {/* Video Info */}
                            <div className="p-6 bg-gradient-to-t from-background/95 to-background/70">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-2">
                                            {selectedVideo.category} • {selectedVideo.index}
                                        </p>
                                        <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                                            {selectedVideo.title}
                                        </h3>
                                        <p className="text-muted-foreground font-sans text-sm">
                                            {selectedVideo.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
