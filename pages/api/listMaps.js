const find = require("list-files")

export default function handler(req, res) {

  find(function (result) {
    res.status(200).json(result)
  }, {
    dir: 'public/maps',
    name: 'jpg'
  });
}
