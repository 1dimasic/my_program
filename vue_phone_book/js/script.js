Vue.createApp({})
    .component("ContactsList", {
        data() {
            return {
                contacts: []
            };
        },

        methods: {
            addContact(contact) {
                alert("2");
                this.contacts.push(contact);
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
                        <input type="checkbox">
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(index, contact) in contacts">
                    <tr>
                    <td>{{ index + 1 }}}</td>
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.surname }}</td>
                    <td>{{ contact.phoneNumber }}</td>
                    <td>
                        <button type="button" class="btn btn-sm"></button>
                        <button type="button" class="btn btn-sm"></button>
                    </td>
                    <td>
                        <input type="checkbox">
                    </td>
                    </tr>
                    </template>
                </tbody>
            </table>
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
                ContactsList.addContact({
                    name: this.nameInput,
                    surname: this.surnameInput,
                    phoneNumber: this.phoneNumberInput
                });
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

