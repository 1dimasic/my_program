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
        inputTelephoneNumber.removeClass("invalid");

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
                inputTelephoneNumber.addClass("invalid");
            }
        })

        if (inputName.hasClass("invalid") || inputSurname.hasClass("invalid") ||
            inputTelephoneNumber.hasClass("invalid")) {
            return;
        }

        const contact = $("<tr>").addClass("contact");

        function numbered() {
            $(".id").each(function (i) {
                $(this).text(i + 1);
            })
        }


        function set_view() {
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
                contacts.appendTo("in-place")
                contact.removeClass("in-place");
            } else {
                contacts.append(contact);
            }

            numbered();

            contact.find(".delete-button").click(function () {
                $(".dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Delete all items": function () {
                            contact.remove();

                            $(this).dialog("close");
                            numbered();
                        },
                        Cancel: function () {
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
                    set_view();
                });

                contact.find(".save-button").click(function () {
                    const newName = editName.val().trim();
                    const newSurname = editSurname.val().trim();
                    const newTelephoneNumber = editTelephoneNumber.val().trim();

                    editName.removeClass("invalid");
                    editSurname.removeClass("invalid");
                    editTelephoneNumber.removeClass("invalid");

                    if (newName.length === 0) {
                        editName.addClass("invalid");
                    }

                    if (newSurname.length === 0) {
                        editSurname.addClass("invalid");
                    }

                    if (newTelephoneNumber.length === 0) {
                        editTelephoneNumber.addClass("invalid");
                    }

                    if (editName.hasClass(".invalid") || editSurname.hasClass(".invalid") || editTelephoneNumber.hasClass(".invalid")) {
                        return;
                    }

                    name = newName;
                    surname = newSurname;
                    telephoneNumber = newTelephoneNumber;
                    set_view();
                });
            });

            $(".checkbox").click(function () {
                if ($(".checkbox").is(":checked")) {
                    $(".del").prop("disabled", false);
                } else {
                    $(".select-all").prop("checked", false);
                    $(".del").prop("disabled", true);
                }
            })

            $(".del").click(function () {
                contact.find(".checkbox:checked").each(function () {
                    contact.remove();
                })

                numbered();
                $(".del").prop("disabled", true);
                $(".select-all").prop("checked", false);
            });

            $(".select-all").click(function () {
                if ($(this).is(":checked")) {
                    $(".checkbox").prop("checked", true);
                    $(".del").prop("disabled", false);
                } else {
                    $(".checkbox").prop("checked", false);
                    $(".del").prop("disabled", true);
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

        set_view();
    });
});
