/* ==========================================================================
   VIDEO LIST — edit this file to add your work.

   Each entry:
     title     : shown on the card and in the player
     category  : any text, e.g. "Ads" | "VSL" | "Motion & VFX". Filter chips are built
                 automatically and are hidden when there is only one category.
     platform  : "mp4" (self-hosted file) | "youtube" | "vimeo" | "drive" (Google Drive)
     src       : (mp4 only) path to the file, e.g. "assets/videos/ad-05.mp4"
     id        : (youtube / vimeo / drive) the video ID (Drive: the file ID from the share link)
     thumb     : thumbnail / poster image path or URL, e.g. "assets/thumbs/ad-05.jpg".
                 Required for mp4. Optional for YouTube and Drive (fetched automatically).
     vertical  : OPTIONAL. true for 9:16 videos.
     note      : OPTIONAL. Short description under the title.
     sensitive : OPTIONAL. true = thumbnail is blurred with a "Click to reveal" overlay until the
                 visitor clicks once (the next click opens the player). Omit for normal videos.

   Drive files must be shared as "Anyone with the link: Viewer". See README.md ("Google Drive videos").

   MP4 files load only when the visitor clicks a card (preload="none").
   See README.md for the ffmpeg command used to prepare web-friendly files.
   ========================================================================== */
window.VIDEOS = [
  { title: "Nutra ED", category: "Ads", platform: "mp4", src: "assets/videos/ad-02.mp4", thumb: "assets/thumbs/ad-02.jpg", vertical: true, sensitive: true },
  { title: "Nutra ED", category: "Ads", platform: "mp4", src: "assets/videos/ad-01.mp4", thumb: "assets/thumbs/ad-01.jpg", vertical: true, sensitive: true },
  { title: "Nutra Wellness", category: "Ads", platform: "mp4", src: "assets/videos/ad-03.mp4", thumb: "assets/thumbs/ad-03.jpg", vertical: true },
  { title: "Nutra Wellness", category: "Ads", platform: "mp4", src: "assets/videos/ad-04.mp4", thumb: "assets/thumbs/ad-04.jpg", vertical: true },
  { title: "Infoproduct PP", category: "Ads", platform: "mp4", src: "assets/videos/infoproduct-pp.mp4", thumb: "assets/thumbs/infoproduct-pp.jpg", vertical: true },
  { title: "VSL", category: "VSL", platform: "drive", id: "1-sGTVCIxj-Bo5BWzD1IolUj4SvXzqqiY" },
  { title: "VSL", category: "VSL", platform: "drive", id: "19Iqf_ydAWehvzQXjO2T-3xe9EczUBP-r" },
  { title: "VSL ED", category: "VSL", platform: "drive", id: "1aj0h1UzOvMMRL2DdEcenG7Es44K6y2sM", sensitive: true },
  { title: "VSL", category: "VSL", platform: "drive", id: "1yllaS9DDxBIqWgwlKUHEMPe0dgQv-VSM" }
];
