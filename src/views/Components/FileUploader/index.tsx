import React, { useEffect, useMemo, useState } from 'react'
import { Button, Table, Progress } from 'antd'

interface RequestParams {
  url: string,
  method?: string,
  data?: any,
  headers?: any,
  onProgress?: (e: ProgressEvent) => any, 
  requestList?: any
}

function request({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress,
  requestList
}: RequestParams) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log('response')
      resolve({
        data: xhr.response
      })
    })
    xhr.upload.onprogress = (e) => {
      console.log('progress')
      onProgress!(e)
    }
    /* xhr.addEventListener('progress', e => {
      console.log('progress')
      onProgress!(e)
    }) */
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
  })
}

const SIZE = 10 * 1024 * 1024

interface Containter {
  file: File | null
}
interface Data {
  chunk: File | Blob,
  hash: string,
  index: number,
  percentage: number
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

  function createProgressHandler(index: number) {
    return (e: ProgressEvent) => {
      console.log('upload progressbar', e.loaded)
      data.forEach((dataItem, i) => {
        if (i === index) {
          dataItem.percentage = parseInt(String((e.loaded / e.total) * 100))
        }
      })
    }
  }

  async function uploadChunks(data: Data[]) {
    const requestList = data.map(({ chunk, hash, index }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', container.file?.name!)
      return { formData, index }
    }).map(async ({ formData, index }) => {
      return request({
        url: 'http://localhost:4000',
        data: formData,
        onProgress: createProgressHandler(index)
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
        filename: container.file?.name,
        size: SIZE
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
      hash: container.file?.name + '-' + index,
      index,
      percentage: 0
    }))
    setData(data)
    await uploadChunks(data)
    // await mergeRequest()
  }

  const columns = [
    {
      title: '文件名',
      dataIndex: 'filename',
      key: 'filename'
    },
    {
      title: '切片大小',
      dataIndex: 'chunkSize',
      key: 'chunkSize'
    },
    {
      title: '进度条',
      dataIndex: 'percentage',
      key: 'progressbar',
      render: (percentage: number) => {
        return <Progress percent={percentage}/>
      }
    }
  ]

  const dataSource = useMemo(() => {
    console.log(data)
    return data.map((item, index) => ({
      key: index,
      filename: item.hash,
      chunkSize: item.chunk.size,
      percentage: item.percentage
    }))
  }, [data])

  return (
    <section className='FileUploader'>
      <input type="file" onChange={handleFileChange}/>
      <Button type='ghost' onClick={handleUpload}>Upload</Button>
      <Table 
        columns={columns} 
        dataSource={
          data.map((item, index) => ({
            key: index,
            filename: item.hash,
            chunkSize: item.chunk.size,
            percentage: item.percentage
          }))
        }/>
    </section>
  )
}

export default FileUploader