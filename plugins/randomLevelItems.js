// plugins/randomLevelItems.js

module.exports = function randomLevelItemsPlugin(eleventyConfig) {
  eleventyConfig.addFilter("randomLevelItems", function (items, level = 1, limit = 15) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items
      .filter((item) => Number(item.level) === Number(level))
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  });
};