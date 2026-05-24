import React, { useState } from "react";
import { motion } from "framer-motion";
import { IMAGE_GRID_ITEMS, ImageItem } from "../data/imageGridData";

interface ImageGridProps {
    columns?: number;
    rows?: number;
    setSelectedCategory?: (category: string) => void;
}

export default function ImageGrid({ columns = 2, rows = 2, setSelectedCategory }: ImageGridProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const itemsPerPage = columns * rows;
    const [currentPage, setCurrentPage] = useState(0);

    const visibleItems = IMAGE_GRID_ITEMS.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const totalPages = Math.ceil(IMAGE_GRID_ITEMS.length / itemsPerPage);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const changeCategory = (category: string) => () => {
        console.log("Selected category:", category);
        if (setSelectedCategory) {
            setSelectedCategory(category);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="w-full bg-black py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Grid Container */}
                <motion.div
                    className={`grid gap-6 md:gap-8 mb-12`}
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {visibleItems.map((item: ImageItem, idx: number) => (
                        <motion.div
                            key={`${currentPage}-${idx}`}
                            className="relative h-64 md:h-80 lg:h-96 overflow-hidden group"
                            //   variants={itemVariants}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={changeCategory(item.category)}
                            style={{ cursor: "pointer" }}
                        >
                            {/* Image */}
                            <div
                                className="relative w-full h-full overflow-hidden cursor-pointer"
                            >
                                <motion.img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Overlay - Bottom gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Side gradient vignette */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                            </div>

                            {/* Content Overlay */}
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-end p-4 md:p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    hoveredIndex === idx
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0.7, y: 10 }
                                }
                                transition={{ duration: 0.3 }}
                            >
                                {/* Category Badge */}
                                <div className="inline-flex items-center gap-2 mb-2 w-fit">
                                    <span className="text-primary font-heading font-bold tracking-widest uppercase text-xs">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-heading font-black text-white text-lg md:text-xl lg:text-2xl mb-1 leading-tight">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="font-sans text-white/70 text-sm md:text-base">
                                    {item.desc}
                                </p>

                                {/* Index */}
                                <div className="flex items-baseline gap-1 mt-3">
                                    <span className="font-heading font-black text-white/80 text-sm">
                                        {item.index}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Border accent on hover */}
                            <motion.div
                                className="absolute inset-0 border border-primary/30"
                                animate={hoveredIndex === idx ? { borderColor: "#F0C040" } : {}}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <motion.div
                        className="flex items-center justify-center gap-6 md:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {/* Previous Button */}
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                clipPath:
                                    "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                            }}
                            aria-label="Previous page"
                        >
                            <span className="text-white/80 text-lg">←</span>
                        </button>

                        {/* Page Indicators */}
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className="transition-all duration-300 rounded-full"
                                    style={{
                                        width: i === currentPage ? 20 : 6,
                                        height: 6,
                                        background:
                                            i === currentPage
                                                ? "#F0C040"
                                                : "rgba(255,255,255,0.3)",
                                    }}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                clipPath:
                                    "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                            }}
                            aria-label="Next page"
                        >
                            <span className="text-white/80 text-lg">→</span>
                        </button>
                    </motion.div>
                )}

                {/* Page Counter */}
                {totalPages > 1 && (
                    <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-white/50 text-sm">
                            Page {currentPage + 1} of {totalPages}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
