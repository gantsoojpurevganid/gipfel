/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1b265e",
        content: "#F5F5F5",
        new_product: "#FCD082",
        textLgColor: "#4B5563",
        newProductTextColor: "#F9FAFB",
        newProductPaddingColor: "#22C55E",
        saleProductBgColor: "#F59E0B",
        categoryTextColor: "#1F2937",
        brandPrimary: "#201E5B",
        paymentText: "#374151",
        paymentCartText: "#4B5563",
        cartSubText: "#6B7280",
        buttonBgColor: "#E5E7EB",
        footerTextColor: "#111827",
      },
    },
  },
  plugins: [],
};
