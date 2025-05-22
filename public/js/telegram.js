if (!window.telegramAuthDone) {
    const telegramData = window.Telegram.WebApp;
    telegramData.ready();

    fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            initData: telegramData.initData
        })
    })
    .then(res => res.json())
    .then(data => {
        window.telegramUser = data.dbUser
        localStorage.setItem('token', data.token)
    })
    .catch(err => {
        console.error("Failed auth: ", err)
    })

    window.telegramAuthDone = true;
}