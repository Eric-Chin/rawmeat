/* global process */
const path = require('path')
const co = require('co')
const pify = require('pify')
const readPost = require('readpost')
const updateSection = require('./utils/updateSection')
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
  const index = []
  for (var i = 0; i < blogs.length; i++) {
    var post = blogs[i]
    index.push(`- [${post.title}](/blogs/${post.filename})`)
  }
  var readmeLocation = path.join(process.cwd(), 'README.md')
  var readme = yield fs.readFile(readmeLocation, 'utf8')
  readme = updateSection(readme, index.join('\n'))
  yield fs.writeFile(readmeLocation, readme, 'utf8')
}).catch(err => console.log(err))