Vue.createApp({
    data() {
        return {
            todoList: [],
            newTodoItemText: "",
        };
    },

    methods: {
        addTodoItem() {
            if (this.newTodoItemText.length === 0) {
                return;
            }

            this.todoList.push({
                text: this.newTodoItemText,
                isEdit: false
            })

            this.newTodoItemText = undefined;
        },

        deleteTodoItem(index) {
            this.todoList.splice(index, 1);
        },

        editTodoItem(index) {
            this.todoList[index].isEdit = true;
        },

        notSaveTodoItem(index) {
            this.todoList[index].isEdit = false;
        },

        saveTodoItem(index, newTodoItemText) {
            if(newTodoItemText.length === 0) {
                return;
            }

            this.todoList[index].text = newTodoItemText;
            this.todoList[index].isEdit = false;
        }
    }
}).mount("#app");