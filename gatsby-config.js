module.exports = {
  siteMetadata: {
    title: `Donald's Thought Place 💡`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-andy`,
      options: {
        hideDoubleBrackets: true,
      },
    },
    `gatsby-plugin-postcss`
  ],
};
