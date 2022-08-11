import inquirer from 'inquirer';
import config from '../config.json';
import downloadReport from '../utils/index';

const question = [
  // --- 模版 ---
  {
    type: 'list',
    name: 'template',
    choices: [
      { value: 'react', name: 'react template (react 子应用模版)' },
      { value: 'npm', name: 'npm package (npm 包模版)' },
      { value: 'component', name: 'component template (单组件模版)' },
      { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
      { value: 'node-ts', name: 'node Egg-ts template (egg TS 项目模版)' },
    ],
    default: ['react'],
    message: '选择将要初始化的模版',
  },
  // --- 名称 ---
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: 'onecli',
  },
  // --- 新建仓库 ---
  // {
  //   type: 'confirm', // yes or no 二选一
  //   name: 'needRemote',
  //   message: '是否创建新的远程仓库:',
  //   default: false
  // },
  // --- 描述 ---
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
  },
  // --- 作者 ---
  {
    type: 'input',
    name: 'author',
    message: 'Author',
  },
  // --- 版本号 ---
  {
    type: 'input',
    name: 'version',
    message: 'version',
    default: '1.0.0',
}];
inquirer.prompt(question).then(async (answers) => {
  const {
    name,
    template,
    description,
    author,
    version,
  } = answers;
  await downloadReport((config as any)[template].url, name, description, author, version);
});
