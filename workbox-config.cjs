module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{jpeg,ttf,png,json,js}"],
  swDest: "public/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};