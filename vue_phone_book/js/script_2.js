Vue.createApp({})
    .component("contactsList", {
        data() {
            return {
                contacts: [],
            };
        },

        methods: {
            addContact() {
                const newContact = {
                    name: this.nameInput,
                    surname: this.surnameInput,
                    phoneNumber: this.phoneNumberInput,
                };

                this.items.push(newContact);
            },

            deleteItem(item) {
                alert("1");
            }
        },

        template: ``
    })
    .component("contactItem", {
        props: {
            contact: {
                type: Object,
                required: true
            }
        },

        data() {
            return {};
        },

        methods: {
            editContactItem() {

            },

            deleteContactItem() {
                this.$emit("remove", this.item);
            }
        },

        template: ``
    })
    .mount("#app");