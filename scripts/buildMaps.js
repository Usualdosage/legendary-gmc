const fs = require("fs");
const folder = './public/maps'

// Builds a maps.json file which can be read by the listMaps API. Normally, the API
// could do this, but it times out on Vercel, so this map list is built on postinstall
// each time.

fs.readdir(folder, (err, files) => {
    if (err) {
        console.log(err);
    }
    else if (!files) {
        console.log("No map files found at path.")
        return files;
    }
    else {
        fs.writeFile('./public/maps/maps.json', JSON.stringify(files), function (err) {
            if (err) throw err;
            console.log('Maps file was created successfully.');
          });
    }
});