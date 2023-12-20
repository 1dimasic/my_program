$(function () {
    const form = $(".form");
    const inputName = $("#name");
    const inputSurname = $("#surname");
    const inputTelephoneNumber = $("#telephone-number");
    const contacts = $(".contact-list");

    form.submit(function (e) {
        e.preventDefault();

        let name = inputName.val().trim();
        let surname = inputSurname.val().trim();
        let telephoneNumber = inputTelephoneNumber.val().trim();

        inputName.removeClass("invalid");
        inputSurname.removeClass("invalid");
        inputTelephoneNumber.removeClass("invalid, repeated-tel-number");

        if (name.length === 0) {
            inputName.addClass("invalid");
        }

        if (surname.length === 0) {
            inputSurname.addClass("invalid");
        }

        if (telephoneNumber.length === 0) {
            inputTelephoneNumber.addClass("invalid");
        }

        $(".telephone-number").each(function () {
            if ($(this).text() === telephoneNumber) {
                inputTelephoneNumber.addClass("repeated-tel-number");
            }
        })

        if (inputName.hasClass("invalid") || inputSurname.hasClass("invalid") ||
            inputTelephoneNumber.hasClass("invalid") || inputTelephoneNumber.hasClass("repeated-tel-number")) {
            return;
        }

        const contact = $("<tr>").addClass("contact");

        function numbered() {
            $(".id").each(function (i) {
                $(this).text(i + 1);
            })
        }


        function viewContactsList() {
            contact.html(`<td class="id"></td>
                         <td class="name"></td>
                          <td class="surname"></td>
                          <td class="telephone-number"></td>
                          <td>
                            <button type="button" class="edit-button in-table-button">Редактировать</button>
                            <button type="button" class="delete-button in-table-button">Удалить</button>
                          </td>
                          <td>
                            <input type="checkbox" class="checkbox">
                          </td>`);

            contact.find(".name").text(name);
            contact.find(".surname").text(surname);
            contact.find(".telephone-number").text(telephoneNumber);

            if (contact.hasClass("in-place")) {
                contact.appendTo("in-place")
                contact.removeClass("in-place");
            } else {
                contacts.append(contact);
            }

            numbered();

            contact.find(".delete-button").click(function () {
                $(".deletion-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Удалить": function () {
                            contact.remove();
                            $(this).dialog("close");
                            numbered();
                        },
                        "Отменить": function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            contact.find(".edit-button").click(function () {
                contact.addClass("in-place");
                contact.html(`<td></td>
                                  <td>
                                    <input type="text" class="edit-name edit-input-style">
                                   </td>    
                                   <td>                      
                                    <input type="text" class="edit-surname edit-input-style">
                                   </td> 
                                   <td>   
                                    <input type="tel" class="edit-telephone-number edit-input-style">
                                   </td>
                                   <td> 
                                  <button type="button" class="cancel-button in-table-button">Отменить</button>
                                  <button type="button" class="save-button in-table-button">Сохранить</button>
                                  </td>`);

                const editName = contact.find(".edit-name").val(name);
                const editSurname = contact.find(".edit-surname").val(surname);
                const editTelephoneNumber = contact.find(".edit-telephone-number").val(telephoneNumber);

                contact.find(".cancel-button").click(function () {
                    viewContactsList();
                });

                contact.find(".save-button").click(function () {
                    const newName = editName.val().trim();
                    const newSurname = editSurname.val().trim();
                    const newTelephoneNumber = editTelephoneNumber.val().trim();

                    editName.removeClass("invalid");
                    editSurname.removeClass("invalid");
                    editTelephoneNumber.removeClass("invalid, repeated-tel-number");


                    if (newName.length === 0) {
                        editName.addClass("invalid");
                    }

                    if (newSurname.length === 0) {
                        editSurname.addClass("invalid");
                    }

                    if (newTelephoneNumber.length === 0) {
                        editTelephoneNumber.addClass("invalid");
                    }

                    $(".telephone-number").each(function () {
                        if ($(this).text() === newTelephoneNumber) {
                            editTelephoneNumber.addClass("repeated-tel-number");
                        }

                    })

                    if (editName.hasClass("invalid") || editSurname.hasClass("invalid") ||
                        editTelephoneNumber.hasClass("invalid") || editTelephoneNumber.hasClass("repeated-tel-number")) {
                        return;
                    }

                    name = newName;
                    surname = newSurname;
                    telephoneNumber = newTelephoneNumber;
                    viewContactsList();
                });
            });

            $(".checkbox").click(function () {
                if ($(".checkbox").is(":checked")) {
                    $(".delete-all-button").prop("disabled", false);
                } else {
                    $(".select-all").prop("checked", false);
                    $(".delete-all-button").prop("disabled", true);
                }
            })

            $(".delete-all-button").click(function () {
                contact.find(".checkbox:checked").each(function () {
                    contact.remove();
                })

                numbered();
                $(".delete-all-button").prop("disabled", true);
                $(".select-all").prop("checked", false);
            });

            $(".select-all").click(function () {
                if ($(this).is(":checked")) {
                    $(".checkbox").prop("checked", true);
                    $(".delete-all-button").prop("disabled", false);
                } else {
                    $(".checkbox").prop("checked", false);
                    $(".delete-all-button").prop("disabled", true);
                }
            });

            $(".set-filter").click(function () {
                const searching_string = $(".filter").val().trim().toLowerCase();
                $(".contact").hide().filter(function () {
                    return $(this).text().toLowerCase().indexOf(searching_string) !== -1;
                }).show();
            })

            $(".reset-filter").click(function () {
                $(".contact").show();
                $(".filter").val("");
            })
        }

        inputName.text(" ");
        viewContactsList();

    });
});
