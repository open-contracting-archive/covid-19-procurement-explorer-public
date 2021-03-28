# Covid-19 Contract Explorer

Public website for Covid-19 Contract Explorer

## Installation

### clone branch

```bash
git clone https://github.com/open-contracting/covid-19-procurement-explorer-public.git
cd covid-19-procurement-explorer-public
```

### install node

```bash
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```

### install yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

## Usage

```bash
#install node modules
yarn

#start dev server
yarn start

#prepare for a production build
yarn build
```

## deploy

```bash
# deploy to staging
./deploy.sh branch_name covid19-dev

# deploy to production
./deploy.sh branch_name covid19
```

- note: By default master branch will be deployed to a staging server

## current deploy status

```bash
curl https://open-contracting.health/ver.txt
```

or simply view in browser

https://open-contracting.health/ver.txt
