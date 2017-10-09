const express = require('express')
const request = require('request-promise')

const app = express()

app.get('/',async (req,res)=>{
  const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+new Date()}`
  try{
    res.json( await request({
      uri: url,
      json: true,
      headers: {
        'origin': 'https://m.y.qq.com',
        'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        'referer': 'https://m.y.qq.com/',
        'authority': 'szc.y.qq.com',
        'accept': 'application/json'
      }
    }))
  }catch(e){
    res.json({error: e.message})
  }
})
app.listen(9000)
console.log('进入 localhost:9000 ~ 查看数据')

// 首页
// curl 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1507561155678' -H 'origin: https://m.y.qq.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1' -H 'accept: application/json' -H 'referer: https://m.y.qq.com/' -H 'authority: c.y.qq.com' -H 'cookie: RK=/f//A1rfSh; pgv_pvi=341251072; eas_sid=N195D0I2i8G8d7T522Q5v2m8M4; pac_uid=1_385816603; o_cookie=385816603; ptcz=a85786fed1dbb369e0c8cd44f3981affb91d50644b75e521ab4c94fec4d69311; pt2gguin=o0385816603; ts_refer=ADTAGmyqq; ts_uid=626847738; yq_index=28; ts_refer=ADTAGmyqq; ts_uid=626847738; pgv_pvid=5834104222' --compressed
