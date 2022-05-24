let source = document.getElementsByTagName('source')
console.log(source)
if (source) {
    console.log('source')
    let div = document.createElement('div')
    div.setAttribute('id', 'divbox')
    document.body.appendChild(div)
    for (i = 0; i < source.length; i++) {
        var child = document.createElement('div')
        child.setAttribute("class", "child")
        child.innerHTML = "下载" + source[i].title
        child.setAttribute('title', source[i].src)
        div.appendChild(child);
        (function (child) {
            child.onclick = function () {
                console.log(child.innerHTML)
                console.log(child.title)
                window.open(child.title, true)
            }
        })(child)

    }
}
