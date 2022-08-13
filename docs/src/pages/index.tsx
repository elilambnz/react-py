import React, { useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeEditor from "../components/CodeEditor";
import { snippets } from "../data/snippets";
import { ExternalLinkIcon, RefreshIcon } from "@heroicons/react/solid";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="mx-auto mt-8 max-w-7xl px-4 sm:mt-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
          <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent dark:from-teal-200 dark:to-cyan-400 xl:inline">
            {siteConfig.title}
          </span>
        </h1>
        <p className="mx-auto mt-3 flex max-w-md items-center justify-center text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          {siteConfig.tagline}
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/docs/introduction/getting-started"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 hover:text-white hover:no-underline md:py-4 md:px-10 md:text-lg"
            >
              Get started
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="https://github.com/elilambnz/react-py"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-cyan-600 hover:bg-gray-50 hover:text-cyan-600 hover:no-underline md:py-4 md:px-10 md:text-lg"
            >
              View on GitHub
              <ExternalLinkIcon className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  let [code, updateCode] = useState(grabCode());

  function grabCode() {
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className="mx-auto mt-8 max-w-7xl px-4 text-center sm:mt-16">
        <p>Or, try it out with some code!</p>
        <button
          type="button"
          onClick={() => updateCode(grabCode())}
          className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:cursor-pointer hover:bg-cyan-700"
        >
          Randomise example
          <RefreshIcon className="ml-2 -mr-0.5 h-4 w-4" />
        </button>
        <div className="mx-auto mt-4 max-w-6xl">
          <CodeEditor code={code} showButtons />
        </div>
      </main>
    </Layout>
  );
}
