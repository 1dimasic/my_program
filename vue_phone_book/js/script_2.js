Vue.createApp({})
    .component("TodoList", {
        data() {
            return {
                isValid: true,
                items: [],
                newTodoItemText: "",
                newTodoItemId: 1
            };
        },

        methods: {
            addTodoItem() {
                const newTodoItem = {
                    id: this.newTodoItemId,
                    text: this.newTodoItemText
                };

                this.isValid = false;
                this.newTodoItemId++;
                this.items.push(newTodoItem);
                this.newTodoItemText = "";
            },

            deleteItem(item) {
                alert("1");
            }
        },

        template: `
            <form @submit.prevent="addTodoItem" class="row needs-validation" :class="{'was-validated': isValid}" novalidate>
                <div class="col-12">
                    <label for="new-task" class="form-label"></label>
                    <input v-model="newTodoItemText" type="text" id="new-task" class="form-control" required>
                    <div class="invalid-feedback text-center">
                    Введите текст задачи
                    </div>
                </div>
                <div class="col-12 mt-4">
                    <button class="btn btn-primary float-end">Добавить</button>
                </div>
            </form>

            <ul @remove="deleteItem">
                <todo-list-item v-for="item in items" 
                                :key="item.id" 
                                :item="item"></todo-list-item>
            </ul>`
    })
    .component("TodoListItem", {
        props: {
            item: {
                type: Object,
                required: true
            }
        },

        data() {
            return {};
        },

        methods: {
            editTodoItem() {

            },

            deleteTodoItem() {
                this.$emit("remove", this.item);
            }

        },

        template: `<li class="mt-3">
                   {{ item.text }}
                   <button @click="deleteTodoItem" class="btn btn-sm btn-danger float-end">Удалить</button>
                   <button @click="editTodoItem" class="btn btn-sm btn-primary float-end me-2">Редактировать</button>
                   </li>`
    })
    .mount("#app");