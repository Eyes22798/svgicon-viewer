const path = require('path')

module.exports = function () {
  const svgFilePath = path.isAbsolute(process.env.__SVG_ICON_PATH__)
    ? process.env.__SVG_ICON_PATH__
    : path.join(process.cwd(), process.env.__SVG_ICON_PATH__)

  // let files = glob.sync(path.join(svgFilePath, '**/*.svg'))
  let icons = []
  // for (let i = 0; i < files.length; i++) {
  //   let filename = files[i]
  //   icons.push({
  //     name: path.parse(filename).name,
  //     path: files[i]
  //   })
  // }

  const files = require.context(`${svgFilePath}`, true, /\.svg$/)
  const modules = {}
  files.keys().forEach(key => {
    const name = path.basename(key) //返回文件名 不含后缀名
    // content= files(key).default || files(key)

    console.log(name)
  })

  return icons
}
