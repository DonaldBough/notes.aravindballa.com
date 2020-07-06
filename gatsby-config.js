module.exports = {
  siteMetadata: {
    title: `Donald's Working Notes 💡`,
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
