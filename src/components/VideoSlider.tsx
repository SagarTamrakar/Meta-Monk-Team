import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { ALL_VIDEOS, getVideosByCategory } from "../data/videoPaths";

interface VideoSlide {
    video: string;
    category: string;
    title: string;
    desc: string;
    index: string;
}


export default function VideoSlider({ selectedCategory }: { selectedCategory: string }) {
    console.log("Selected category in VideoSlider:", selectedCategory);
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [muted, setMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [VIDEOS, setVIDEOS] = useState<VideoSlide[]>(getVideosByCategory(selectedCategory));
    const [slide, setSlide] = useState<VideoSlide | null>(getVideosByCategory(selectedCategory)[0]);
    useEffect(() => {
        setVIDEOS(getVideosByCategory(selectedCategory || "Motion Graphics"));
        setCurrent(0);
        setProgress(0);
        const newVideos = getVideosByCategory(selectedCategory || "Motion Graphics");
        setSlide(newVideos[0] || null);
        setPlaying(true);
    }, [selectedCategory]);

    const next = useCallback(() => {
        if (VIDEOS.length < 2) {
            setProgress(0);
            setCurrent(0);
            return
        }
        setCurrent((c) => (c + 1) % VIDEOS.length);
        setProgress(0);
    }, []);

    const prev = useCallback(() => {
        if (VIDEOS.length < 2) {
            setProgress(0);
            return
        }
        setCurrent((c) => (c - 1 + VIDEOS.length) % VIDEOS.length);
        setProgress(0);
    }, []);

    const goToSlide = useCallback((index: number) => {
        if (VIDEOS.length < 2) return;
        setCurrent(index);
        setProgress(0);
    }, []);

    /* Handle video time update */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        const handleEnded = () => {
            next();
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("ended", handleEnded);
        video.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("ended", handleEnded);
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, [next]);

    /* Sync play/pause state with video */
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (playing) {
            video.play().catch(() => {
                /* Autoplay might be blocked */
            });
        } else {
            video.pause();
        }
    }, [playing]);

    /* Handle progress bar click */
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    };

    useEffect(() => {
        setSlide(VIDEOS[current] || null);
    }, [current]);
    
    return (
        <div className="relative w-full overflow-hidden bg-black select-none" style={{ height: "82vh", minHeight: 480 }}>

            {/* ── Cinematic letterbox bars ── */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-black" style={{ height: "7%" }} />
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-black" style={{ height: "7%" }} />

            {/* ── Video slides ── */}
            <AnimatePresence mode="sync" initial={false}>
                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                >
                    {/* Video container */}
                    <div className="absolute inset-0">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            muted={muted}
                            controls={false}
                            preload="metadata"
                            autoPlay
                        >
                            <source src={slide?.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    {/* Side vignette */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

                    {/* ── Text overlay ── */}
                    <motion.div
                        className="absolute left-8 md:left-16 z-20"
                        style={{ bottom: "13%" }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Category badge */}
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="text-primary font-heading font-bold tracking-[0.25em] uppercase text-xs">
                                {slide?.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3
                            className="font-heading font-black uppercase text-white mb-1"
                            style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", lineHeight: 1.05, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                        >
                            {slide?.title}
                        </h3>

                        {/* Description */}
                        <p className="font-sans text-white/60 text-sm md:text-base mt-2" style={{ maxWidth: 420 }}>
                            {slide?.desc}
                        </p>
                    </motion.div>

                    {/* ── Slide counter (top right) ── */}
                    <motion.div
                        className="absolute right-8 md:right-16 z-20 flex items-baseline gap-1"
                        style={{ top: "11%" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="font-heading font-black text-white/90 text-2xl">{slide?.index}</span>
                        <span className="font-heading text-white/30 text-sm">/ {String(VIDEOS.length).padStart(2, "0")}</span>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* ── Progress bar (just above bottom letterbox) ── */}
            <div
                className="absolute left-0 right-0 z-40 cursor-pointer"
                style={{ bottom: "7%", height: "2px" }}
                onClick={handleProgressClick}
            >
                <div className="w-full h-full bg-white/10" />
                <motion.div
                    className="absolute top-0 left-0 h-full bg-primary"
                    style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(255,200,50,0.7)" }}
                />
            </div>

            {/* ── Dot navigation ── */}
            <div className="absolute bottom-[9.5%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
                {VIDEOS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: i === current ? 20 : 6,
                            height: 6,
                            background: i === current ? "#F0C040" : "rgba(255,255,255,0.3)",
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* ── Left / Right arrows ── */}
            <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all"
                style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                aria-label="Previous"
            >
                <ChevronLeft className="w-5 h-5 text-white/80" />
            </button>

            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 hover:bg-black/60 transition-all"
                style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                aria-label="Next"
            >
                <ChevronRight className="w-5 h-5 text-white/80" />
            </button>

            {/* ── Play / Pause ── */}
            <button
                onClick={() => setPlaying((p) => !p)}
                className="absolute z-40 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 transition-all"
                style={{ bottom: "9%", right: "4.5%", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                aria-label={playing ? "Pause" : "Play"}
            >
                {playing
                    ? <Pause className="w-4 h-4 text-white/70" />
                    : <Play className="w-4 h-4 text-white/70" />
                }
            </button>

            {/* ── Mute / Unmute ── */}
            <button
                onClick={() => setMuted((m) => !m)}
                className="absolute z-40 w-9 h-9 flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 transition-all"
                style={{ bottom: "9%", right: "13.5%", clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
                aria-label={muted ? "Unmute" : "Mute"}
            >
                {muted
                    ? <VolumeX className="w-4 h-4 text-white/70" />
                    : <Volume2 className="w-4 h-4 text-white/70" />
                }
            </button>
        </div>
    );
}
