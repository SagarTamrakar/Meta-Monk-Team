/**
 * Image paths for the ImageGrid component
 * Organized as a 2x2 grid display
 */

import work1 from "@assets/work_1.png";
import work2 from "@assets/work_2.png";
import work3 from "@assets/work_3.png";
import work4 from "@assets/work_4.png";
import work5 from "@assets/work_5.png";
import work6 from "@assets/work_6.png";
import work7 from "@assets/work_7.png";
import work8 from "@assets/work_8.png";

export interface ImageItem {
    img: string;
    category: string;
    title: string;
    desc: string;
    index: string;
}

export const IMAGE_GRID_ITEMS: ImageItem[] = [
    {
        img: work1,
        category: "CGI & VFX",
        title: "Visual Effects Mastery",
        desc: "Stunning cinematic CGI and professional visual effects",
        index: "01",
    },
    {
        img: work2,
        category: "Motion Graphics",
        title: "Dynamic Motion Design",
        desc: "Engaging motion graphics with flowing animations",
        index: "02",
    },
    {
        img: work3,
        category: "Video Editing",
        title: "Professional Production",
        desc: "High-quality video editing and post-production",
        index: "03",
    },
    {
        img: work4,
        category: "3D Animation",
        title: "3D Animation Excellence",
        desc: "Advanced 3D modeling and photorealistic animation",
        index: "04",
    },
    // {
    //     img: work5,
    //     category: "Brand Design",
    //     title: "Visual Identity",
    //     desc: "Dynamic brand presentation",
    //     index: "05",
    // },
    // {
    //     img: work6,
    //     category: "Photography",
    //     title: "Visual Moments",
    //     desc: "Captured excellence",
    //     index: "06",
    // },
    // {
    //     img: work7,
    //     category: "3D Design",
    //     title: "Three Dimensional Art",
    //     desc: "Professional 3D rendering",
    //     index: "07",
    // },
    // {
    //     img: work8,
    //     category: "Creative Production",
    //     title: "Complete Solution",
    //     desc: "End-to-end creative services",
    //     index: "08",
    // },
];
export const CATEGORIES = ["3D Animation", "Motion Graphics", "CGI & VFX", "Video Editing"] as const;
