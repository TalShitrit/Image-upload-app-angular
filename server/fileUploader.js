const express = require('express')
const config = require("./config")
const fs = require('fs')
let table = require('./myData.json')

const router = express.Router()

router.post("/update", async (req, res) => {
  let body = req.body;
  let queryTitle = req.query.title
  let queryDelete = req.query.delete
  let title
  if (body) {
    try {
      let titles = await getAllfileNames()
      let count = 0
      titles.forEach(element => {
        if(element==body.title){
          count++;
        }
      });
if(body.title!=queryTitle){
  count++
}
      if (count > 1) {
        title = body.title + `(${count})`
      }
      else{
        title= body.title
      }
      let allData
      if (titles.includes(queryTitle)) {
        allData = await readFileAsync("myData.json")
        for (let index = 0; index < allData.length; index++) {
          const element = allData[index];
          if (element.title == queryTitle) {
            if (queryDelete) {
              allData.splice(index, 1);
              break
            }
            else {
              let image = element.imageData
              body.imageData = image
              body.title = title
              allData[index] = body
              break;
            }
          }
        }
      }
      json = JSON.stringify(allData); //convert it back to json
      fs.writeFile('myData.json', json, 'utf8', () => { console.log('edited'); }); // write it back 
    }
    catch (error) {
      res.send("an error was made: " + error)
    }

  }
  else {
    res.send(`body not received`)
  }


})
router.post("/upload", async (req, res) => {
  let body = req.body;
  if (body) {
    try {
      let titles = await getAllfileNames()
      let count = 1
      let title = body.title
      while (titles.includes(body.title)) {
        body.title = `${title}(${count})`
      }
      let img = body.imageData
      let ext = img.split(';')[0].match(/jpeg|png|jpg/)[0];
      let path = `${config.ImagePath}${body.title}.${ext}`
      let data = img.replace(/^data:image\/\w+;base64,/, "");
      let buf = new Buffer(data, 'base64');
      fs.writeFile(path, buf, () => { console.log('convert'); });
      body.imageData = path
      table.push(body); //add some data
      json = JSON.stringify(table); //convert it back to json
      fs.writeFile('myData.json', json, 'utf8', () => { console.log('added'); }); // write it back 
    }
    catch (error) {
      res.send("an error was made: " + error)
    }

  }
  else {
    res.send(`body not received`)
  }


})

router.get("/get", async function (req, res) {
  let data = await getAllImgData()
  let title = req.query.title
  let category = req.query.category
  let privte = req.query.privte
  if (title) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.title != title) {
        data.splice(index, 1)
        index--
      }
    }

  }
  else if (category) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (!await element.categories.find(categ => categ == category)) {
        data.splice(index, 1)
        index--
      }
    }



  }
  //=you cant see private img
  if (!privte) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.isPrivate === true) {
        data.splice(index, 1)
        index--
      }
    }
  }
  res.send(data)
})


router.post("/saveAlbumInfo", (req, res) => {
  let body = req.body;
  if (body) {
    try {
      json = JSON.stringify(body);
      fs.writeFile('albumInfo.json', json, 'utf8', () => { console.log('saved to albumInfo'); });

    }
    catch (error) {
      res.send("an error was made: " + error)
    }

  }
  else {
    res.send(`body not received`)
  }


})

router.get("/getAlbumInfo", async (req, res) => {

  try {
    if (!fs.existsSync("albumInfo.json")) {
      fs.writeFileSync("albumInfo.json", "{}")
    }
    let info = await readFileAsync("albumInfo.json")
    res.send(info)
  }
  catch (error) {
    res.send("an error was made: " + error)
  }
})

router.post("/saveUserOptions", (req, res) => {
  let body = req.body;
  if (body) {
    try {
      json = JSON.stringify(body);
      fs.writeFile('userOptions.json', json, 'utf8', () => { console.log('saved to userOptions'); });

    }
    catch (error) {
      res.send("an error was made: " + error)
    }

  }
  else {
    res.send(`body not received`)
  }


})

router.get("/getUserOptions", async (req, res) => {

  try {
    if (!fs.existsSync("userOptions.json")) {
      fs.writeFileSync("userOptions.json", "{}")
    }
    let info = await readFileAsync("userOptions.json")
    res.send(info)
  }
  catch (error) {
    res.send("an error was made: " + error)
  }
})


const readFileAsync = async (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', async function (error, content) {
      const resTable = JSON.parse(content);
      resolve(resTable)
    })
  }
  )
}
const getAllfileNames = async () => {
  return new Promise((resolve, reject) => {
    getAllImgData().then((data) => {
      let titles = data.map(x => x.title)
      resolve(titles)
    })
  }
  )
}

const getAllImgData = async () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync("myData.json")) {
      fs.writeFileSync("myData.json", "{}")
    }
    fs.readFile("myData.json", 'utf8', async function (error, content) {
      const resTable = JSON.parse(content);

      const imageToBase64 = require('image-to-base64');
      for (let index = 0; index < resTable.length; index++) {
        let element = resTable[index];
        let ext = element.imageData.split(';')[0].match(/jpeg|png|gif/)[0];
        let base64 = `data:image/${ext};base64,`
        let img = await imageToBase64(element.imageData)
        element.imageData = base64 + img
      }
      resolve(resTable)
    })
  }
  )
}
module.exports = router
