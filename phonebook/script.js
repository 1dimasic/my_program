document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    const inputName = document.querySelector(".name");
    const inputSurname = document.querySelector(".surname");
    const inputTelephoneNumber = document.querySelector(".telephone-number");
    const abc = document.querySelector(".abc");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let flag = false;
        let name = inputName.value.trim();
        let surname = inputSurname.value.trim();
        let telephoneNumber = inputTelephoneNumber.value.trim();

        inputName.classList.remove("invalid");
        inputSurname.classList.remove("invalid");
        inputTelephoneNumber.classList.remove("invalid");

        if (name.length === 0) {
            inputName.classList.add("invalid");
            flag = true;
        }

        if (surname.length === 0) {
            inputSurname.classList.add("invalid");
            flag = true;
        }

        if (telephoneNumber.length === 0) {
            inputTelephoneNumber.classList.add("invalid");
            flag = true;
        }

        if (flag) {
            return;
        }

        const new_contact = document.createElement("tr")
        new_contact.classList.add("contact")

        function set_view() {
            let id = document.querySelectorAll(".abc > tr").length;

            new_contact.innerHTML = `<td class="id"></td>
                                     <td class="name"></td>
                                     <td class="surname"></td>
                                     <td class="telephone-number"></td>
                                     <td>
                                         <button type="button" class="edit-button">Edit</button>
                                         <button type="button" class="delete-button">Delete</button>
                                     </td>`;

            new_contact.querySelector(".id").textContent = String(id + 1);
            new_contact.querySelector(".name").textContent = name;
            new_contact.querySelector(".surname").textContent = surname;
            new_contact.querySelector(".telephone-number").textContent = telephoneNumber;
            abc.append(new_contact);

            new_contact.querySelector(".delete-button").addEventListener("click", function () {
                new_contact.remove();
            });

            new_contact.querySelector(".edit-button").addEventListener("click", function () {
                flag = false;
                new_contact.innerHTML = `<td class="id"></td>
                                         <td>
                                            <input type="text" class="edit-name">
                                            <div class="error-message">Введите имя</div>
                                         </td>    
                                         <td>                      
                                            <input type="text" class="edit-surname">
                                            <div class="error-message">Введите фамилию</div>
                                         </td> 
                                         <td>   
                                             <input type="text" class="edit-telephone-number">
                                             <div class="error-message">Введите номер телефона</div>
                                         </td>
                                         <button type="button" class="cancel-button">Cancel</button>
                                         <button type="button" class="save-button">Save</button>`;

                const editName = new_contact.querySelector(".edit-name");
                editName.value = name;

                const editSurname = new_contact.querySelector(".edit-surname");
                editSurname.value = surname;

                const editTelephoneNumber = new_contact.querySelector(".edit-telephone-number");
                editTelephoneNumber.value = telephoneNumber;

                new_contact.querySelector(".cancel-button").addEventListener("click", function () {
                    set_view();
                });

                new_contact.querySelector(".save-button").addEventListener("click", function () {
                    const newName = editName.value.trim();
                    const newSurname = editSurname.value.trim();
                    const newTelephoneNumber = editTelephoneNumber.value.trim();

                    editName.classList.remove("invalid");
                    editSurname.classList.remove("invalid");
                    editTelephoneNumber.classList.remove("invalid");


                    if (newName.length === 0) {
                        editName.classList.add("invalid");
                        flag = true;
                    }

                    if (newSurname.length === 0) {
                        editSurname.classList.add("invalid");
                        flag = true;
                    }

                    if (newTelephoneNumber.length === 0) {
                        editTelephoneNumber.classList.add("invalid");
                        flag = true;
                    }

                    if (flag) {
                        return;
                    }

                    name = newName;
                    surname = newSurname;
                    telephoneNumber = newTelephoneNumber;
                    set_view();
                });

            });
        }

        set_view();
    });
});
