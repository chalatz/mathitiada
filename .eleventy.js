const yaml = require("js-yaml");

let markdownIt = require("markdown-it");
let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
};

let mila = require("markdown-it-attrs");
let milaOptions = {
  attrs: {
    target: "_blank",
    rel: "noopener noreferrer"
  }
};

let md = markdownIt(markdownItOptions).use(mila);

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./assets/css/*.css');
    eleventyConfig.addPassthroughCopy('./assets/js/**/*.js');
    eleventyConfig.addPassthroughCopy('./assets/images/**/*');
    eleventyConfig.addPassthroughCopy('./assets/fonts/**/*');
    eleventyConfig.addPassthroughCopy('./admin/assets/**/*.js');
    eleventyConfig.addPassthroughCopy('./admin/assets/**/*.css');
    eleventyConfig.addPassthroughCopy('./*.png');
    eleventyConfig.addPassthroughCopy('./favicon.ico');
    eleventyConfig.addPassthroughCopy('.site.webmanifest');
    
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

    eleventyConfig.setLibrary('md', md);

    eleventyConfig.addFilter('markdownify', str => md.render(str));

    return {
        dir: {
            "data": "_data",
            includes: "_includes",
            layouts: "_layouts"
        }
    };

};