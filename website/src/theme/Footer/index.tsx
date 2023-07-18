import React, { useEffect, useState } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { useColorMode } from '@docusaurus/theme-common'

const navigation = {
  docs: [
    {
      name: 'Getting Started',
      href: '/react-py/docs/introduction/getting-started'
    },
    { name: 'Usage', href: '/react-py/docs/introduction/usage' },
    { name: 'API Reference', href: '/react-py/docs/introduction/api-reference' }
  ],
  links: [
    { name: 'NPM', href: 'https://www.npmjs.com/package/react-py' },
    { name: 'GitHub', href: 'https://github.com/elilambnz/react-py' },
    {
      name: 'License',
      href: 'https://github.com/elilambnz/react-py/blob/main/LICENSE.md'
    },
    {
      name: 'Contributing',
      href: 'https://github.com/elilambnz/react-py/blob/main/CONTRIBUTING.md'
    }
  ],
  tryExamples: [
    { name: 'Basic Example', href: '/react-py/docs/examples/basic-example' },
    { name: 'REPL', href: '/react-py/docs/examples/repl' }
  ],
  seeAlso: [
    {
      name: 'PyRepl.io - Python Editor',
      href: 'https://pyrepl.io'
    },
    {
      name: 'Pixel Lab - Portfolio',
      href: 'https://pixellab.nz'
    }
  ]
}

export default function Example() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { siteConfig } = useDocusaurusContext()
  const { colorMode } = useColorMode()

  useEffect(() => {
    setIsDarkMode(colorMode === 'dark')
  }, [colorMode])

  return (
    <footer
      className="bg-neutral-50 dark:bg-neutral-900 dark:text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="mx-auto h-6 w-auto"
              src={
                isDarkMode
                  ? require('@site/static/img/logo-dark.png').default
                  : require('@site/static/img/logo-light.png').default
              }
              alt={siteConfig.title}
            />
            <p className="leading-6 text-gray-600 dark:text-gray-400">
              {siteConfig.tagline}
            </p>
            <div className="flex space-x-2">
              <a
                href="https://github.com/elilambnz/react-py"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-700 hover:no-underline dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <svg
                  className="mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Star us on GitHub</span>
              </a>
              <a
                href="https://github.com/sponsors/elilambnz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-700 hover:no-underline dark:bg-gray-100 dark:hover:bg-gray-200"
              >
                <svg
                  className="mr-2 h-6 w-6 stroke-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="font-semibold">Sponsor</span>
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Docs
                </h3>
                <ul role="list" className="mt-6 list-none space-y-4 pl-0">
                  {navigation.docs.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm font-medium leading-6 text-gray-600 hover:text-gray-900 hover:no-underline dark:text-gray-500 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Links
                </h3>
                <ul role="list" className="mt-6 list-none space-y-4 pl-0">
                  {navigation.links.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium leading-6 text-gray-600 hover:text-gray-900 hover:no-underline dark:text-gray-500 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Try Examples
                </h3>
                <ul role="list" className="mt-6 list-none space-y-4 pl-0">
                  {navigation.tryExamples.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm font-medium leading-6 text-gray-600 hover:text-gray-900 hover:no-underline dark:text-gray-500 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  See Also
                </h3>
                <ul role="list" className="mt-6 list-none space-y-4 pl-0">
                  {navigation.seeAlso.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium leading-6 text-gray-600 hover:text-gray-900 hover:no-underline dark:text-gray-500 dark:hover:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-b-0 border-l-0 border-r-0 border-solid border-gray-900/10 pt-8 dark:border-gray-200/10 sm:mt-20 lg:mt-24">
          <p className="leading-5 text-gray-500">
            Built by <a href="https://github.com/elilambnz">Eli Lamb</a>.
            Licensed under the{' '}
            <a href="https://github.com/elilambnz/react-py/blob/main/LICENSE.md">
              MIT License
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
