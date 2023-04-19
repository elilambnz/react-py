# Contributing

Thanks for your interest in contributing to this project! Please take a moment to review this document **before submitting a pull request**.

## Pull requests

**Please ask first before starting work on any significant new features.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors create [an issue](https://github.com/elilambnz/react-py/issues/new?labels=enhancement) to first discuss any significant new ideas.

## Coding standards

Our code formatting rules are defined in [.eslintrc](https://github.com/elilambnz/react-py/blob/master/.eslintrc.json). You can check your code against these standards by running:

```sh
npm run lint && npm run style
```

To automatically fix any style violations in your code, you can run:

```sh
npm run lint -- --fix && npm run style -- --write
```

## Running tests

You can run the test suite using the following commands:

```sh
npm run build && npm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.

## Development

Developing react-py locally requires some additional steps.

You'll need to install [Node.js](https://nodejs.org/en/). Once you have Node.js installed, you can install the project's dependencies by running:

```sh
git clone git@github.com:elilambnz/react-py.git
cd react-py
npm install
```

This repo also contains the documentation site, which can be used to test your changes. To get started with the website, run:

```sh
cd website
npm install
npm run docusaurus
```

You will need to link the local version of react-py to the website. To do this, run in the root of the project:

```sh
npm link
```

Then, in the website directory, run:

```sh
npm link react-py
```

Now, you can make changes to the react-py code and see the changes reflected in the website.

TIP: You can use the `npm run watch` command to automatically rebuild and run `npm link` when you make changes.

NOTE: When using React and `npm link`, this can cause issues with multiple copies of React being loaded. A webpack plugin `resolveReact` has been added to the Docusaurus config to resolve this issue.
