const fs = require("fs");

const path = require("path");

let types = {
  media: ["mp4", "mkv", "mp3"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
};

function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    console.log("Please Enter a valid Directory Path");
  }

  let doesExist = fs.existsSync(dirPath);

  if (doesExist == true) {
    destPath = path.join(dirPath, "organized_Files");

    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
    } else {
      console.log("Folder Already Exists");
    }
  }

  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  // console.log(childNames)

  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    isFile = fs.lstatSync(childAddress).isFile();

    if (isFile == true) {
      let fileCategory = getCategory(childNames[i]);

      console.log(childNames[i] + " belongs to " + fileCategory);

      sendFiles(childAddress, dest, fileCategory);
    }
  }
}

function getCategory(FileName) {
  let ext = path.extname(FileName).slice(1);
  // We extracted extension names of the target files

  //console.log(ext)

  for (let key in types) {
    let cTypeArr = types[key];
    //We took out all the category type Arrays here

    // console.log(cTypeArr)

    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return key;
      }
    }
  }

  return "others";
}

function sendFiles(srcFilePath, dest, fileCategory) {
  let catPath = path.join(dest, fileCategory);

  if (fs.existsSync(catPath) == false) {
    fs.mkdirSync(catPath);
  }

  let fileName = path.basename(srcFilePath);

  let destFilePath = path.join(catPath, fileName);

  fs.copyFileSync(srcFilePath, destFilePath);

  fs.unlinkSync(srcFilePath);
}

module.exports = {
  organizeFnKey: organizeFn,
};
