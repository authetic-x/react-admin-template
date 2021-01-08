import React, { useState } from 'react'
import { Button } from 'antd'

interface RequestParams {
  url: string,
  method?: string,
  data?: any,
  headers?: any,
  requestList?: any
}

function request({
  url,
  method = 'post',
  data,
  headers = {},
  requestList
}: RequestParams) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = e => {
      resolve({
        data: e.loaded
      })
    }
  })
}

const SIZE = 10 * 1024 * 1024

interface Containter {
  file: File | null
}
interface Data {
  chunk: File | Blob,
  hash: string
}

function createChunk(file: File, size: number = SIZE) {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}

const FileUploader: React.FC = (props) => {
  const [container, setContainer] = useState<Containter>({
    file: null
  })

  const [data, setData] = useState<Data[]>([])

  async function uploadChunks() {
    const requestList = data.map(({ chunk, hash }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', container.file?.name!)
      return formData
    }).map(async (formData) => {
      request({
        url: 'http://localhost:4000',
        data: formData
      })
    })
    await Promise.all(requestList)
  }

  async function mergeRequest() {
    await request({
      url: 'http://localhost:4000/merge',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        filename: container.file?.name
      })
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    if (!file) return
    setContainer({
      file
    })
  }

  const handleUpload = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!container.file) return
    const fileChunkList = createChunk(container.file)
    const data = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      hash: container.file?.name + '-' + index
    }))
    setData(data)
    await uploadChunks()
    // await mergeRequest()
  }

  return (
    <section className='FileUploader'>
      <input type="file" onChange={handleFileChange}/>
      <Button type='ghost' onClick={handleUpload}>Upload</Button>
    </section>
  )
}

export default FileUploader