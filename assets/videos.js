/* ==========================================================================
   VIDEO LIST — edit this file to add your work.

   Each entry:
     title     : shown on the card and in the player
     category  : "VSL" | "Ad Creative" | "Motion & VFX"  (any text works; filters are built automatically)
     platform  : "youtube" or "vimeo"
     id        : the video ID (YouTube: the part after v=  | Vimeo: the number in the URL)
     thumb     : OPTIONAL. Path or URL to a thumbnail, e.g. "assets/thumbs/my-vsl.jpg".
                 YouTube thumbnails are fetched automatically if omitted.
                 Vimeo has no automatic thumbnail, so add one yourself (otherwise a styled card is shown).
     vertical  : OPTIONAL. true for 9:16 videos.
     note      : OPTIONAL. Short description under the title.

   Entries whose id starts with "YOUR_" are PLACEHOLDERS: they show a
   "Placeholder" badge and do not load a player. Replace them with real IDs.
   ========================================================================== */
window.VIDEOS = [
  { title: "VSL Example 01 — replace me",      category: "VSL",          platform: "youtube", id: "YOUR_YOUTUBE_ID_1", thumb: "", note: "Short description of the project (niche, what you did)." },
  { title: "VSL Example 02 — replace me",      category: "VSL",          platform: "youtube", id: "YOUR_YOUTUBE_ID_2", thumb: "", note: "Short description of the project." },
  { title: "Ad Creative 01 — replace me",      category: "Ad Creative",  platform: "youtube", id: "YOUR_YOUTUBE_ID_3", thumb: "", vertical: true, note: "Vertical ad example." },
  { title: "Ad Creative 02 — replace me",      category: "Ad Creative",  platform: "vimeo",   id: "YOUR_VIMEO_ID_1",   thumb: "", note: "Vimeo example (add a thumb path)." },
  { title: "Motion & VFX Showcase — replace me", category: "Motion & VFX", platform: "youtube", id: "YOUR_YOUTUBE_ID_4", thumb: "", note: "Motion graphics / VFX breakdown." },
  { title: "Ad Creative 03 — replace me",      category: "Ad Creative",  platform: "youtube", id: "YOUR_YOUTUBE_ID_5", thumb: "", vertical: true, note: "Another vertical ad." }
];
