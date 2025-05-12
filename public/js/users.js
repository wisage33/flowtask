const App = {
    data() {
        return {
            users: []
        }
    },

    async mounted() {
        const res = await fetch('/api/users')
        if(!res.ok) throw new Error("Users not found");
        this.users = await res.json()
    }
}

Vue.createApp(App).mount("#users")