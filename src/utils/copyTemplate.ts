import fs from 'fs-extra';
import path from 'path';
import type { developerOnceNpmName } from '../type/index';
import { defaultCachePath } from './installPackage';
import { log, PREFIX } from './log';

async function copyTemplate(
  name: string,
  packageName: developerOnceNpmName,
  author: string,
  version: string,
  description: string,
) {
  // 1.创建本地目录
  const rootDir = process.cwd();
  const installPath = path.resolve(`${rootDir}/${name}`);
  log.verbose('安装路径', installPath);
  await fs.ensureDir(installPath);
  // 2.解析对应的包名，找到缓存包的路径,暂不支持可以自定义缓存路径
  const originFile = path.resolve(defaultCachePath, ...packageName.split('/'), 'template');
  log.verbose('缓存路径', originFile);
  // 3. 复制到项目目录,并改写json
  const fileList = fs.readdirSync(originFile);
  fileList.map(async (item) => {
    if (item === 'package.json') {
      fs.readJson(`${originFile}/${item}`, 'utf-8')
        .then(async (packageObj) => {
          await fs.writeJson(
            './package.json',
            { ...packageObj, author, version, description },
            {
              replacer: null,
              spaces: 2,
            },
          );
        })
        .catch((err) => {
          log.error(PREFIX, err.message);
        });
      // const packageJson = JSON.parse(fs.readJson(`, 'utf8'));
    } else {
      fs.copySync(`${originFile}/${item}`, `${installPath}/${item}`);
    }
  });
}
export default copyTemplate;
