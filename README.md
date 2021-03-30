# COVID-19 Contract Explorer: Public frontend

## Prerequisites

Install Node.js on Ubuntu:

```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Or on Debian (as root):

```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```

Install Yarn on Linux:

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

## Getting started

Install the pre-commit Python package:

```bash
pip install pre-commit
```

Set up the git pre-commit hook:

```shell
pre-commit install
```

Install dependencies:

```bash
yarn
```

Start a development server:

```bash
yarn start
```

Prepare a production build:

```bash
yarn build
```

## Deployment

Get the deployed branch and commit:

```bash
curl https://open-contracting.health/ver.txt
```

or, open <https://open-contracting.health/ver.txt> in a browser.
