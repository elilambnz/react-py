# Contributing

Thanks for your interest in contributing to this project! Please take a moment to review this document **before submitting a pull request**.

## Pull requests

**Please ask first before starting work on any significant new features.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors [create an issue](https://github.com/elilambnz/react-py/issues/new?labels=enhancement) to first discuss any significant new ideas.

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
