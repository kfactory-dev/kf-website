const config = {
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
  ],
}

/*
 * Build the website with `GATSBY_IPFS=true gatsby build --prefix-paths` to enable IPFS support.
 *
 * Deploying the website to IPFS gateway requires pages to be accessible with `/ipfs/<CID>/` prefix, which
 * is accomplished by setting `matchPage` properties for every page, but this breaks client scripts when the
 * site is served from the domain root, which is why environment variable is used to enable IPFS support
 * */
if (process.env.GATSBY_IPFS) {
  Object.assign(config, {
    plugins: [...config.plugins, 'gatsby-plugin-relative-paths'],
    assetPrefix: '__GATSBY_RELATIVE_PATH__',
  })
}

module.exports = config
