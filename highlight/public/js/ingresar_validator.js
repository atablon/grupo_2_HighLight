
// Levantamos toda la informacion del form. 
let form = document.querySelector("#publishForm");


// Convertimos en array los campos del formulario - con el pop sacamos el input submit que no tenemos que valdiar. 
let allInput = Array.from(form.elements)
allInput.pop()


// Guardamos los campos con error en este objeto. 
let inputError = {};

// Comemzamos a validar los campos del formulario

allInput.forEach(input => {
    // agregamos el evento
    input.addEventListener("blur", function () {
        // capturamos el valor del campo
        let valueInput = this.value;

        // nos fijamos si el valor del campo esta vacio
        if (validator.isEmpty(valueInput, { ignore_whitespace: true })) {
            // cuando esta imcompleto muestro el error
            this.classList.add("error")
            this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.type}</b> no puede estar vacío`
        } else {
            // cuando completa el campo remuevo todo.
            this.classList.remove("error")
            this.nextElementSibling.innerHTML = ``
            delete inputError[input.name];

        }

    })

    // Validando el campo email de manera particular
    if (input.name === 'email') {
        // Cuando salimos del campo
        input.addEventListener('blur', function () {
            // Capturamos el valor del campo
            let inputValue = this.value;

            // Si NO está vacío y si el campo NO es un formato de email válido
            if (!validator.isEmpty(inputValue) && !validator.isEmail(inputValue)) {
                // Agrego la clase error al campo
                this.classList.add('error');
                // Mostramos el mensaje de error en el span con clase feedback
                this.nextElementSibling.innerHTML = `El <b>${this.dataset.type}</b> debe ser un formato de email válido`;
            }
            
        });
    }

})


// Validamos con el submit del boton al enviar la información. 

form.addEventListener('submit', function (event) {
    // verificamos SI hay campos vacíos
    for (const input of allInput) {
        let valueInput = input.value.trim();
        if (validator.isEmpty(valueInput)) {
            inputError[input.name] = true;
            /// esto tengo que revisarlo porque no anda con la img. !VERRRRRRR
            input.classList.add("error")
            input.nextElementSibling.innerHTML = `El campo <b>${input.dataset.type}</b> no puede estar vacío`

        }
    }
    if (Object.keys(inputError).length > 0) {
        event.preventDefault();
    }
})
