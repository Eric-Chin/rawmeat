/* global process */
require('colorful').toxic()
const pathExists = require('path-exists')
const co = require('co')
const pify = require('pify')
const fs = pify(require('fs'))
const formatDate = require('./utils/formatDate')
const argv = require('minimist')(process.argv.slice(2), { '--': true })
const filename = argv._[0]
if (!filename) {
  console.log('请提供文章的缩略名，例如 npm run post hello-world'.red)
} else {
  const exists = pathExists.sync(process.cwd() + '/blogs/' + filename + '.md')
  if (!exists) {
    co(function* () {
      var post = yield fs.readFile(process.cwd() + '/scripts/templates/post.md', 'utf8')
      post = post
        .replace(/__DATE__/, formatDate())
        .replace(/__TITLE__/, filename.replace(/[_-]/g, ' ') || 'hello world')
      yield fs.writeFile(process.cwd() + '/blogs/' + filename + '.md', post, 'utf8')
      console.log('成功了 ( ゜- ゜)つロ'.green)
    }).catch(err => console.log(err))
  } else {
    console.log('文章已存在，请删除后再试!'.red)
  }
}