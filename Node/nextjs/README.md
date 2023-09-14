# axe DevTools NextJS API Example Project

## Prerequisites

- npm
- NodeJS (6.10 or higher)

## Installation information

In order to use this example project, you will need to clone the repository from GitHub. Once you've done that, in your terminal, navigate from the project root back to this example.


```
cd Node/nextjs
```

Next, you'll need to install the dependencies for this project including axe DevTools Browser and the DevTools Reporter. They are already listed in `package.json`, but access to Deque's private registry is required to install them. To do so, follow [this guide](https://axe-devtools-html-docs.deque.com/reference/node/browser/install-agora.html) on the Deque documentation site. Once your access to Deque's private registry has been configured, dependencies for this project can be installed as normal through yarn or npm.

```
npm install
```

## Running the test cases

Use this command to run the example

```
npm test
```

## Project Setup

The sample test file is held within the `__test__` directory. This file contains an example of how to set up the axe DevTools Browser and Reporter APIs, test for accessibility, and generate formatted results.

Once the sample project has been run, formatted results can be found in the `a11y-results` folder. The folder will contain the raw JSON results as well as the html, csv, and xml report formats. There will be one additional `html` file which is an executive summary report aggregating results from all scans into one page.

## Modifying this project

Behind the scenes, `npm test` runs this command defined in `package.json`

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest"
  },
```

The `rimraf` command will clear any saved results, so if you want to store previous runs you should remove this part of the run command. If you modify this project and want to publish your results in a different folder other than `./ally-results` then you should update the `dir` here as well.

## Command to run NextJS development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional documentation

- Overview: https://axe-devtools-html-docs.deque.com/reference/node/browser/overview.html
- API: https://axe-devtools-html-docs.deque.com/reference/node/browser/ref-overview.html
- Rules: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md
