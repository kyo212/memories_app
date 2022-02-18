module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/images/bg-book4.jpg')",
        "tab-image-fam": "url('/images/tabImage_fam.jpg')",
      },
    },
  },
  plugins: [],
};
