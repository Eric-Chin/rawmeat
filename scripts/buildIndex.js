/* global process */
const path = require('path')
const co = require('co')
const pify = require('pify')
const readPost = require('readpost')
const table = require('markdown-table')
const updateSection = require('./utils/updateSection')
const formatDate = require('./utils/formatDate')
const fs = pify(require('fs'))
const glob = pify(require("glob"))
const config = require('../rawmeat.json')
require('shelljs/global')

const blogsLocation = path.join(process.cwd(), 'blogs/!(README).md');
co(function* () {
  const files = yield glob(blogsLocation)
  var blogs = []
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var blog = yield fs.readFile(file, 'utf8')
    var meta = readPost(blog).meta
    meta.filename = path.basename(file)
    blogs.push(meta)
  }
  blogs = blogs.sort((a, b) => {
    return new Date(b.date) - new Date(a.date)
  })
  const indexTable = [
    ['标题', '分类', '日期']
  ]
  for (var i = 0; i < blogs.length; i++) {
    var post = blogs[i]
    indexTable.push([
      `[${post.title}](/blogs/${post.filename})`,
      Array.isArray(post.categories) ? post.categories.join(',') : post.categories,
      formatDate(post.date)
    ])
  }
  var readmeLocation = path.join(process.cwd(), 'scripts/templates/README.md')
  var readme = yield fs.readFile(readmeLocation, 'utf8')
  readme = readme
    .replace(/__SITE_NAME__/, config.sitename)
    .replace(/__DESCRIPTION__/, config.description)
    .replace(/__POST_LIST__/, table(indexTable))
  yield fs.writeFile(process.cwd() + '/README.md', readme, 'utf8')
  cp('-f', process.cwd() + '/README.md', process.cwd() + '/blogs/README.md')
}).catch(err => console.log(err))