const App = {
    data() {
        return {
            servers: []
        }
    },
    async mounted() {
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('Network response was not ok');
            this.servers = await res.json();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
}

Vue.createApp(App).mount('#app');