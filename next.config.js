const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");

module.exports = withPlugins(
  [
    [
      sass,
      {
        cssLoaderOptions: {
          localIdentName: "[local]___[hash:base64:5]"
        }
      }
    ],
    images
  ],
  {
    target: "serverless"
  }
);
