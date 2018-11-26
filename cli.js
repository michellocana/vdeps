#!/usr/bin/env node
const argv = require('yargs').argv
const chalk = require('chalk')
const finder = require('find-package-json')

const cwd = process.cwd()
const key = argv.dev ? 'devDependencies' : 'dependencies'

const showDependencies = pkg => {
  const { __path, [key]: dependencies } = pkg

  // Showing package.json location
  console.log(chalk.green(`Found package.json in: ${__path} \n`))

  // Showing searched key
  console.log(chalk.yellow(`List of ${key}: \n`))

  // Showing list of dependencies
  Object.entries(dependencies).forEach(([package, version]) => {
    console.log('*', chalk.blue(`${package}`), version)
  })
}

try {
  const pkg = finder(cwd).next().value
  showDependencies(pkg)
} catch (e) {
  console.log(chalk.red(`No package.json found in ${cwd}`))
}
