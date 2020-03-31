

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
            console.log(inputErrors);
        });
    }




    /// PREGUNTAR ESTA VALIDACIÓN !VERRRRRRR
    if (input.name === "profile_picture") {
        input.addEventListener("blur", function () {
            // array de extensiones permitidas
            let validateExt = ["jpg", "png", "gif", "svg"]
            // levanto la extensión para saber la extensión que quiere subir. 
            let file = this.value.split(".").pop();
            console.log(file)
            let validateFile = validateExt.includes(file)
            console.log(validateFile)

            if (!validateFile) {
                this.classList.add("error")
                this.nextElementSibling.innerHTML = `La extension <b>${file}</b> no está permitida`
            }

        })
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
    // valida que las contraseñas de los campos sean iguales. 
    let inputValue = pass.value;
    let inputValue2 = rpass.value;
    console.log (inputValue, inputValue2)
    // if (validator.isEmpty(inputValue, {ignore_whitespace: true }) != validator.isEmpty(inputValue2, { ignore_whitespace: true })) {
    if (inputValue != inputValue2 && !validator.isEmpty(inputValue) && !validator.isEmpty(inputValue2) ) { 
    // si no son iguales muetra un error genérico
        document.querySelector("#feedbackForm").innerHTML = "hola"
        document.querySelector("#feedbackForm").classList.add("block")
    } else {
        // si son iguales saca el error
        document.querySelector("#feedbackForm").innerHTML = ``
        document.querySelector("#feedbackForm").classList.remove("block")
    }

    console.log(inputError)
    if (Object.keys(inputError).length > 0) {
        event.preventDefault();
    }
})


