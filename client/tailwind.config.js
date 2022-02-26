module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/images/bg-book4.jpg')",
        "tab-my": "url('/images/tab_my.jpg')",
        "tab-family": "url('/images/tab_family.jpg')",
        "tab-child": "url('/images/tab_child.jpg')",
        "tab-pet": "url('/images/tab_pet.jpg')",
        "tab-friend": "url('/images/tab_friend.jpg')",
        "tab-lover": "url('/images/tab_lover.jpg')",
        "tab-travel": "url('/images/tab_travel.jpg')",
      },
    },
  },
  plugins: [],
};
