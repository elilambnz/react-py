// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path')

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'react-py',
  tagline: 'Effortlessly run Python code in your React apps.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/react-py/',
  // onBrokenLinks: "throw",
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'elilambnz', // Usually your GitHub org/user name.
  projectName: 'react-py', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      { hashed: true }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'react-py',
        logo: {
          alt: 'react-py Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction/getting-started',
            position: 'left',
            label: 'Docs'
          },
          {
            to: '/playground',
            position: 'left',
            label: 'Playground'
          },
          {
            href: 'https://github.com/elilambnz/react-py',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),

  plugins: [
    async function reactPyWebpackFix() {
      return {
        name: 'react-py-webpack-fix',
        configureWebpack(_config, isServer) {
          if (isServer) return {}

          return {
            // Inject fallback __webpack_require__ object to prevent web worker errors
            plugins: [
              new (require('webpack').BannerPlugin)({
                banner: `
if (typeof __webpack_require__ === 'undefined') {
  var __webpack_require__ = {};
}
`,
                raw: true,
                test: /\.js$/
              })
            ]
          }
        }
      }
    },
    async function resolveReact() {
      return {
        name: 'resolve-react',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                react: path.resolve('./node_modules/react')
              }
            }
          }
        }
      }
    },
    async function tailwind() {
      return {
        name: 'tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        }
      }
    }
  ]
}

module.exports = config
