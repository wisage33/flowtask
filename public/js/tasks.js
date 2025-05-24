const App = {
    data() {
        return {
            user: null,
            tasks: [],
            showForm: false,
            formData: {
                title: '',
                description: ''
            },
            telegramData: null
        }
    },
    methods: {
        waitForTelegramUser() {
            return new Promise((resolve) => {
                const checkAuth = () => {
                    if (window.telegramUser) {
                        this.user = window.telegramUser;
                        resolve();
                    } else {
                        setTimeout(checkAuth, 100);
                    }
                };
                checkAuth();
            });
        },

        toggleForm() {
            this.showForm = !this.showForm
        },

        async fetchTasks() {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error("No token found");
                return;
            }
        
            try {
                const tasksRes = await fetch('/api/tasks', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
        
                if (!tasksRes.ok) throw new Error('Network response was not ok');
        
                this.tasks = await tasksRes.json()
                console.log(this.tasks)
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },

        async createTask() {
            const token = localStorage.getItem('token')
            try {
                const res = await fetch('/api/tasks', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
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
            const token = localStorage.getItem('token')
            try {
                console.log(_id)
                const res = await fetch(`/api/tasks/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                await res.json()
                this.tasks = this.tasks.filter(task => task._id !== _id)
            } catch (err) {
                console.error(err)
            }
        },

        async takeTask(id) {
            const token = localStorage.getItem('token')
            try {
                const res = await fetch(`/api/tasks/${id}/assign`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                if(!res.ok) throw new Error("Не удалось взять задачу")

                const updatedTask = await res.json()

                this.tasks = this.tasks.map(task => 
                    task._id === id ? updatedTask : task
                );
            } catch(err) {
                console.error(err)
            }
        },

        async completeTask(id) {
            const token = localStorage.getItem('token')
            try {
                const res = await fetch(`/api/tasks/${id}/complete`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })

                const completeTask = await res.json()
                this.tasks = this.tasks.map(task => 
                    task._id === id ? completeTask : task
                )
            } catch (err) {
                console.log("Error complete task: ", err)
            }
        }
    },
    async mounted() {
        this.waitForTelegramUser().then(() => {
            this.fetchTasks()
        })
    }
}

Vue.createApp(App).mount('#app');