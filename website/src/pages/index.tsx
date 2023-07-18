import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { useColorMode } from '@docusaurus/theme-common'

import CodeEditor from '../components/CodeEditor'
import Console from '../components/Console'
import { Tab } from '@headlessui/react'
import {
  BoltIcon,
  CodeBracketIcon,
  Cog8ToothIcon,
  CommandLineIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { snippets } from '../data/snippets'
import {
  ArrowTopRightOnSquareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/solid'
import clsx from 'clsx'

function HomepageHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { siteConfig } = useDocusaurusContext()
  const { colorMode } = useColorMode()

  useEffect(() => {
    setIsDarkMode(colorMode === 'dark')
  }, [colorMode])

  return (
    <div>
      <img
        className="mx-auto h-auto max-h-16 w-auto"
        src={
          isDarkMode
            ? require('@site/static/img/logo-dark.png').default
            : require('@site/static/img/logo-light.png').default
        }
        alt={siteConfig.title}
      />
      <p className="mx-auto mt-3 text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
        {siteConfig.tagline}
      </p>
      <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <Link
            to="/docs/introduction/getting-started"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-sky-700 hover:text-white hover:no-underline md:py-4 md:px-10 md:text-lg"
          >
            Get started
          </Link>
        </div>
        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
          <a
            href="https://github.com/elilambnz/react-py"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-sky-600 hover:bg-gray-50 hover:text-sky-600 hover:no-underline md:py-4 md:px-10 md:text-lg"
          >
            View GitHub
            <ArrowTopRightOnSquareIcon className="ml-2 -mr-1 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}

function Demo() {
  const shuffle = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

  const [activeTab, setActiveTab] = useState(0)
  const [code, updateCode] = useState(shuffle(snippets))

  function grabCode() {
    const next = shuffle(snippets)
    return next !== code ? next : grabCode()
  }

  const tabs = [
    {
      name: 'Code Block',
      icon: <CodeBracketIcon className="mr-3 h-5 w-5 stroke-inherit" />,
      component: <CodeEditor code={code} />
    },
    {
      name: 'REPL',
      icon: <CommandLineIcon className="mr-3 h-5 w-5 stroke-inherit" />,
      component: <Console />
    }
  ]

  return (
    <section className="w-full">
      <Tab.Group onChange={setActiveTab}>
        <div className="grid grid-cols-1 items-center md:grid-cols-[1fr,auto]">
          <div className="order-2 mt-4 flex min-w-0 md:order-1 md:mt-0">
            {activeTab === 0 && (
              <button
                type="button"
                onClick={() => updateCode(grabCode())}
                className="inline-flex items-center rounded-md border border-transparent bg-sky-100 px-3 py-2 text-sm font-medium leading-4 text-sky-700 shadow-sm hover:cursor-pointer hover:bg-sky-200"
              >
                Randomise example
                <ArrowPathIcon className="ml-2 -mr-0.5 h-4 w-4" />
              </button>
            )}
          </div>
          <div className="order-1 flex items-center md:order-2 md:ml-6">
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 dark:bg-blue-100/20">
              {tabs.map((tab) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    clsx(
                      'm-0 w-full rounded-lg border-none py-1.5 px-2 text-sm font-medium leading-5 outline-none',
                      'hover:cursor-pointer focus:outline-none',
                      selected
                        ? 'bg-white stroke-sky-500 text-slate-900 shadow'
                        : 'bg-transparent stroke-slate-700 text-slate-700 hover:bg-white/[0.12] dark:stroke-slate-200 dark:text-slate-200'
                    )
                  }
                >
                  <div className="flex items-center whitespace-nowrap font-semibold">
                    {tab.icon} {tab.name}
                  </div>
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>

        <Tab.Panels className="mt-4">
          {tabs.map((tab, i) => (
            <Tab.Panel key={i}>{tab.component}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}

function Features() {
  const features = [
    {
      name: 'Quick and easy setup',
      description:
        'Get up and running in minutes, with no complex setup or configuration. Integrate Python into your web applications and enjoy the full power of the language in the browser.',
      icon: BoltIcon
    },
    {
      name: 'Interactive examples',
      description:
        'We also provide a wide range of interactive examples to help you get started quickly. Explore the documentation to see examples of using packages, importing custom modules, dealing with user input and more.',
      icon: DocumentTextIcon
    },
    {
      name: 'Web worker support',
      description:
        'The Python WebAssembly environment is spawned as a web worker, separately from the main thread. This prevents blocking UI interaction and ensures that your application remains responsive.',
      icon: Cog8ToothIcon
    }
  ]

  return (
    <div className="py-20 dark:text-white">
      <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
        <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900 dark:text-gray-200">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-0 text-base leading-7 text-gray-600 dark:text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function PyRepl() {
  return (
    <div className="py-20 dark:text-white">
      <div className="mx-auto max-w-xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative isolate overflow-hidden bg-neutral-800 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#77B255" />
                <stop offset={1} stopColor="#3F725F" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              PyRepl.io is a Python interpreter in your browser.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Powered by react-py, PyRepl is made for creating and sharing code
              snippets. Embed interactive Python examples in your documentation,
              blog posts, presentations and more.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="https://pyrepl.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 hover:text-gray-900 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try it in your browser
                <ArrowTopRightOnSquareIcon className="ml-1 -mr-0.5 h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 h-auto w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={require('@site/static/img/pyrepl-screenshot.png').default}
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Effortlessly run Python code in your React apps."
    >
      <header className="mx-auto mt-16 w-full max-w-7xl px-4 sm:mt-24 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left xl:col-span-4">
            <HomepageHeader />
          </div>
          <div className="relative mt-12 sm:mx-auto sm:max-w-2xl lg:col-span-6 lg:mx-0 lg:-mt-12 lg:flex lg:max-w-none lg:items-center xl:col-span-8">
            <Demo />
          </div>
        </div>
      </header>
      <main>
        <Features />
        <PyRepl />
      </main>
    </Layout>
  )
}
