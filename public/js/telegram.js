if (!window.telegramAuthDone) {
    const telegramData = window.Telegram.WebApp;
    telegramData.ready();

    fetch(`/auth/telegram`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            initData: telegramData.initData
        })
    });

    window.telegramAuthDone = true;
}