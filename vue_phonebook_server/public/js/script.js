function executeGet(url, data) {
    return axios.get(url, {
        params: data
    }).then(response => response.data);
}

function executePost(url, data) {
    return axios.post(url, data).then(response => response.data);
}

function executeDelete(url) {
    return axios.delete(url).then(response => response.data);
}

class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/contacts";
    }

    getContacts(term) {
        return executeGet(this.baseUrl, {term});
    }

    deleteContacts(id) {
        return executeDelete(`${this.baseUrl}/${id}`)
    }

    addContactToContacts(contact) {
        return executePost(this.baseUrl, contact);
    }
}

Vue.createApp({
    data() {
        return {
            contacts: [],
            searchingString: "",
            name: "",
            surname: "",
            phoneNumber: "",
            contactId: 0,
            isEmptyName: false,
            isEmptySurname: false,
            isEmptyPhoneNumber: false,
            service: new PhoneBookService(),
            deleteConfirmDialog: null
        }
    },

    created() {
        this.loadContacts();
    },

    mounted() {
        this.deleteConfirmDialog = new bootstrap.Modal(this.$refs.modal, {});
    },

    computed: {
        nameValidationClass() {
            return {
                "is-valid": this.name.trim().length !== 0,
                "is-invalid": this.isEmptyName && this.name.trim().length === 0
            }
        },

        surnameValidationClass() {
            return {
                "is-valid": this.surname.trim().length !== 0,
                "is-invalid": this.isEmptySurname && this.surname.trim().length === 0
            }
        },

        phoneValidationClass() {
            return {
                "is-valid": this.phoneNumber.trim().length !== 0,
                "is-invalid": (this.isEmptyPhoneNumber && this.phoneNumber.trim().length === 0)
            }
        },

        invalidPhoneNumberMessage() {
            return "Введите номер телефона";
        }
    },

    methods: {
        loadContacts() {
            this.service.getContacts(this.searchingString).then(contacts => {
                this.contacts = contacts;
            }).catch(() => alert("Ошибка загрузки контактов"));
        },

        addContact() {
            this.isEmptyName = this.name.trim().length === 0;
            this.isEmptySurname = this.surname.trim().length === 0;
            this.isEmptyPhoneNumber = this.phoneNumber.trim().length === 0;

            if (this.isEmptyName || this.isEmptySurname || this.isEmptyPhoneNumber) {
                return;
            }

            const contact = {
                id: ++this.contactId,
                name: this.name,
                surname: this.surname,
                phoneNumber: this.phoneNumber,
            };

            this.name = "";
            this.surname = "";
            this.phoneNumber = "";

            this.service.addContactToContacts(contact).then(response => {
                if (!response.success) {
                    alert(response.message)
                    return;
                }
                this.loadContacts();
            }).catch(() => alert("Ошибка добавления контакта"));
        },

        deleteContact(contact) {
            this.deleteConfirmDialog.show();

            /*this.service.deleteContacts(contact.id).then(response => {
                if (!response.success) {
                    alert(response.message)
                    return;
                }
                this.loadContacts();
            }).catch(() => alert("Ошибка удаления контакта"));*/

        },

        resetSearch() {
            this.searchingString = "";
            this.loadContacts();
        },

        showDeleteContactModalDialog(contact) {

        },
    },


}).mount("#app");