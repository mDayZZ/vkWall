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

const mainMenuElement = document.createElement('dialog')
mainMenuElement.classList.add('vkWall-dialog')
mainMenuElement.setAttribute('style', 'position: fixed; z-index: 1000; top: 50%; bottom: 50%; max-height: 50vh; overflow-y: auto;')

mainMenuElement.insertAdjacentHTML("afterbegin",
    `<div class="vkWall-dialog">
           <div class="vkWall-groups">
            <button id="scanButton" type="button" class="vkWall-button">Сканировать группы</button>
            <ul class="groupList-groupList">
<!--               -->
            </ul>
        </div>
        <div class="vkWall-delete">
            <button id="deleteButton" type="button" class="vkWall-button">Удалить репосты с выбранными группами</button>
        </div>
    </div>`
)

document.body.insertAdjacentElement("beforebegin", mainMenuElement)


let groups = []
let groupsNames = []

let state = ''

getGroupName = (group) => {
    const authorElement = group.querySelector('.copy_author')
    return authorElement.text
}



const updateDialogList = () => {
    const groupList = mainMenuElement.querySelector('.groupList-groupList')
    groupList.querySelectorAll('.groupList-groupItem').forEach(groupItem=>groupItem.remove())
    groupsNames.forEach((groupName, i)=> {
        const groupItem = document.createElement('li')
        groupItem.classList.add('groupList-groupItem')
        groupItem.setAttribute('style', 'display: flex; gap: 20px;')
        groupItem.insertAdjacentHTML("beforeend", `<p class="groupName">${groupName}</p>
                    <input type="checkbox" name="" id="checkbox_${i}" value="${groupName}">`)
        groupList.insertAdjacentElement('beforeend',groupItem)
    })
}

const scanGroups = () => {
    const copyPosts = document.querySelectorAll('.copy_quote')
    copyPosts.forEach((copyPost, i) => {
        if (groupsNames.indexOf(getGroupName(copyPost)) === -1) {
            groupsNames.push(getGroupName(copyPost))
            console.log('Добавлена группа', getGroupName(copyPost))
            console.log('Итоговый массив:', groups)
        }
            // else {
            //     console.log('Повтор')
            //     console.log('Итоговый массив:', groups)
            // }
    })
}

const scanGroupsScript = () => {
    if (!state) {
        groups = []
        groupsNames = []
        state = 'scan'
        const stopScan = () => {
            groups = document.querySelectorAll('.copy_quote')
            clearInterval(scrollInterval)
            clearInterval(scanGroupsInterval)
            updateDialogList()
            stopScanButton.remove()
            state = ''
            console.log('Сканирование групп принудительно остановлено')
        }

        mainMenuElement.querySelector('.vkWall-groups').insertAdjacentHTML('afterbegin',
            `<button id="stopScanButton" type="button" class="button">Остановить Сканирование</button>`)
        const stopScanButton = mainMenuElement.querySelector("#stopScanButton")
        console.log('Старт сканирования групп')
        let lastHeight = -1;
        const scrollInterval = setInterval(() => {
            if (lastHeight !== document.body.scrollHeight) {
                lastHeight = document.body.scrollHeight
                // console.log('Перезаписали lastHeight, теперь он:', lastHeight)
                window.scrollTo(0, document.body.scrollHeight)


            } else {
                // console.log('Закрылся scrollInterval: lH == scrll.Height')
                // console.log('Закрылся scanGroupsInterval: lH == scrll.Height')
                stopScan()
            }


        }, 3000)

        const scanGroupsInterval = setInterval(() => {
            scanGroups()
            console.log('Отсканированные группы:', groups)
        }, 10000)

        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyP') {
                stopScan()
            }
        })

        stopScanButton.addEventListener('click', event => stopScan())

    } else {
        console.log('Действие уже выполняется')
    }
}

checkGroups = () => groups

checkCheckedItems = () => {
    let checkedItems = []
    for (let i=0; i < groupsNames.length; i++) {
        const listItem = mainMenuElement.querySelector(`#checkbox_${i}`)
        if (listItem.checked) {
            checkedItems.push(listItem)
        }
    }
    return checkedItems
}

findPostsByGroupName = (groupName) => {
    let foundedPosts = []
    groups.forEach((group, i)=>{
        if (getGroupName(group) === groupName) {
            foundedPosts.push(group.parentElement.parentElement.parentElement.parentElement)
        }
    })
    return foundedPosts
}

deletePost = (post) => {
    buttons = post.querySelectorAll('.ui_actions_menu_item')
    let deleteButton
    buttons.forEach((button)=>{
        if (button.textContent === 'Удалить запись') {
            deleteButton = button
        }
    })
    deleteButton.click()
}

deleteCheckedPosts = () => {
    const checkedGroupItems = checkCheckedItems()
    let postsToDelete = []
    checkedGroupItems.forEach((groupItem) => {
        const posts = findPostsByGroupName(groupItem.value)
        posts.forEach((post)=>postsToDelete.push(post))
        // groupsNames.splice(groupsNames.indexOf(groupItem.value), 1)
    })
    postsToDelete.forEach(post=>deletePost(post))
}


//intervals

//HotKeys
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyM':
            console.log('keyM')
            const vkWallDialog = document.querySelector('.vkWall-dialog')
            console.log('attr=', vkWallDialog.getAttribute('open'))
            if (vkWallDialog.getAttribute('open')) {
                document.querySelector('.vkWall-dialog').removeAttribute('open')
                console.log('Удалили диалоговому окну аттрибут "open"')
            } else {
                document.querySelector('.vkWall-dialog').setAttribute('open', 'true')
                console.log('Создали аттрибут')
            }
            break
        case 'KeyI':
            console.log('KeyI')
            scanGroupsScript()
            break
    }
})

mainMenuElement.querySelector('#scanButton').addEventListener('click', (event)=> {
    scanGroupsScript()
})

mainMenuElement.querySelector('#deleteButton').addEventListener('click', (event)=> {
    deleteCheckedPosts()
})