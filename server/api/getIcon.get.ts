import fs from 'fs-extra'
import yargs from 'yargs'
import path from 'path'

interface Files {
  name: string
  content: string
}

async function readFilesRecursive(folderPath: string) {
  try {
    // 读取文件夹中的文件和子文件夹列表
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    // 使用 Promise.all 并发处理每个文件和子文件夹
    const results = await Promise.all(
      entries.map(async (entry: { name: string; isDirectory: () => any }) => {
        const fullPath = path.join(folderPath, entry.name);

        if (entry.isDirectory()) {
          // 如果是子文件夹，递归处理
          return readFilesRecursive(fullPath);
        } else {
          // 如果是文件，读取文件内容
          if (path.extname(entry.name).toLowerCase() === '.svg') {
            const content = await fs.readFile(fullPath, 'utf8');
            const fileName = entry.name.split('/').pop() ?? '' // 获取文件名包括后缀
            const name = fileName.split('.').slice(0, -1).join('.'); // 去掉后缀
            return { name, content, fullPath };
          } else {
            // 不是SVG文件，返回空对象表示跳过
            return {};
          }
        }
      })
    );

    return results.filter((result: {}) => Object.keys(result).length > 0)
  } catch (err) {
    console.error(`Error reading folder ${folderPath}:`, err);
  }
}

const svgPath = yargs(process.argv.slice(2)).argv.path

export default defineEventHandler(async (event): Promise<Files[]> => {
  const folderPath = svgPath
    ? path.isAbsolute(svgPath) ? svgPath : path.resolve(svgPath)
    : path.resolve(process.cwd(), './assets'); // 本地文件夹的路径
  const files = await readFilesRecursive(folderPath)

  return files
})
