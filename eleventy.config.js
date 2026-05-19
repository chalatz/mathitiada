import yaml from "js-yaml";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownItAttrsOptions = {
  attrs: {
    target: "_blank",
    rel: "noopener noreferrer",
  },
};

const md = markdownIt(markdownItOptions).use(
  markdownItAttrs,
  markdownItAttrsOptions
);

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./assets/css/*.css");
  eleventyConfig.addPassthroughCopy("./assets/css/reveal/*.css");
  eleventyConfig.addPassthroughCopy("./assets/js/**/*.js");
  eleventyConfig.addPassthroughCopy("./assets/images/**/*");
  eleventyConfig.addPassthroughCopy("./assets/audio/**/*");
  eleventyConfig.addPassthroughCopy("./assets/fonts/**/*");
  eleventyConfig.addPassthroughCopy("./admin/assets/**/*.js");
  eleventyConfig.addPassthroughCopy("./admin/assets/**/*.css");
  eleventyConfig.addPassthroughCopy("./*.png");
  eleventyConfig.addPassthroughCopy("./favicon.ico");
  eleventyConfig.addPassthroughCopy(".site.webmanifest");

  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("markdownify", (str) => md.render(str));

  eleventyConfig.addFilter("randomLevelItems", function (
    items,
    level = 1,
    limit = 15
  ) {
    if (!Array.isArray(items)) {
      return [];
    }

    const matchingItems = items.filter(
      (item) => Number(item.level) === Number(level)
    );

    return shuffle(matchingItems).slice(0, limit);
  });

  eleventyConfig.addFilter("pluck", function (arr, attr, value) {
    return arr.filter((item) => item[attr] === value);
  });

  // Shuffle / randomize array 
  eleventyConfig.addFilter("randomize", function(array) {
      // Create a copy of the array to avoid modifying the original
      let shuffledArray = array.slice();

      // Fisher-Yates shuffle algorithm
      for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
  });

  // Slice array with start and end parameters
  eleventyConfig.addFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });

  // Merge/concat two arrays into one
  eleventyConfig.addFilter("concat", function(array1, array2) {
    return array1.concat(array2);
  });

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
}