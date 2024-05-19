// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-05-19
// @description  try to take over the world!
// @author       You
// @match        https://vk.com/max_dayzz
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vk.com
// @grant        none
// ==/UserScript==

let groupNames = []

const runScript = () => {
    const copyPosts = document.querySelectorAll('.copy_quote')


    const getCopyPostName = (copyPost) => {
        const authorElement = copyPost.querySelector('.copy_author')
        return authorElement.text
    }

    for (let i in copyPosts) {
        copyPosts.forEach((copyPost, i) => {
            // if groupNames.(getCopyPostName(copyPost))
                console.log(getCopyPostName(copyPost))
        })
    }
    window.scrollTo(0, document.body.scrollHeight)
}

setInterval(runScript, 2000)