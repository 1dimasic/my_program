$(function () {
    const form = $(".form");
    const inputName = $(".name");
    const inputSurname = $(".surname");
    const inputTelephoneNumber = $(".telephone-number");
    const abc = $(".abc");

    form.submit(function (e) {
        e.preventDefault();

        let isInvalid = false;
        let name = inputName.val().trim();
        let surname = inputSurname.val().trim();
        let telephoneNumber = inputTelephoneNumber.val().trim();

        inputName.removeClass("invalid");
        inputSurname.removeClass("invalid");
        inputTelephoneNumber.removeClass("invalid");

        if (name.length === 0) {
            inputName.addClass("invalid");
            isInvalid = true;
        }

        if (surname.length === 0) {
            inputSurname.addClass("invalid");
            isInvalid = true;
        }

        if (telephoneNumber.length === 0) {
            inputTelephoneNumber.addClass("invalid");
            isInvalid = true;
        }

        $(".telephone-number").each(function () {
            if ($(this).text() === telephoneNumber) {
                inputTelephoneNumber.addClass("invalid");
                isInvalid = true;
            }
        })

        if (isInvalid) {
            return;
        }

        const new_contact = $("<tr>").addClass("contact");
        isInvalid = false;

        function numbered() {
            $(".id").each(function (i) {
                $(this).text(i + 1);
            })
        }

        function set_view() {
            new_contact.html(`<td class="id"></td>
                              <td class="name"></td>
                              <td class="surname"></td>
                              <td class="telephone-number"></td>
                              <td>
                              <button type="button" class="edit-button">Edit</button>
                              <button type="button" class="delete-button">Delete</button>
                              </td>
                              <td>
                                <input type="checkbox" class="checkbox">
                              </td>`);

            new_contact.find(".name").text(name);
            new_contact.find(".surname").text(surname);
            new_contact.find(".telephone-number").text(telephoneNumber);
            abc.append(new_contact);
            numbered();

            new_contact.find(".delete-button").click(function () {
                $(".dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Delete all items": function () {
                            new_contact.remove();

                            $(this).dialog("close");
                            numbered();
                        },
                        Cancel: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

            new_contact.find(".edit-button").click(function () {
                isInvalid = false;
                new_contact.html(`<td></td>
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
                                   <td> 
                                  <button type="button" class="cancel-button">Cancel</button>
                                  <button type="button" class="save-button">Save</button>
                                  </td>`);

                const editName = new_contact.find(".edit-name").val(name);
                const editSurname = new_contact.find(".edit-surname").val(surname);
                const editTelephoneNumber = new_contact.find(".edit-telephone-number").val(telephoneNumber);

                new_contact.find(".cancel-button").click(function () {
                    set_view();
                });

                new_contact.find(".save-button").click(function () {
                    const newName = editName.val().trim();
                    const newSurname = editSurname.val().trim();
                    const newTelephoneNumber = editTelephoneNumber.val().trim();

                    editName.removeClass("invalid");
                    editSurname.removeClass("invalid");
                    editTelephoneNumber.removeClass("invalid");

                    if (newName.length === 0) {
                        editName.addClass("invalid");
                        isInvalid = true;
                    }

                    if (newSurname.length === 0) {
                        editSurname.addClass("invalid");
                        isInvalid = true;
                    }

                    if (newTelephoneNumber.length === 0) {
                        editTelephoneNumber.addClass("invalid");
                        isInvalid = true;
                    }

                    if (isInvalid) {
                        return;
                    }

                    name = newName;
                    surname = newSurname;
                    telephoneNumber = newTelephoneNumber;
                    set_view();
                });
            });

            $(".checkbox").click (function () {
                if ($(this).is(":checked")) {
                    $(".del").prop("disabled", false);
                }
                if ($(this).is(":not(:checked")) {
                        $(".del").prop("disabled", true);
                }
            })

            $(".del").click(function () {
                new_contact.find(".checkbox:checked").each(function () {
                    new_contact.remove();
                })

                numbered();
                $(".del").prop("disabled", true);
                $(".select-all").prop("checked", false);
            });

            $(".select-all").click (function () {
               if($(this).is(":checked")) {
                   $(".checkbox").prop("checked", true);
                   $(".del").prop("disabled", false);
               } else {
                   $(".checkbox").prop("checked", false);
                   $(".del").prop("disabled", true);
               }
            });

            $(".qwer").click(function () {
                const qwer = $(".fil").val().trim().toLowerCase();
                new_contact.filter(function () {
                    return $(this).text().toLowerCase().indexOf(qwer) === 0;
                }).show();
                
            })
        }
        set_view();
    });
});
