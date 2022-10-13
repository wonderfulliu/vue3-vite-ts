#!/bin/zsh

env=${1:-prod}

echo "开始打包，环境:" ${env}
vite build
if [ ${env} == "dev" ]; then
  echo "打包完成，导入数据"
  cp -r './src/mock' './dist'
fi

echo "删除旧 dist.zip"
rm dist.zip

echo "压缩"
zip dist './dist'

echo "打开文件夹"
open './'
