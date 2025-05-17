if (!window.telegramAuthDone) {
    const telegramData = window.Telegram.WebApp;
    // telegramData.ready();
    const url = window.location.pathname

    fetch(`/api/${url}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: telegramData.initDataUnsafe
    });

    window.telegramAuthDone = true;
}