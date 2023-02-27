#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function getDirectoryContents(dirPath, result = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      result.push(filePath);
      getDirectoryContents(filePath, result);
    } else {
      result.push(filePath);
    }
  }

  return result;
}


const dirPath = "../assets";
const allFiles = getDirectoryContents(path.join(__dirname, dirPath));

console.log(allFiles);
