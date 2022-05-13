module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/src/images/home_bg_image.jpg')",
      },
      boxShadow: {
        "3xl": "2px 10px 3px 4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
