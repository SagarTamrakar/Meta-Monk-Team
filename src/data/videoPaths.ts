/**
 * Video paths organized by category from attached_assets folder
 * Used by VideoSlider component
 */
import TA_1 from "@assets/3D ANIMATION/Gaming 1.mp4";
import TA_2 from "@assets/3D ANIMATION/Gaming 2.mp4";
import TA_3 from "@assets/3D ANIMATION/Top 1.mp4";
import TA_4 from "@assets/3D ANIMATION/Top 2.mp4";
import TA_5 from "@assets/3D ANIMATION/Top 3.mp4";
import MG_1 from "@assets/MOTION GRAPHICS/0.mp4";
import MG_2 from "@assets/MOTION GRAPHICS/1.mp4";
import MG_3 from "@assets/MOTION GRAPHICS/2.mp4";
import MG_4 from "@assets/MOTION GRAPHICS/3.mp4";
import MG_5 from "@assets/MOTION GRAPHICS/4.mp4";
import MG_6 from "@assets/MOTION GRAPHICS/5.mp4";
import MG_7 from "@assets/MOTION GRAPHICS/6.mp4";
import MG_8 from "@assets/MOTION GRAPHICS/7.mp4";
import MG_9 from "@assets/MOTION GRAPHICS/8.mp4";
import MG_10 from "@assets/MOTION GRAPHICS/9.mp4";
import MG_11 from "@assets/MOTION GRAPHICS/10.mp4";
import MG_12 from "@assets/MOTION GRAPHICS/11.mp4";
import MG_13 from "@assets/MOTION GRAPHICS/12.mp4";
import MG_14 from "@assets/MOTION GRAPHICS/13.mp4";
import MG_15 from "@assets/MOTION GRAPHICS/14.mp4";
import VE_1 from "@assets/VIDEO EDITING/0.mp4";
import VE_2 from "@assets/VIDEO EDITING/10.mp4";
import VE_3 from "@assets/VIDEO EDITING/11.mp4";
import VE_4 from "@assets/VIDEO EDITING/Copy Of Cafe Comercial.mp4";
import VE_5 from "@assets/VIDEO EDITING/Copy Of Comercail Add.mp4";
import VE_6 from "@assets/VIDEO EDITING/Copy Of Comercial Add.mp4";
import VE_7 from "@assets/VIDEO EDITING/Copy Of Comercial Shoes.mp4";
import VE_8 from "@assets/VIDEO EDITING/Copy Of Img 1954.mp4";
import VE_9 from "@assets/VIDEO EDITING/Copy Of Img 5113.mp4";
import VE_10 from "@assets/VIDEO EDITING/Copy Of Prewed Teaser.mp4";
import VFX_1 from "@assets/CGI AND VFX/1st VFX CHALANGE OUTPUT.mp4";
import VFX_2 from "@assets/CGI AND VFX/2nd Desert Trailor Night.mp4";
import VFX_3 from "@assets/CGI AND VFX/3rd Jungle.mp4";
import VFX_4 from "@assets/CGI AND VFX/4th Japanese Village.mp4";
import VFX_5 from "@assets/CGI AND VFX/5th Desert Trailor.mp4";


export const VIDEO_CATEGORIES = {
  MOTION_GRAPHICS: "Motion Graphics",
  "3D_ANIMATION": "3D Animation",
  CGI_VFX: "CGI & VFX",
  VIDEO_EDITING: "Video Editing",
} as const;

export const VIDEO_PATHS = {
  motionGraphics: [
    {
      video: MG_1,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 1",
      desc: "Dynamic motion graphics sequence",
      index: "01",
    },
    {
      video: MG_2,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 2",
      desc: "Smooth flowing animation",
      index: "02",
    },
    {
      video: MG_3,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 3",
      desc: "Creative motion composition",
      index: "03",
    },
    {
      video: MG_4,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 4",
      desc: "Seamless motion transitions",
      index: "04",
    },
    {
      video: MG_5,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 5",
      desc: "High-impact animation",
      index: "05",
    },
    {
      video: MG_6,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 6",
      desc: "Abstract animation",
      index: "06",
    },
    {
      video: MG_7,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 7",
      desc: "Kinetic design",
      index: "07",
    },
    {
      video: MG_8,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 8",
      desc: "Motion design sequence",
      index: "08",
    },
    {
      video: MG_9,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 9",
      desc: "Advanced motion effects",
      index: "09",
    },
    {
      video: MG_10,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 10",
      desc: "Premium animation",
      index: "10",
    },
    {
      video: MG_11,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 11",
      desc: "Motion composition",
      index: "11",
    },
    {
      video: MG_12,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 12",
      desc: "Design animation",
      index: "12",
    },
    {
      video: MG_13,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 13",
      desc: "Visual effects sequence",
      index: "13",
    },
    {
      video: MG_14,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 14",
      desc: "Motion art",
      index: "14",
    },
    {
      video: MG_15,
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Motion Graphics 15",
      desc: "Final motion sequence",
      index: "15",
    },
  ],
  threeDAnimation: [
    {
      video: TA_1,
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "Gaming Experience 1",
      desc: "Immersive 3D gameplay",
      index: "01",
    },
    {
      video: TA_2,
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "Gaming Experience 2",
      desc: "Advanced 3D rendering",
      index: "02",
    },
    {
      video: TA_3,
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "3D Showcase 1",
      desc: "Professional 3D model",
      index: "03",
    },
    {
      video: TA_4,
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "3D Showcase 2",
      desc: "Professional 3D art",
      index: "04",
    },
    {
      video: TA_5,
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "3D Showcase 3",
      desc: "Studio quality animation",
      index: "05",
    },
  ],
  cgiVfx: [
    {
      video: VFX_1,
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "VFX Challenge Output",
      desc: "Advanced VFX composition",
      index: "01",
    },
    {
      video: VFX_2,
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Desert Trailer Night",
      desc: "Night-time desert effects",
      index: "02",
    },
    {
      video: VFX_3,
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Jungle Landscape",
      desc: "Jungle environment rendering",
      index: "03",
    },
    {
      video: VFX_4,
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Japanese Village",
      desc: "Cultural landscape rendering",
      index: "04",
    },
    {
      video: VFX_5,
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Desert Trailer",
      desc: "Desert landscape cinematics",
      index: "05",
    },
  ],
  videoEditing: [
    {
      video: VE_1,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Video Edit 1",
      desc: "Professional video editing",
      index: "01",
    },
    {
      video: VE_2,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Video Edit 2",
      desc: "Edited video sequence",
      index: "02",
    },
    {
      video: VE_3,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Video Edit 3",
      desc: "Professional edit",
      index: "03",
    },
    {
      video: VE_4,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Cafe Commercial",
      desc: "Commercial video editing",
      index: "04",
    },
    {
      video: VE_5,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Commercial Ad",
      desc: "Professional advertisement",
      index: "05",
    },
    {
      video: VE_6,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Commercial Add",
      desc: "Commercial editing",
      index: "06",
    },
    {
      video: VE_7,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Shoes Commercial",
      desc: "Product commercial video",
      index: "07",
    },
    {
      video: VE_8,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Image Edit 1954",
      desc: "Photo editing video",
      index: "08",
    },
    {
      video: VE_9,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Image Edit 5113",
      desc: "Photo video editing",
      index: "09",
    },
    {
      video: VE_10,
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Prewed Teaser",
      desc: "Professional wedding video teaser",
      index: "10",
    },
  ],
};

/**
 * Flattened array of all videos for easier iteration
 */
export const ALL_VIDEOS = [
  ...VIDEO_PATHS.motionGraphics,
  ...VIDEO_PATHS.threeDAnimation,
  ...VIDEO_PATHS.cgiVfx,
  ...VIDEO_PATHS.videoEditing,
];

/**
 * Get all videos from a specific category
 */
export const getVideosByCategory = (
  category: string
) => {
  return ALL_VIDEOS.filter((video) => video.category === category);
};
