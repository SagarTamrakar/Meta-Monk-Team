/**
 * Video paths organized by category from attached_assets folder
 * Used by VideoSlider component
 */

export const VIDEO_CATEGORIES = {
  MOTION_GRAPHICS: "Motion Graphics",
  "3D_ANIMATION": "3D Animation",
  CGI_VFX: "CGI & VFX",
  VIDEO_EDITING: "Video Editing",
} as const;

export const VIDEO_PATHS = {
  motionGraphics: [
    {
      video: "/attached_assets/Motion graphics/Copy of 0.mp4",
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Abstract Motion",
      desc: "Dynamic motion graphics sequence",
      index: "01",
    },
    {
      video: "/attached_assets/Motion graphics/Copy of 1.mp4",
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Fluid Design",
      desc: "Smooth flowing animation",
      index: "02",
    },
    {
      video: "/attached_assets/Motion graphics/Copy of 2.mp4",
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Visual Effects",
      desc: "Creative motion composition",
      index: "03",
    },
    {
      video: "/attached_assets/Motion graphics/Copy of 3.mp4",
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Transition Art",
      desc: "Seamless motion transitions",
      index: "04",
    },
    {
      video: "/attached_assets/Motion graphics/Copy of 4.mp4",
      category: VIDEO_CATEGORIES.MOTION_GRAPHICS,
      title: "Kinetic Energy",
      desc: "High-impact animation",
      index: "05",
    },
  ],
  threeDAnimation: [
    {
      video: "/attached_assets/3d Animation/Gaming 1.mp4",
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "Gaming Experience 1",
      desc: "Immersive 3D gameplay",
      index: "06",
    },
    {
      video: "/attached_assets/3d Animation/Gaming 2.mp4",
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "Gaming Experience 2",
      desc: "Advanced 3D rendering",
      index: "07",
    },
    {
      video: "/attached_assets/3d Animation/Top 2.mp4",
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "3D Showcase 2",
      desc: "Professional 3D art",
      index: "09",
    },
    {
      video: "/attached_assets/3d Animation/Top 3.mp4",
      category: VIDEO_CATEGORIES["3D_ANIMATION"],
      title: "3D Showcase 3",
      desc: "Studio quality animation",
      index: "10",
    },
  ],
  cgiVfx: [
    {
      video: "/attached_assets/CGI AND VFX/Copy of Japanese Village.mp4",
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Japanese Village",
      desc: "Cultural landscape rendering",
      index: "12",
    },
    {
      video: "/attached_assets/CGI AND VFX/Copy of  Desert Trailor.mp4",
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Desert Trailer",
      desc: "Desert landscape cinematics",
      index: "13",
    },
    {
      video: "/attached_assets/CGI AND VFX/Copy of 1 Desert Trailor night.mp4",
      category: VIDEO_CATEGORIES.CGI_VFX,
      title: "Desert Night Scene",
      desc: "Night-time desert effects",
      index: "14",
    },
  ],
  videoEditing: [
    {
      video: "/attached_assets/Video editing/Copy of Copy of 63b5c9fa-afb7-46b1-ad79-fb1721298252.mp4",
      category: VIDEO_CATEGORIES.VIDEO_EDITING,
      title: "Professional Edit",
      desc: "Professional video editing",
      index: "15",
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
