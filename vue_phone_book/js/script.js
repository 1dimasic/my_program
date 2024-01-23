Vue.createApp({
    data() {
        return {
            contacts: [],
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
        <filter-form :contacts="contacts"></filter-form>
        <contacts-list :contacts="contacts" @removeContacts="removeContacts"</contacts-list>`
})
    .component("filterForm", {
        props: {
            contacts: Array
        },

        data() {
            return {
                searchingString: ""
            }
        },

        methods: {
            setFilter(searchingString) {
                this.contacts.forEach(function (contact) {
                    if (contact.name.includes(searchingString) || contact.surname.includes(searchingString)
                        || contact.phoneNumber.includes(searchingString)) {
                        contact.isFilterMode = true;
                    } else {
                        contact.isFilterMode = false;
                        contact.isChecked = false;
                    }
                });
            },

            resetFilter() {
                this.contacts.map(contact => contact.isFilterMode = true);
            }
        },

        template: `
            <div class="row">
                <div class="col-sm-6">
                    <label for="searching-string-input" class="form-label">Поиск</label>
                    <div class="input-group">
                        <input type="text" id="searching-string-input" v-model="searchingString" class="form-control">
                        <button type="button" class="btn btn-success" @click="setFilter(searchingString)">Найти</button>
                        <button type="button" class="btn btn-secondary" @click="resetFilter">Сбросить</button>     
                    </div>
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
                contactEditFieldValidation: [],
                savedContactToCancelButton: []
            }
        },

        methods: {
            removeContact(index) {
                this.contacts.splice(index, 1);
            },

            editContact(index) {
                this.savedContactToCancelButton[index] = Object.assign({}, this.contacts[index]);
                this.contacts[index].isEditMode = true;
                this.contacts[index].isChecked = false;

                this.contactEditFieldValidation[index] = {
                    "name": {
                        "valid": true,
                        "invalid": false
                    },

                    "surname": {
                        "valid": true,
                        "invalid": false
                    },

                    "phoneNumber": {
                        "valid": true,
                        "invalid": false
                    },

                    "invalidPhoneNumberMessage": ""
                };
            },

            cancelContactEditMode(index) {
                this.contacts[index] = Object.assign({}, this.savedContactToCancelButton[index]);
                this.contacts[index].isEditMode = false;
                this.contacts[index].isChecked = false;
                delete this.savedContactToCancelButton[index];
            },

            saveContact(index) {
                let savedContact = this.contacts[index];
                let contactValidationObject = this.contactEditFieldValidation[index];

                contactValidationObject.name.invalid = savedContact.name.length === 0;
                contactValidationObject.surname.invalid = savedContact.surname.length === 0;

                let isRepeatedPhoneNumber = this.contacts
                    .some(contact => contact.phoneNumber === savedContact.phoneNumber);

                contactValidationObject.phoneNumber.invalid = savedContact.phoneNumber.length === 0
                    || isRepeatedPhoneNumber;

                contactValidationObject.invalidPhoneNumberMessage = isRepeatedPhoneNumber
                    ? "Введен существующий номер" : "Введите номер телефона"

                this.contacts[index].isEditMode = isRepeatedPhoneNumber || savedContact.name.length === 0
                    || savedContact.surname.length === 0 || savedContact.phoneNumber.length === 0;
            },

            selectAllContacts() {
                if (!this.selectAll) {
                    this.contacts.map(contact => contact.isChecked = true);
                } else {
                    this.contacts.map(contact => contact.isChecked = false);
                }
            },

            removeContacts() {
                this.$emit("removeContacts");
                this.selectAll = false;
            },

            selectContact(index) {
                this.contacts[index].isChecked = !this.contacts[index].isChecked;
            },

            validateNameEditField(index) {
                return {
                    "is-valid": true,
                    "is-invalid": this.contactEditFieldValidation[index].name.invalid
                }
            },

            validateSurnameEditField(index) {
                return {
                    "is-valid": true,
                    "is-invalid": this.contactEditFieldValidation[index].surname.invalid
                }
            },

            validatePhoneNumberEditField(index) {
                return {
                    "is-valid": true,
                    "is-invalid": this.contactEditFieldValidation[index].phoneNumber.invalid
                }
            },
        },

        computed: {
            isNotAnyContactsChecked() {
                return !this.contacts.some(contact => contact.isChecked === true);
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
                            <template v-if="contact.isFilterMode">
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
                                        <td>
                                            <input type="checkbox" 
                                                   @click="selectContact(index)" 
                                                   v-model="contact.isChecked">
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td>
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.name" 
                                                               class="form-control" 
                                                               :class="validateNameEditField(index)">
                                            <div class="invalid-feedback">Введите имя</div>
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.surname" 
                                                               class="form-control"
                                                               :class="validateSurnameEditField(index)">
                                            <div class="invalid-feedback">Введите фамилию</div>
                                        </td>
                                        <td>
                                            <input type="text" v-model="contact.phoneNumber" 
                                                               class="form-control"
                                                               :class="validatePhoneNumberEditField(index)">
                                            <div class="invalid-feedback">
                                            {{ contactEditFieldValidation[index].invalidPhoneNumberMessage }}
                                            </div>
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
                        <button class="btn btn-danger float-end col-auto" 
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
                nameInputField: "",
                surnameInputField: "",
                phoneNumberInputField: "",
                isEmptyName: false,
                isEmptySurname: false,
                isEmptyPhoneNumber: false,
                isRepeatedPhoneNumber: false
            };
        },

        computed: {
            nameValidation() {
                return {
                    "is-valid": this.nameInputField.trim().length !== 0,
                    "is-invalid": this.isEmptyName && this.nameInputField.trim().length === 0
                }
            },

            surnameValidation() {
                return {
                    "is-valid": this.surnameInputField.trim().length !== 0,
                    "is-invalid": this.isEmptySurname && this.surnameInputField.trim().length === 0
                }
            },

            phoneValidation() {
                return {
                    "is-valid": this.phoneNumberInputField.trim().length !== 0,
                    "is-invalid": (this.isEmptyPhoneNumber && this.phoneNumberInputField.trim().length === 0)
                        || this.isRepeatedPhoneNumber
                }
            },

            invalidPhoneNumberMessage() {
                return this.isRepeatedPhoneNumber ? "Введен существующий номер" : "Введите номер телефона";
            }
        },

        methods: {
            submit() {
                this.isEmptyName = this.nameInputField.trim().length === 0;
                this.isEmptySurname = this.surnameInputField.trim().length === 0;
                this.isEmptyPhoneNumber = this.phoneNumberInputField.trim().length === 0;

                this.isRepeatedPhoneNumber = this.contacts
                    .some(contact => contact.phoneNumber === this.phoneNumberInputField);

                if (this.isRepeatedPhoneNumber || this.isEmptyName || this.isEmptySurname || this.isEmptyPhoneNumber) {
                    return;
                }

                const contact = {
                    name: this.nameInputField,
                    surname: this.surnameInputField,
                    phoneNumber: this.phoneNumberInputField,
                    isEditMode: false,
                    isFilterMode: true,
                    isChecked: false
                };

                this.nameInputField = "";
                this.surnameInputField = "";
                this.phoneNumberInputField = "";
                this.$emit("add", contact);
            }
        },

        template: `
            <form @submit.prevent="submit" novalidate>
                <div class="row">
                    <div class="col-sm-4">
                        <label for="name" class="form-label">Имя</label>
                        <input type="text" id="name" 
                                           v-model="nameInputField" 
                                           class="form-control" 
                                           :class="nameValidation" 
                                           required>
                        <div class="invalid-feedback">
                        Введите имя
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label for="surname" class="form-label">Фамилия</label>
                        <input type="text" id="surname" 
                                           v-model="surnameInputField" 
                                           class="form-control" 
                                           :class="surnameValidation" 
                                           required>
                        <div class="invalid-feedback">
                        Введите фамилию
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label for="phone-number" class="form-label">Номер телефона</label>
                        <input type="tel" id="phone-number" 
                                          v-model="phoneNumberInputField" 
                                          class="form-control" 
                                          :class="phoneValidation"
                                          required>
                        <div class="invalid-feedback">{{invalidPhoneNumberMessage}}</div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div>
                        <button class="col-auto float-end btn btn-primary">Добавить</button>
                    </div>
                </div>
            </form>`
    })
    .mount("#app");

