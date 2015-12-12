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

const blogsLocation = path.join(process.cwd(), 'blogs/*.md');
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
      post.title,
      Array.isArray(post.categories) ? post.categories.join(',') : post.categories,
      formatDate(post.date)
    ])
  }
  var readmeLocation = path.join(process.cwd(), 'README.md')
  var readme = yield fs.readFile(readmeLocation, 'utf8')
  readme = updateSection(readme, table(indexTable))
  yield fs.writeFile(readmeLocation, readme, 'utf8')
}).catch(err => console.log(err))