/* ==========================================================================
   VIDEO LIST — edit this file to add your work.

   Each entry:
     title     : shown on the card and in the player
     category  : any text, e.g. "Ads" | "VSL" | "Motion & VFX". Filter chips are built
                 automatically and are hidden when there is only one category.
     platform  : "mp4" (self-hosted file) | "youtube" | "vimeo"
     src       : (mp4 only) path to the file, e.g. "assets/videos/ad-05.mp4"
     id        : (youtube / vimeo) the video ID
     thumb     : thumbnail / poster image path or URL, e.g. "assets/thumbs/ad-05.jpg".
                 Required for mp4. Optional for YouTube (fetched automatically).
     vertical  : OPTIONAL. true for 9:16 videos.
     note      : OPTIONAL. Short description under the title.
     sensitive : OPTIONAL. true = thumbnail is blurred with a "Click to reveal" overlay until the
                 visitor clicks once (the next click opens the player). Omit for normal videos.

   MP4 files load only when the visitor clicks a card (preload="none").
   See README.md for the ffmpeg command used to prepare web-friendly files.
   ========================================================================== */
window.VIDEOS = [
  { title: "Nutra ED", category: "Ads", platform: "mp4", src: "assets/videos/ad-02.mp4", thumb: "assets/thumbs/ad-02.jpg", vertical: true },
  { title: "Nutra ED", category: "Ads", platform: "mp4", src: "assets/videos/ad-01.mp4", thumb: "assets/thumbs/ad-01.jpg", vertical: true },
  { title: "Nutra Wellness", category: "Ads", platform: "mp4", src: "assets/videos/ad-03.mp4", thumb: "assets/thumbs/ad-03.jpg", vertical: true },
  { title: "Nutra Wellness", category: "Ads", platform: "mp4", src: "assets/videos/ad-04.mp4", thumb: "assets/thumbs/ad-04.jpg", vertical: true }
];
