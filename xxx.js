let xxxscript = document.createElement("script")
xxxscript.innerHTML = `
var originXHR = window.XMLHttpRequest
var mp4req = ''
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

// 检测 .mp4 链接的有效性
function checkM3u8Url(url) {
    console.log("*************检测 .mp4 链接的有效性******************")
    ajax({
        url,
        success: (fileStr) => {
            console.log(fileStr)
            if (fileStr.indexOf('.ts') > -1) {
                mp4req = url
                console.log('【m3u8】----------------------------------------')
                console.log(url)
                
                var a = window.location.href
                var b = "www.xvideos.com"
                if(a.indexOf(b) > -1){
                  xvideos(mp4req)
                }else if(a.indexOf('www.eporner.com') > -1){
                  xvideos(mp4req)
                }else{
                  appenddom(mp4req)
                }
            }
        },
        fail:(error) => {
          console.log(error)
        }
    })
}

function appenddom(mp4req){
  if(document.getElementById('mp4load')){
    let mp4load = document.getElementById("mp4load")
      mp4load.href = mp4req
  }else{
    let mp4load = document.createElement("a")
    mp4load.setAttribute('id','mp4load')
    mp4load.href = mp4req
    document.body.appendChild(mp4load)
  }
}
function xvideos(mp4req){
  var RegExp = /\\d{4}p/
  if(mp4req.match(RegExp)){
    clarity = mp4req.match(RegExp)[0]
    num = clarity.match(/\\d{4}/)[0]
  }else{
    var RegExp = /\\d{3}p/
    clarity = mp4req.match(RegExp)[0]
    num = clarity.match(/\\d{3}/)[0]
  }
  console.log(num)
  if(document.getElementById('mp4load')){
    let mp4load = document.getElementById("mp4load")
    console.log(mp4load)
    oldnum = mp4load.getAttribute('num')
    console.log("......................................................"+oldnum+"......................................................")
    parseInt(num) > parseInt(oldnum) && changeArrtribute()
    console.log(parseInt(num) > parseInt(oldnum))
    function changeArrtribute(){
      console.log('执行changeArrtribute()')
      mp4load.href = mp4req
      mp4load.setAttribute('num',num)
      mp4load.setAttribute('clarity',clarity)
    }
  }else{
    let mp4load = document.createElement("a")
    mp4load.setAttribute('id','mp4load')
    mp4load.href = mp4req
    document.body.appendChild(mp4load)
    mp4load.setAttribute('num',num)
    mp4load.setAttribute('clarity',clarity)
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
            console.log("*************"+url+"******************")
            if(url.indexOf('.mp4') > 0){
                console.log("**************url在下面*****************")
            console.log(url)
            console.log("**************url在上面*****************")
            }
            
            url.indexOf('.mp4') > 0 && checkM3u8Url(url)
            originOpen.call(realXHR, method, url)
        }
        return realXHR
    }
}

resetAjax()

`
// document.body.insertBefore(script, first);
document.documentElement.appendChild(xxxscript)