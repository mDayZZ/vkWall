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

getPostObject = (postElement) => { //need to init as constant value
    const postObject = {
        post_element: postElement,
        post_author: postElement.querySelector('.PostHeaderTitle__authorName')?.textContent,
        post_date: postElement.querySelector('.PostHeaderSubtitle__item')?.textContent,
        post_text: postElement.childNodes[1].childNodes[3].childNodes[1].childNodes[1].childNodes[0].querySelector('.wall_post_text')?.textContent ?? null,
        post_images: null,
        post_views: postElement.querySelector('._views')?.getAttribute('data-count'),
        post_likes: postElement.querySelector('.PostButtonReactions__title')?.textContent,
        post_reposts: postElement.querySelector('._share')?.getAttribute('data-count'),
        post_comments: null,
        repost_author: postElement.querySelector('.copy_author')?.textContent,
        repost_date: postElement.querySelector('.published_by_date')?.textContent,
        repost_text: postElement.querySelector('.copy_quote')?.querySelector('.wall_post_text')?.textContent,
        repost_images: null,
        deletePost_button: null,
        archivePost_button: null,
        savePostToBookmarks_button: null,
        pinPost_button: null,

        deletePost() {
            this.deletePost_button.click()
        },
        archivePost() {
            this.archivePost_button.click()
        },
        savePostToBookmarks() {
            this.savePostToBookmarks_button.click()
        },
        pinPost() {
            this.pinPost_button.click()
        },
    }
    return postObject
}
//'._post.post'
