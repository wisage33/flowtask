const App = {
    data() {
        return {
            tasks: [],
            showForm: false,
            formData: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm
        },

        async createTask() {
            try {
                const res = await fetch('/api/tasks', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(this.formData)
                    }
                )
                const newTask = await res.json()
                this.tasks.unshift(newTask)
                this.formData.title = ''
                this.formData.description = ''
                this.showForm = false

            } catch (err) {
                console.error("Error: ", err)
            }
        },

        async deleteTask(_id) {
            try {
                console.log(_id)
                const res = await fetch(`/api/tasks/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await res.json()
                this.tasks = this.tasks.filter(task => task._id !== _id)
            } catch (err) {
                console.error(err)
            }
        }
    },
    async mounted() {
        try {
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('Network response was not ok');
            this.tasks = await res.json();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
}

Vue.createApp(App).mount('#app');