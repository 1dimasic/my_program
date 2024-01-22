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
                }],
        }
    },

    methods: {
        addContact(contact) {
            this.contacts.push(contact);
        },

        removeContacts() {
            this.contacts = this.contacts.filter(contact => contact.isChecked === false);
        },
    },

    template: `
        <div class="row">
            <div class="col text-center mb-4">
                <h1>Телефонная книга</h1>
            </div>
        </div>
        <component-form @add="addContact" :contacts="contacts"></component-form>
        <search-form :contacts="contacts"></search-form>
        <contacts-list :contacts="contacts" @removeContacts="removeContacts"</contacts-list>`
})
    .component("SearchForm", {
        props: {
            contacts: Array
        },

        data() {
            return {
                searchingString: ""
            }
        },

        methods: {
            SearchContacts(searchingString) {
                this.contacts.forEach(function (contact) {
                    if (contact.name.includes(searchingString) || contact.surname.includes(searchingString)
                        || contact.phoneNumber.includes(searchingString)) {
                        contact.isSearchMode = true;
                    } else {
                        contact.isSearchMode = false;
                        contact.isChecked = false;
                    }
                });
            },

            resetSearchContacts() {
                this.contacts.map(contact => contact.isSearchMode = true)
            },
        },

        template: `
            <div class="row mt-3">
                <div class="col-4">
                    <div class="input-group">
                        <span class="input-group-text">Поиск</span>
                        <input type="tel" v-model="searchingString" class="form-control">
                    </div>
                </div>
                <div class="col-4">
                    <button type="button" 
                            class="btn btn-success me-3" 
                            @click="SearchContacts(searchingString)">
                            Найти
                    </button>
                    <button type="button" 
                            class="btn btn-secondary" 
                            @click="resetSearchContacts">
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
                selectAll: false,
                isNotAnyContactsChecked: true,
            }
        },

        methods: {
            removeContact(index) {
                this.contacts.splice(index, 1);
            },

            editContact(index) {
                this.contacts[index].isEditMode = true;
            },

            cancelContactEditMode(index) {
                this.contacts[index].isEditMode = false;
            },

            saveContact(index) {
                let contactToSave = this.contacts[index];

                let isRepeatedPhoneNumber = this.contacts
                    .filter(contact => contact.isEditMode === false)
                    .some(contact => contact.phoneNumber === contactToSave.phoneNumber)

                this.contacts[index].isEditMode = isRepeatedPhoneNumber || contactToSave.name.length === 0
                    || contactToSave.surname.length === 0 || contactToSave.phoneNumber.length === 0;
            },

            selectAllContacts() {
                if (!this.selectAll) {
                    this.contacts.map(contact => contact.isChecked = true);
                    this.isNotAnyContactsChecked = false;
                } else {
                    this.contacts.map(contact => contact.isChecked = false);
                    this.isNotAnyContactsChecked = true;
                }
            },

            removeContacts() {
                this.$emit("removeContacts");
                this.isNotAnyContactsChecked = true;
                this.selectAll = false;
            },

            checkContact(index) {
                if (!this.contacts[index].isChecked) {
                    this.contacts[index].isChecked = true;
                    this.isNotAnyContactsChecked = false;
                } else {
                    this.contacts[index].isChecked = false;
                }

                this.isNotAnyContactsChecked = !this.contacts.some(contact => contact.isChecked === true);
            }
        },

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
                                <input type="checkbox" @click="selectAllContacts" v-model="selectAll">
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
                                                    @click="editContact(index)">
                                                    Редактировать
                                            </button>
                                            <button type="button" 
                                                    class="btn btn-sm btn-danger" 
                                                    @click="removeContact(index)">
                                                    Удалить
                                            </button>
                                        </td>
                                        <template v-if="contact.isChecked">
                                             <td>
                                                <input type="checkbox" @click="checkContact(index)" checked>
                                             </td>
                                        </template>
                                        <template v-else>
                                             <td>
                                                <input type="checkbox" @click="checkContact(index)">
                                             </td>
                                        </template>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td>
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.name" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.surname" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.phoneNumber" class="form-control"
                                        </td>
                                        <td>
                                            <button type="button" 
                                                    class="btn btn-sm btn-success me-3" 
                                                    @click="saveContact(index)">
                                                    Сохранить
                                            </button>
                                            <button type="button" 
                                                    class="btn btn-sm btn-secondary" 
                                                    @click="cancelContactEditMode(index)">
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
                <div class="row">
                    <div>
                        <button class="btn btn-danger float-end col-1" 
                                :disabled="isNotAnyContactsChecked"
                                @click="removeContacts">Удалить</button>
                    </div>
                </div>
            </div>`
    })
    .component("ComponentForm", {
        props: {
            contacts: Array
        },

        data() {
            return {
                nameInput: "",
                surnameInput: "",
                phoneNumberInput: "",
                isRepeatedPhoneNumber: false,
                abc: false


            };
        },

        computed: {
            nameValidation() {
                return {
                    "is-valid": this.nameInput.length !== 0,
                    "is-invalid": this.abc && this.nameInput.trim().length === 0
                }
            }
        },

        methods: {
            submit() {
                this.abc = this.nameInput.trim().length === 0;
                this.surnameInput = this.surnameInput.trim();
                this.phoneNumberInput = this.phoneNumberInput.trim();

                this.isRepeatedPhoneNumber = this.contacts
                    .some(contact => contact.phoneNumber === this.phoneNumberInput);

                this.nameValidation["is-invalid"] = this.nameInput.length === 0;

                if (this.isRepeatedPhoneNumber || this.nameValidation["is-invalid"] || this.surnameInput.length === 0
                    || this.phoneNumberInput.length === 0) {
                    return;
                }

                const contact = {
                    name: this.nameInput,
                    surname: this.surnameInput,
                    phoneNumber: this.phoneNumberInput,
                    isEditMode: false,
                    isSearchMode: true,
                    isChecked: false
                };

                this.nameInput = "";
                this.surnameInput = "";
                this.phoneNumberInput = "";
                this.$emit("add", contact);
                this.abc = false;
            }
        },

        template: `
            <form @submit.prevent="submit" novalidate>
                <div class="row">
                    <div class="col-4">
                        <label for="name" class="form-label">Имя</label>
                        <input type="text" id="name" 
                                           v-model="nameInput" 
                                           class="form-control" 
                                           :class="nameValidation" 
                                           required>
                        <div class="invalid-feedback">
                        Введите имя
                        </div>
                    </div>
                    <div class="col-4">
                        <label for="surname" class="form-label">Фамилия</label>
                        <input type="text" id="surname" 
                                           v-model="surnameInput" 
                                           class="form-control" 
                                           :class="{'is-valid': isValidSurname, 'is-invalid': isInvalidSurname}" 
                                           required>
                        <div class="invalid-feedback">
                        Введите фамилию
                        </div>
                    </div>
                    <div class="col-4">
                        <label for="phone-number" class="form-label">Номер телефона</label>
                        <input type="tel" id="phone-number" 
                                          v-model="phoneNumberInput" 
                                          class="form-control" 
                                          :class="{'is-valid': isValidPhoneNumber, 'is-invalid': isInvalidPhoneNumber}"
                                          required>
                        <div class="invalid-feedback">
                        Введите номер телефона
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div>
                        <button class="col-auto float-end btn btn-primary" @click="checkValidate">Добавить</button>
                    </div>
                </div>
            </form>`
    })
    .mount("#app");

