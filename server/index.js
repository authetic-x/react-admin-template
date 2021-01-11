const http = require('http')
const path = require('path')
const fse = require('fs-extra')
const multiparty = require('multiparty')

const server = http.createServer()
const UPLOAD_DIR = path.resolve(__dirname, 'target')

const resolvePost = req => {
  return new Promise(resolve => {
    let chunk = ''
    req.on('data', data => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}

const pipeStream = (path, writeStream) => 
  new Promise(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.pipe(writeStream)
    readStream.on('end', () => {
      fse.unlinkSync(path)
      resolve()
    })
  })

const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, filename)
  const chunkPaths = await fse.readdir(chunkDir)
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      return pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index+1) * size
        })
      )
    })
  )
  // fse.rmdirSync(chunkDir)
}

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
    return;
  }

  if (req.url === '/merge') {
    const data = await resolvePost(req)
    console.log(data)
    const { filename, size } = data
    const filePath = path.resolve(UPLOAD_DIR, filename.slice(5))
    await mergeFileChunk(filePath, filename, size)
    res.end(
      JSON.stringify({
        code: 0,
        message: 'file merge success'
      })
    )
  }

  const multipart = new multiparty.Form()

  multipart.parse(req, async (err, fields, files) => {
    if (err) return

    const [chunk] = files.chunk
    const [hash] = fields.hash
    const [filename] = fields.filename
    const chunkDir = path.resolve(UPLOAD_DIR, `${filename}`)

    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    if (fse.pathExistsSync(`${chunkDir}/${hash}`)) {
      fse.unlinkSync(`${chunkDir}/${hash}`)
    }
    await fse.move(chunk.path, `${chunkDir}/${hash}`)
  })
  res.end()
})

server.listen(4000, () => console.log('Listening on 4000 port'))