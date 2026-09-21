tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#d3590b",
          dark: "#b0480a",
          100: "#ffe8d9",
        },
        ink: "#1f1f1f",
        todo: { bg: "#ffe0e0", text: "#ef4444" },
        progress: { bg: "#fff0d7", text: "#e8a636" },
        done: { bg: "#f1fff7", text: "#28ae73" },
      },
      fontFamily: {
        heading: ['"Manrope"', "Arial", "sans-serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};
