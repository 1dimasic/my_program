(() => {
    'use strict';

    const forms = document.querySelector('.needs-validation');

    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    }, false)
})()