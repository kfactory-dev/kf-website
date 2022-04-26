module.exports = {
  siteMetadata: {
    siteUrl: `https://kf-web.netlify.app`,
    title: `k/factory`,
    titleTemplate: `%s - k/factory`,
    description:
      'k/factory is a software studio building open source software powering the financial system of tomorrow',
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-ts`,
    `gatsby-plugin-postcss`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-relative-paths',
  ],
  assetPrefix: '__GATSBY_RELATIVE_PATH__',
}
