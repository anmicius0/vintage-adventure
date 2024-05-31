module.exports = {
  globDirectory: "public/",
  globPatterns: ["**/*.{jpeg,ttf,png,json,js}"],
  swDest: "public/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  maximumFileSizeToCacheInBytes: 20 * 1024 * 1024, // 10MB

};