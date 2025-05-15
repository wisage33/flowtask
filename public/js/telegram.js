document.addEventListener('DOMContentLoaded', () => {
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp
        webApp.ready()

        const initData = webApp.initDataUnsafe

        const output = initData
            ? `<pre>${JSON.stringify(initData, null, 2)}</pre>`
            : "Not have telegram access"

        document.querySelector('#auth').innerHTML(initData)
    } else document.querySelector('#auth').innerHTML('Not have Telegram initData')
})