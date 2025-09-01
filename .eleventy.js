module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  // eleventyConfig.addPassthroughCopy("src/_redirects");

  // Dynamically generate _redirects file based on SITE_KEY
  eleventyConfig.on('beforeBuild', () => {
    const fs = require('fs');
    const path = require('path');
    const siteKey = process.env.SITE_KEY || 'cabm.c'; // Default to cabm.c if not set
    console.log(siteKey)
    const redirectsPath = path.join(__dirname, 'src', '_data', 'redirects', `${siteKey}.json`);
    let rules = [];
    if (fs.existsSync(redirectsPath)) {
      rules = JSON.parse(fs.readFileSync(redirectsPath, 'utf-8'));
    } else {
      console.warn(`Redirects file not found for siteKey: ${siteKey}`);
    }
    // Convert rules to Netlify _redirects format
    const redirectsContent = rules.map(r => `${r.from} https://crossingallborders.org${r.to} ${r.status}`).join('\n');
    const siteDir = path.join(__dirname, '_site');
    if (!fs.existsSync(siteDir)) {
      fs.mkdirSync(siteDir, { recursive: true });
    }
    fs.writeFileSync(path.join(siteDir, '_redirects'), redirectsContent);
  });

  
  eleventyConfig.addCollection("all", function(collection) {
    return collection.getAll();
  });


  return {
    dir: {
      input: "src",  
      output: "_site", 
      includes: "_includes",
      data: "_data" 
    }
  };
};