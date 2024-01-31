const express = require("express");
const router = express.Router();

let contacts = [
    {
        id: 1,
        name: "bob",
        surname: "dilan",
        phoneNumber: "12"
    },
    {
        id: 2,
        name: "sue",
        surname: "dilan",
        phoneNumber: "34"
    }
];
let contactId = 2;

router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});

router.get("/api/contacts", function (req, res) {
    const searchingString = (req.query.term || "").toUpperCase();

    const contactToShow = searchingString.length === 0
        ? contacts
        : contacts.filter(contact => contact.name.toUpperCase().includes(searchingString)
            || contact.surname.toUpperCase().includes(searchingString)
            || contact.phoneNumber.toUpperCase().includes(searchingString))

    res.send(contactToShow);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(contact => contact.id !== id);

    res.send({
        success: true,
        message: null
    })
});

router.post("/api/contacts/", function (req, res) {
    const contact = {
        name: req.body.name,
        surname: req.body.name,
        phoneNumber: req.body.phoneNumber
    }
    if (!contact.name) {
        res.send({
            success: false,
            message: "Поле 'имя' обязательно"
        });
        return;
    }

    if (!contact.surname) {
        res.send({
            success: false,
            message: "Поле 'фамилия' обязательно"
        });
        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            success: false,
            message: "Поле 'номер телефона' обязательно"
        });
        return;
    }

    const upperCasePhoneNumber = contact.phoneNumber.toUpperCase();

    if (contacts.some(c => c.phoneNumber.toUpperCase() === upperCasePhoneNumber)) {
        res.send({
            success: false,
            message: "Поле 'номер телефона' должно быть уникальным"
        });
        return;
    }

    contact.id = ++contactId;
    contacts.push(contact);
});

module.exports = router;
