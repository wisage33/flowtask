const App = {
    data() {
        return {
            servers: []
        }
    },
    async mounted() {
        const res = await fetch('/api/json')
        this.servers = await res.json()
    }
}


Vue.createApp(App).mount('#app')