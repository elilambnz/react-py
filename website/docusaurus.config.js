// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { WorkerPlugin, ExternalsPlugin } = require('webpack')
const { PyodidePlugin } = require('@pyodide/webpack-plugin')

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
      // @ts-ignore
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      // @ts-ignore
      ({
        hashed: true
      })
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
    async function pyodide() {
      return {
        name: 'pyodide',
        configureWebpack() {
          return {
            plugins: [new PyodidePlugin()],
            resolve: {
              fallback: {
                url: require.resolve('url/')
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
    },
    async function disableUsedExports() {
      return {
        name: 'disable-used-exports',
        configureWebpack() {
          return {
            optimization: {
              usedExports: false
            }
          }
        }
      }
    },
    async function copyPyodide() {
      return {
        name: 'copy-pyodide',
        configureWebpack(config) {
          return {
            // externals: {
            //   pyodide: path.resolve(
            //     __dirname,
            //     '"node_modules/react_py/node_modules/pyodide"'
            //   )
            // },
            // plugins: [
            //   new CopyPlugin({
            //     patterns: [
            //       {
            //         // context: 'node_modules/pyodide/',
            //         context: 'node_modules/react-py/node_modules/pyodide',
            //         from: '**/*',
            //         to: 'assets/js/'
            //       }
            //     ]
            //   }),
            //   new WorkerPlugin({
            //     plugins: [new ExternalsPlugin(`commonjs`, config.externals)]
            //   })
            // ]
          }
        }
      }
    },
    // Fixes the issue where React is loaded twice. Only required for local development.
    async function resolveReact() {
      return {
        name: 'resolve-react',
        configureWebpack() {
          return {
            resolve: {
              alias: {
                react: path.resolve('./node_modules/react'),
                pyodide: path.resolve('./node_modules/pyodide')
              }
            }
          }
        }
      }
    }
  ],

  scripts: [
    {
      src: 'https://plausible.pixellab.nz/js/plausible.js',
      defer: true,
      'data-domain': 'elilambnz.github.io/react-py'
    }
  ]
}

module.exports = config
