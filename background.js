console.log('111111111111111111111111111')
let script = document.createElement("script")
script.innerHTML = `
var originXHR = window.XMLHttpRequest
var m3u8Target = ''
function ajax(options) {
    options = options || {};
    let xhr = new originXHR();
    if (options.type === 'file') {
        xhr.responseType = 'arraybuffer';
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.response);
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    xhr.open("GET", options.url, true);
    xhr.send(null);
}

// 检测 m3u8 链接的有效性
function checkM3u8Url(url) {
    console.log("*************检测 m3u8 链接的有效性******************")
    ajax({
        url,
        success: (fileStr) => {
            if (fileStr.indexOf('.ts') > -1) {
                m3u8Target = url
                console.log('【m3u8】----------------------------------------')
                console.log(url)
                
                var a = window.location.href
                var b = "www.xvideos.com"
                if(a.indexOf(b) > -1){
                  xvideos(m3u8Target)
                }else if(a.indexOf('www.eporner.com') > -1){
                  xvideos(m3u8Target)
                }else{
                  appenddom(m3u8Target)
                }
            }
        },
        fail:(error) => {
          console.log(error)
        }
    })
}

function appenddom(m3u8Target){
  if(document.getElementById('m3u8load')){
    let m3u8load = document.getElementById("m3u8load")
      m3u8load.href = m3u8Target
  }else{
    let m3u8load = document.createElement("a")
    m3u8load.setAttribute('id','m3u8load')
    m3u8load.href = m3u8Target
    document.body.appendChild(m3u8load)
  }
}
function xvideos(m3u8Target){
  var RegExp = /\\d{4}p/
  if(m3u8Target.match(RegExp)){
    clarity = m3u8Target.match(RegExp)[0]
    num = clarity.match(/\\d{4}/)[0]
  }else{
    var RegExp = /\\d{3}p/
    clarity = m3u8Target.match(RegExp)[0]
    num = clarity.match(/\\d{3}/)[0]
  }
  console.log(num)
  if(document.getElementById('m3u8load')){
    let m3u8load = document.getElementById("m3u8load")
    console.log(m3u8load)
    oldnum = m3u8load.getAttribute('num')
    console.log("......................................................"+oldnum+"......................................................")
    parseInt(num) > parseInt(oldnum) && changeArrtribute()
    console.log(parseInt(num) > parseInt(oldnum))
    function changeArrtribute(){
      console.log('执行changeArrtribute()')
      m3u8load.href = m3u8Target
      m3u8load.setAttribute('num',num)
      m3u8load.setAttribute('clarity',clarity)
    }
  }else{
    let m3u8load = document.createElement("a")
    m3u8load.setAttribute('id','m3u8load')
    m3u8load.href = m3u8Target
    document.body.appendChild(m3u8load)
    m3u8load.setAttribute('num',num)
    m3u8load.setAttribute('clarity',clarity)
  }
  
}

function resetAjax() {
    if (window._hadResetAjax) { // 如果已经重置过，则不再进入。解决开发时局部刷新导致重新加载问题
        return
    }
    window._hadResetAjax = true
    console.log("*******************************")
    var originOpen = originXHR.prototype.open
    window.XMLHttpRequest = function () {
        var realXHR = new originXHR()
        console.log("*******************************")
        realXHR.open = function (method, url) {
            if(url.indexOf('.m3u8') > 0){
                console.log("**************url在下面*****************")
            console.log(url)
            console.log("**************url在上面*****************")
            }
            
            url.indexOf('.m3u8') > 0 && checkM3u8Url(url)
            originOpen.call(realXHR, method, url)
        }
        return realXHR
    }
}

resetAjax()

`
// document.body.insertBefore(script, first);
document.documentElement.appendChild(script)
var int = self.setInterval("clock()", 1000);
function clock() {
  if (document.getElementById("m3u8load")) {
    //当断当前元素已存在，停止继续监听
    int = window.clearInterval(int);
    console.log("当前元素已存在!");
    appenddiv()
  }
}

function appenddiv() {
  let div = document.createElement("div")
  div.setAttribute('id', 'box')
  div.innerHTML = `
  <div class="box1">
    <span id="clarity"></span>
  </div>
  <div class="vue">  
    <div class="bgc"></div>
    <div class="center"><span id="click">下载</span></div>
    <div class="load"> </div>
  </div>
        `
  document.body.appendChild(div)
  let weburl = window.location.href
  let viewkey = weburl.split('viewkey=')[1]
  console.log('viewkey=' + viewkey)
  console.log(typeof viewkey)


  if (weburl.indexOf("view_video_hd") > -1) {
    document.getElementById("clarity").innerHTML = "超清"
  } else {
    document.getElementById("clarity").innerHTML = "标清"
    console.log(document.querySelector("#videodetails-content > a:nth-child(2)"));
    if (document.querySelector("#videodetails-content > a:nth-child(2)")) {
      let u = document.querySelector("#videodetails-content > a:nth-child(2)").href
      window.open(u, '_self')
    }
  }
  //**请求数据库查询是否存在viewkey */
  request({
    url: 'http://150.158.48.102/91/91.php',
    method: 'post',
    data: {
      type: 'inquire',
      key: viewkey
    }
  }).then(res => {
    if (res == '201') {
      document.getElementById("box").style = "background-color: rgba(211, 60, 60, 0.671);"
    }
  })
  document.getElementById('click').addEventListener('click', begin)
}
/**
 * 封装请求函数
 */
function request(options) {
  console.log(options)
  options = options || {};
  let url = options.url
  let method = options.method
  let data = options.data
  let promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.response)
        } else {
          reject(new Error("error"))
        }
      }
    }
    console.log(typeof method)
    if (method.toUpperCase() === "GET") {
      let paramslist = [];
      for (key in data) {
        paramslist.push(key + "=" + data[key])
      }
      //根据get请求方法对url进行拼接
      let params = paramslist.join("&");
      url = url + "?" + params;
      xhr.open("get", url, false);
      //使用get请求将内容连接在url后面
      xhr.send()

    }
    if (method.toUpperCase() === "POST") {
      console.log(typeof data)
      // let paramslist = [];
      // for(key in data){
      //     paramslist.push(key + "=" + data[key])
      // }
      // //根据get请求方法对url进行拼接
      // let params = paramslist.join("&");
      data = JSON.stringify(data)
      xhr.open("post", url, false);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
      xhr.send(data);
      //使用post请求时将内容放在send里面
    }

  })
  return promise
}

function loading() {
  let loader = document.getElementsByClassName('load')[0]
  loader.setAttribute('class', 'loader')
  console.log('loading')
}
function gettitle() {
  var title = document.getElementsByTagName('title')[0].innerHTML
  title = title.replace(/\s*/g, "");
  //去掉换行符
  title = title.replace(/\\r\\n/g, "");
  title = title.replace(/\\n/g, "");
  //去掉字符串前后的所有空格
  title = title.replace(/(^\s*)|(\s*$)/g, "");
  app.titlename = title
}
function geturl() {
  let url = document.getElementById('m3u8load')
  app.url = url.href
  console.log(app.url);
}
function jinsu() {
  var jindu1 = self.setInterval(() => {
    if (app.baifen != (app.finishNum / app.rangeDownload.targetSegment * 100).toFixed(0)) {
      app.baifen = (app.finishNum / app.rangeDownload.targetSegment * 100).toFixed(0)

      Change()
    }
  }, 100);
  function Change() {
    let aaa = app.baifen
    console.log(typeof (aaa));
    document.getElementById('click').innerHTML = aaa + "%"
    if (aaa == 100) {
      save()
    }
  }
}
function save() {
  //**请求数据库查询是否存在viewkey */
  let weburl = window.location.href
  let viewkey = weburl.split('viewkey=')[1]
  request({
    url: 'http://150.158.48.102/91/91.php',
    method: 'post',
    data: {
      type: 'insert',
      key: viewkey
    }
  }).then(res => {
    console.log(res)
    if (res == '200') {
      document.getElementsByTagName('title')[0].innerHTML = "下载完成"
      clearInterval()
      document.getElementById('click').innerHTML = "下载完成"
    }
  })
}
function begin(onlyGetRange) {
  jinsu()
  loading()
  console.log('begin')
  gettitle()
  geturl()
  console.log(app)
  document.getElementsByTagName('title')[0].innerHTML = "downloading"
  app.ajax({
    url: app.url,
    success: (m3u8Str) => {
      console.log(m3u8Str)
      app.tsUrlList = []
      app.finishList = []
      // 提取 ts 视频片段地址
      m3u8Str.split('\n').forEach((item) => {
        if (item.toLowerCase().indexOf('.ts') > -1 || item.toLowerCase().indexOf('.image') > -1) {
          app.tsUrlList.push(app.applyURL(item, app.url))
          app.finishList.push({
            title: item,
            status: ''
          })
        }
      })
      console.log(app.tsUrlList)

      // 仅获取视频片段数
      if (onlyGetRange) {
        console.log('onlyGetRange');
        console.log(onlyGetRange);
        app.rangeDownload.isShowRange = true
        app.rangeDownload.endSegment = app.tsUrlList.length
        app.rangeDownload.targetSegment = app.tsUrlList.length
      } else {
        console.log('elseonlyGetRange');
        console.log(onlyGetRange);
        let startSegment = Math.max(app.rangeDownload.startSegment || 1, 1) // 最小为 1
        let endSegment = Math.max(app.rangeDownload.endSegment || app.tsUrlList.length, 1)
        startSegment = Math.min(startSegment, app.tsUrlList.length) // 最大为 app.tsUrlList.length
        endSegment = Math.min(endSegment, app.tsUrlList.length)
        app.rangeDownload.startSegment = Math.min(startSegment, endSegment)
        app.rangeDownload.endSegment = Math.max(startSegment, endSegment)
        app.rangeDownload.targetSegment = app.rangeDownload.endSegment - app.rangeDownload.startSegment + 1
        app.downloadIndex = app.rangeDownload.startSegment - 1
        app.downloading = true
      }

      console.log('app.tsUrlList.length')
      if (app.tsUrlList.length > 0) { // 如果视频没加密，则直接下载片段，否则先下载秘钥
        app.downloadTS()
      }

    }
  })
}

let app = {
  baifen: '',
  url: '', // 在线链接
  tips: 'm3u8 视频在线提取工具', // 顶部提示
  titlename: '',
  isPause: false, // 是否暂停下载
  isGetMP4: false, // 是否转码为 MP4 下载
  durationSecond: 0, // 视频持续时长
  isShowRefer: true, // 是否显示推送
  downloading: false, // 是否下载中
  beginTime: '', // 开始下载的时间
  errorNum: 0, // 错误数
  finishNum: 0, // 已下载数
  downloadIndex: 0, // 当前下载片段
  finishList: [], // 下载完成项目
  tsUrlList: [], // ts URL数组
  mediaFileList: [], // 下载的媒体数组
  rangeDownload: { // 特定范围下载
    isShowRange: false, // 是否显示范围下载
    startSegment: '', // 起始片段
    endSegment: '', // 截止片段
    targetSegment: 1, // 待下载片段
  },
  aesConf: { // AES 视频解密配置
    method: '', // 加密算法
    uri: '', // key 所在文件路径
    iv: '', // 偏移值
    key: '', // 秘钥
    decryptor: null, // 解码器对象

    stringToBuffer: function (str) {
      return new TextEncoder().encode(str)
    },
  },
}
app.__proto__.applyURL = function applyURL(targetURL, baseURL) {
  baseURL = baseURL || location.href
  if (targetURL.indexOf('http') === 0) {
    return targetURL
  } else if (targetURL[0] === '/') {
    let domain = baseURL.split('/')
    return domain[0] + '//' + domain[2] + targetURL
  } else {
    let domain = baseURL.split('/')
    domain.pop()
    return domain.join('/') + '/' + targetURL
  }
},
  app.__proto__.dealTS = function dealTS(file, index, callback) {
    console.log('dealTS')
    const data = file
    app.conversionMp4(data, index, (afterData) => { // mp4 转码
      app.mediaFileList[index - app.rangeDownload.startSegment + 1] = afterData // 判断文件是否需要解密
      app.finishList[index].status = 'finish'
      app.finishNum++
      if (app.finishNum === app.rangeDownload.targetSegment) {
        app.downloadFile(app.mediaFileList, app.titlename)
      }
      callback && callback()
    })
  },
  app.__proto__.conversionMp4 = function conversionMp4(data, index, callback) {
    callback(data)
  },
  app.__proto__.downloadTS = function downloadTS() {
    console.log('app.downloadTS()')
    let download = () => {
      let index = app.downloadIndex
      app.downloadIndex++
      if (app.finishList[index] && app.finishList[index].status === '') {
        app.ajax({
          url: app.tsUrlList[index],
          type: 'file',
          success: (file) => {
            app.dealTS(file, index, () => app.downloadIndex < app.rangeDownload.endSegment && download())
          },
          fail: () => {
            app.errorNum++
            app.finishList[index].status = 'error'
            if (app.downloadIndex < app.rangeDownload.endSegment) {
              download()
            }
          }
        })
      } else if (app.downloadIndex < app.rangeDownload.endSegment) { // 跳过已经成功的片段
        download()
      }
    }

    // 建立多少个 ajax 线程
    for (let i = 0; i < Math.min(10, app.rangeDownload.targetSegment - app.finishNum); i++) {
      download(i)
    }
  },
  app.__proto__.downloadFile = function downloadFile(fileDataList, fileName) {
    app.tips = 'ts 碎片整合中，请留意浏览器下载'
    let fileBlob = null
    let a = document.createElement('a')
    if (app.isGetMP4) {
      fileBlob = new Blob(fileDataList, { type: 'video/mp4' }) // 创建一个Blob对象，并设置文件的 MIME 类型
      a.download = fileName + '.mp4'
    } else {
      fileBlob = new Blob(fileDataList, { type: 'video/MP2T' }) // 创建一个Blob对象，并设置文件的 MIME 类型
      a.download = fileName + '.ts'
    }
    a.href = URL.createObjectURL(fileBlob)
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  },
  app.__proto__.ajax = function ajax(options) {
    options = options || {};
    let xhr = new originXHR();
    if (options.type === 'file') {
      xhr.responseType = 'arraybuffer';
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let status = xhr.status;
        if (status >= 200 && status < 300) {
          options.success && options.success(xhr.response);
        } else {
          options.fail && options.fail(status);
        }
      }
    };

    xhr.open("GET", options.url, true);
    console.log(xhr);
    console.log(xhr.open);
    xhr.send(null);
  }

var originXHR = window.XMLHttpRequest
var m3u8Target = ''






// 91老视频下载
var obj91 = {
  down91: ''
}
Object.defineProperty(obj91, 'loaded', {
  get: function () {
    return obj91.down91
  },
  set: function (newval) {
    document.getElementById('click').innerHTML = newval + "%"
    obj91.down91 = newval
  }
})
var mp4url = ''
var begin91 = self.setInterval("onload91()", 1000);
function onload91() {
  if (document.getElementById('player_one_html5_api')) {
    console.log("当断当前元素已存在，停止继续监听");
    begin91 = window.clearInterval(begin91);
    get91url()
  }
}
function get91url() {
  console.log("执行get91url()");
  var wait_mp4 = self.setInterval(mp4onload(), 500)
  function mp4onload() {
    if (document.getElementById('player_one_html5_api')) {
      console.log("video已存在，监听src");
      wait_mp4 = window.clearInterval(wait_mp4);
      srconload()
    } else {
      console.log("元素不存在，继续监听");
    }
  }
}
function srconload() {
  var srcload = setInterval(srcok, 500)
  function srcok() {
    if (document.getElementById('player_one_html5_api').src) {
      console.log(document.getElementById('player_one_html5_api'));
      console.log("src已存在，停止监听");
      mp4url = document.getElementById('player_one_html5_api').src
      clearInterval(srcload)
      console.log(mp4url);
      console.log(mp4url.indexOf('.mp4') > -1);
      mp4url.indexOf('.mp4') > -1 && b()
    } else if (document.querySelector("#player_one_html5_api > source")) {
      console.log(document.querySelector("#player_one_html5_api > source"));
      mp4url = document.querySelector("#player_one_html5_api > source").src
      clearInterval(srcload)
      console.log(mp4url);
      console.log(mp4url.indexOf('.mp4') > -1);
      mp4url.indexOf('.mp4') > -1 && b()
    } else {
      console.log("src不存在，继续监听");
    }
  }
}
function b() {
  console.log("b()");
  let divc = document.createElement("div")
  divc.setAttribute('id', 'box')
  divc.innerHTML = `
  <div class="box1">
    <span id="clarity"></span>
  </div>
  <div class="vue">  
    <div class="bgc"></div>
    <div class="center"><span id="click">下载</span></div>
    <div class="load"> </div>
  </div>
        
        `
  document.body.appendChild(divc)
  console.log("执行 document.body.appendChild(divc)");
  let weburl = window.location.href
  if (weburl.indexOf("view_video_hd") > -1) {
    document.getElementById("clarity").innerHTML = "超清"
  } else {
    document.getElementById("clarity").innerHTML = "标清"
    console.log(document.querySelector("#videodetails-content > a:nth-child(2)"));
    if (document.querySelector("#videodetails-content > a:nth-child(2)")) {
      let u = document.querySelector("#videodetails-content > a:nth-child(2)").href
      window.open(u, '_self')
    }
  }
  divc.addEventListener('click', function d() {
    loading()
    var title_9 = document.getElementsByTagName('title')[0].innerHTML
    title_9 = title_9.replace(/\s*/g, "");
    //去掉换行符
    title_9 = title_9.replace(/\\r\\n/g, "");
    title_9 = title_9.replace(/\\n/g, "");
    //去掉字符串前后的所有空格
    title_9 = title_9.replace(/(^\s*)|(\s*$)/g, "");
    document.getElementsByTagName('title')[0].innerHTML = "loading..."
    let la = "la.killcovid2021.com"
    let ca = "cv.killcovid2021.com"
    let cdn = "cdn77.91p49.com"
    console.log(mp4url);
    if (mp4url.indexOf(la) > -1) {
      mp4url = mp4url.replace(la, cdn)
      ajax9(mp4url, title_9)
    } else if (mp4url.indexOf(ca) > -1) {
      mp4url = mp4url.replace(ca, cdn)
      ajax9(mp4url, title_9)
    } else {
      ajax9(mp4url, title_9)
    }
  })
}
function ajax9(mp4url, title_9) {
  var xhr = null
  xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function (e) {
    if (e.srcElement.response) {
      let url9 = URL.createObjectURL(e.srcElement.response)
      let a = document.createElement('a')
      a.href = url9
      a.download = title_9 + '.mp4'
      a.click()
      a.remove()
    }
  }
  xhr.onprogress = (event) => {
    if (event.lengthComputable) {
      obj91.loaded = parseInt(event.loaded / event.total * 100);
      if (obj91.loaded == 100) {
        console.log("下载完成");
        document.getElementsByTagName('title')[0].innerHTML = "下载完成"
        document.getElementsByClassName('loader')[0].className += " " + "paused"
      }
    }
  }
  console.log(xhr);
  xhr.open("get", mp4url, true)
  console.log(xhr.response);
  xhr.send(null)
}


