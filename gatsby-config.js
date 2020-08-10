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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-171784901-1",
      },
    },
    `gatsby-plugin-postcss`
  ],
};
