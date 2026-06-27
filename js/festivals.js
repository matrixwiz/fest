/**
 * Festival Configuration
 * Add new festivals here — no other file needs to change.
 */
const FESTIVALS = {
  diwali: {
    name: "Diwali",
    emoji: "🪔",
    tagline: "Festival of Lights",
    theme: "theme-diwali",
    colors: { primary: "#f7931e", secondary: "#ffd700", accent: "#ff6b35", bg: "#1a0a00" },
    quote: "May the divine light of Diwali illuminate your life with happiness and prosperity.",
    confettiColors: ["#ffd700", "#ff6b35", "#f7931e", "#fff", "#ff4500"],
    particles: "🪔",
    wishes: [
      "May your home shine bright with the light of Diwali! 🪔",
      "Wishing you a Diwali filled with sweet moments and joyful memories.",
      "May this Diwali bring new beginnings and success in everything you do."
    ]
  },
  holi: {
    name: "Holi",
    emoji: "🎨",
    tagline: "Festival of Colors",
    theme: "theme-holi",
    colors: { primary: "#e91e63", secondary: "#ff9800", accent: "#9c27b0", bg: "#1a0033" },
    quote: "May the colors of Holi fill your life with happiness, health, and prosperity!",
    confettiColors: ["#e91e63", "#ff9800", "#9c27b0", "#4caf50", "#2196f3", "#ffeb3b"],
    particles: "🎨",
    wishes: [
      "May your life be as colorful as Holi! 🎨",
      "Wishing you a Holi filled with vibrant colors and sweet moments.",
      "May this Holi wash away all sorrows and paint your life with joy!"
    ]
  },
  eid: {
    name: "Eid",
    emoji: "🌙",
    tagline: "Festival of Joy & Blessings",
    theme: "theme-eid",
    colors: { primary: "#1b5e20", secondary: "#ffd700", accent: "#4caf50", bg: "#001a00" },
    quote: "Eid Mubarak! May Allah's blessings fill your life with happiness and peace.",
    confettiColors: ["#ffd700", "#4caf50", "#fff", "#1b5e20", "#ffeb3b"],
    particles: "🌙",
    wishes: [
      "Eid Mubarak! May this special day bring joy and peace to you and your family. 🌙",
      "Wishing you a blessed Eid filled with love and happiness.",
      "May Allah's blessings be with you and your family on this joyous occasion."
    ]
  },
  christmas: {
    name: "Christmas",
    emoji: "🎄",
    tagline: "Season of Joy & Giving",
    theme: "theme-christmas",
    colors: { primary: "#c62828", secondary: "#ffd700", accent: "#2e7d32", bg: "#0a1f0a" },
    quote: "May the magic of Christmas fill your heart with warmth, joy, and love.",
    confettiColors: ["#c62828", "#ffd700", "#2e7d32", "#fff", "#ff1744"],
    particles: "❄️",
    wishes: [
      "Wishing you a Merry Christmas filled with love, laughter, and cheer! 🎄",
      "May Santa bring you all the gifts your heart desires this holiday season.",
      "May your Christmas sparkle with moments of love and the gift of family."
    ]
  },
  newyear: {
    name: "New Year",
    emoji: "🎆",
    tagline: "A Fresh Start Awaits",
    theme: "theme-newyear",
    colors: { primary: "#7c4dff", secondary: "#ffd700", accent: "#00e5ff", bg: "#0a0025" },
    quote: "May the New Year bring you countless reasons to smile and celebrate!",
    confettiColors: ["#7c4dff", "#ffd700", "#00e5ff", "#fff", "#ff4081"],
    particles: "🎆",
    wishes: [
      "Happy New Year! May this year bring you joy, success, and prosperity! 🎆",
      "Wishing you a spectacular New Year filled with new adventures and happiness.",
      "May the New Year open doors to new opportunities and beautiful moments!"
    ]
  },
  independence: {
    name: "Independence Day",
    emoji: "🇮🇳",
    tagline: "Celebrating Freedom & Pride",
    theme: "theme-independence",
    colors: { primary: "#ff9800", secondary: "#fff", accent: "#1a7a00", bg: "#001a33" },
    quote: "Jai Hind! Let us celebrate the spirit of freedom and unity that defines our great nation.",
    confettiColors: ["#ff9800", "#fff", "#1a7a00", "#0033cc", "#ff6f00"],
    particles: "🇮🇳",
    wishes: [
      "Happy Independence Day! Proud to be Indian! 🇮🇳",
      "Jai Hind! Wishing you a proud and patriotic Independence Day.",
      "Let us salute our heroes and celebrate the freedom they gave us!"
    ]
  }
};

// Expose globally
window.FESTIVALS = FESTIVALS;
