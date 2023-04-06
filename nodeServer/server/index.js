const path = require('path')
const express = require('express')
const server = express()
const formidableMiddleware = require('express-formidable')
const request = require('request')

server.use(formidableMiddleware())
server.use((req, res, next) => {
  // 设置请求头
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

const getDetail = (albumId) => {
  return new Promise(resolve => {
    const datetime = new Date().getTime()
    const options = {
      url: `https://mobile.ximalaya.com/mobile/v1/album/detail/ts-${datetime}?albumId=${albumId}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.62 Safari/537.36',
        'Cookie': 'channel=ios-b1; 1&_device=iPhone&B5D5B410-F226-478D-AAF7-62A9D5112952&9.1.6; impl=com.gemd.iting; c-oper=%E8%81%94%E9%80%9A; net-mode=WIFI; res=1170%2C2532; 1&_token=372014177&6DBD6020140C862C4CAC022C65925234CD9BC45519C3BCED78AC4E95E191B9E2A8F3E2238C7079MD06A295884A4A6A_; idfa=B5D5B410-F226-478D-AAF7-62A9D5112952; device_model=iPhone%2012; XD=8yMFebgmcLLkf7TeMo/wipi809cG7+R/gMLNQuNMmU3nP1JU1XjLZ/DjxpdUCmnavtZxasg4Oe5ONTdm9BloKQ==; fp=00921364732222322v64v053214000k22021120020000000110363100003; pcdnFree=1'
      }
    }
    request(options, (error, response) => {
      resolve(JSON.parse(response.body))
    })
  })
}

const getConcreteRankList = (rankingListId) => {
  return new Promise(resolve => {
    const datetime = new Date().getTime()
    const url = `https://mobile.ximalaya.com/discovery-ranking-web/v5/ranking/concreteRankList/${datetime}?categoryId=3&pageId=1&pageSize=100&rankingListId=${rankingListId}`
    const options = {
      url,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.62 Safari/537.36',
        'Cookie': 'channel=ios-b1; 1&_device=iPhone&B5D5B410-F226-478D-AAF7-62A9D5112952&9.1.6; impl=com.gemd.iting; c-oper=%E8%81%94%E9%80%9A; net-mode=WIFI; res=1170%2C2532; 1&_token=372014177&6DBD6020140C862C4CAC022C65925234CD9BC45519C3BCED78AC4E95E191B9E2A8F3E2238C7079MD06A295884A4A6A_; idfa=B5D5B410-F226-478D-AAF7-62A9D5112952; device_model=iPhone%2012; XD=8yMFebgmcLLkf7TeMo/wipi809cG7+R/gMLNQuNMmU3nP1JU1XjLZ/DjxpdUCmnavtZxasg4Oe5ONTdm9BloKQ==; fp=00921364732222322v64v053214000k22021120020000000110363100003; pcdnFree=1'
      }
    }
    request(options, (error, response) => {
      resolve(JSON.parse(response.body))
    })
  })
}

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.get('/getConcreteRankList', async(req, res) => {
  console.log(req)
  const { rankingListId } = req.query
  getConcreteRankList(rankingListId).then(data => {
    res.send(data)
  })
})

server.get('/getDetail', async(req, res) => {
  console.log(req)
  const { albumId } = req.query
  getDetail(albumId).then(data => {
    res.send(data)
  })
})

server.listen(8848, () => {
  console.log('开启服务，端口8848')
})

