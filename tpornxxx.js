chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details["type"] == "media") {
            console.log(details);
            console.log(details["type"]);
            console.log(details["url"]);
            url = details["url"]
            ajax(url)
        }


    },
    {
        "urls": ["<all_urls>"],
        "types": ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "media", "other"]
    },
    ["blocking"]
);
function ajax(url) {
    var xhr = new XMLHttpRequest()
    xhr.open('head', url, true)
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                console.log(e);
                fileSize = xhr.getResponseHeader('Content-Length');
                fileSize = fileSize / 1024 / 1024
                console.log(xhr);
                console.log(fileSize + "MB")
            }
        }
    };
    xhr.send()
}