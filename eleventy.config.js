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

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
}