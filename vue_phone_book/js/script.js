Vue.createApp({
    data() {
        return {
            contacts: [{
                name: "bob",
                surname: "dilan",
                phoneNumber: "123",
                isEditMode: false,
                isSearchMode: true,
                isChecked: false
            },
                {
                    name: "sue",
                    surname: "dilan",
                    phoneNumber: "456",
                    isEditMode: false,
                    isSearchMode: true,
                    isChecked: false
                }]
        }
    },

    methods: {
        addContact(contact) {
            this.contacts.push(contact);
        },

        removeContact(index) {
            this.contacts.splice(index, 1);
        },

        editContact(index) {
            this.contacts[index].isEditMode = true;
        },

        notSaveContact(index) {
            this.contacts[index].isEditMode = false;
        },

        SaveContact(index) {
            let contactToSave = this.contacts[index];

            let isRepeatedPhoneNumber = this.contacts
                .filter(contact => contact.isEditMode === false)
                .some(contact => contact.phoneNumber === contactToSave.phoneNumber)

            if (isRepeatedPhoneNumber || contactToSave.name.length === 0 || contactToSave.surname.length === 0
                || contactToSave.phoneNumber.length === 0) {
                this.contacts[index].isEditMode = true;
            } else {
                this.contacts[index].isEditMode = false;
            }
        },

        SearchContacts(searchingString) {
            this.contacts.forEach(function (contact) {
                if (contact.name.includes(searchingString) || contact.surname.includes(searchingString)
                    || contact.phoneNumber.includes(searchingString)) {
                    contact.isSearchMode = true;
                } else {
                    contact.isSearchMode = false;
                }
            });
        },

        resetSearchContacts() {
            this.contacts.map(contact => contact.isSearchMode = true)
        }
    },

    template: `
        <div class="row">
            <div class="col text-center mb-4">
                <h1>Телефонная книга</h1>
            </div>
        </div>
        <component-form @add="addContact"></component-form>
        <search-form @search="SearchContacts" @reset="resetSearchContacts"></search-form>
        <contacts-list :contacts="contacts" @remove="removeContact" 
                                            @edit="editContact"
                                            @cancel="notSaveContact"
                                            @save="SaveContact"
        </contacts-list>`
})
    .component("SearchForm", {
        data() {
            return {
                searchingString: ""
            }
        },

        methods: {
            search(searchingString) {
                this.$emit("search", searchingString);
            },

            reset() {
                this.$emit("reset");
            }
        },

        template: `
            <div class="row mt-3">
                <div class="col-4">
                    <div class="input-group">
                        <span class="input-group-text">Поиск</span>
                        <input type="tel" id="filter" v-model="searchingString" class="form-control">
                    </div>
                </div>
                <div class="col-4">
                    <button type="button" 
                            class="btn btn-success me-3" 
                            @click="search(searchingString)">
                            Найти
                    </button>
                    <button type="button" 
                            class="btn btn-secondary" 
                            @click="reset">
                            Сбросить
                    </button>       
                </div>
            </div>`
    })
    .component("ContactsList", {
        props: {
            contacts: Array
        },

        data() {
            return {
                selectAll: false
            }
        },

        methods: {
            remove(index) {
                this.$emit("remove", index);
            },

            edit(index) {
                this.$emit("edit", index);
            },

            cancel(index) {
                this.$emit("cancel", index);
            },

            save(index) {
                this.$emit("save", index);
            },

            select() {
                if (!this.selectAll) {
                    this.contacts.map(contact => contact.isChecked = true);
                } else {
                    this.contacts.map(contact => contact.isChecked = false);
                }
            }
        },

        watch: {},

        template: `
            <div class="row mt-3">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Номер телефона</th>
                            <th></th>
                            <th>
                                <input type="checkbox" @click="select" v-model="selectAll">
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(contact, index) in contacts" :key="index">
                            <template v-if="contact.isSearchMode">
                                <template v-if="!contact.isEditMode">
                                    <tr>
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ contact.name }}</td>
                                        <td>{{ contact.surname }}</td>
                                        <td>{{ contact.phoneNumber }}</td>
                                        <td>
                                            <button type="button" 
                                                    class="btn btn-sm btn-warning me-3" 
                                                    @click="edit(index)">
                                                    Редактировать
                                            </button>
                                            <button type="button" 
                                                    class="btn btn-sm btn-danger" 
                                                    @click="remove(index)">
                                                    Удалить
                                            </button>
                                        </td>
                                        <template v-if="contact.isChecked">
                                             <td>
                                                <input type="checkbox" checked>
                                             </td>
                                        </template>
                                        <template v-else>
                                             <td>
                                                <input type="checkbox">
                                             </td>
                                        </template>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <input type="text" v-model="contact.name" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.surname" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.phoneNumber" class="form-control"</td>
                                        <td>
                                            <button type="button" 
                                                    class="btn btn-sm btn-success me-3" 
                                                    @click="save(index)">
                                                    Сохранить
                                            </button>
                                            <button type="button" 
                                                    class="btn btn-sm btn-secondary" 
                                                    @click="cancel(index)">
                                                    Отменить
                                            </button>
                                        </td>
                                        <td>
                                            <input type="checkbox" disabled>
                                        </td>
                                        </tr>
                                </template>
                            </template>
                        </template>
                    </tbody>
                </table>
                <button></button>
            </div>`
    })
    .component("ComponentForm", {
        data() {
            return {
                nameInput: "",
                surnameInput: "",
                phoneNumberInput: ""
            };
        },

        methods: {
            submit() {
                const contact = {
                    name: this.nameInput,
                    surname: this.surnameInput,
                    phoneNumber: this.phoneNumberInput,
                    isEditMode: false,
                    isSearchMode: true,
                    isChecked: false
                };

                this.$emit("add", contact);
            }
        },

        template: `
            <form @submit.prevent="submit" class="form needs-validation">
                <div class="row">
                    <div class="col-4">
                        <div class="input-group">
                            <span class="input-group-text">Имя</span>
                            <input type="text" v-model="nameInput" class="form-control">
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-group">
                            <span class="input-group-text">Фамилия</span>
                            <input type="text" v-model="surnameInput" class="form-control">
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-group">
                            <span class="input-group-text">Номер телефона</span>
                            <input type="tel" v-model="phoneNumberInput" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div>
                        <button class="col-1 float-end btn btn-primary">Добавить</button>
                    </div>
                </div>
            </form>`
    })
    .mount("#app");

