Vue.createApp({

})
    .component("ComponentForm", {

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
                    .filter(contact => !contact.isEditMode)
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
          `
    })
    .mount("#app");

