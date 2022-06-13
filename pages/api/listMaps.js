const fs = require("fs");
const folder = './public/maps'

export default function handler(req, res) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log(err);
    }
    else if (!files) {
      console.log("No map files found at path.")
      return files;
    }
    else {
      res.status(200).json(files)
    }
  });
}
