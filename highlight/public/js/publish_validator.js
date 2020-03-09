

// Levantamos toda la informacion del form. 
let form = document.querySelector("#publishForm");


// Convertimos en array los campos del formulario - con el pop sacamos el input submit que no tenemos que valdiar. 
let allInput = Array.from(form.elements)
allInput.pop()


let camposConError = {};

// Comemzamos a validar los campos del formulario

        allInput.forEach(input => {
            // agregamos el evento
            input.addEventListener("blur", function(){
                // capturamos el valor del campo
                    let valueInput = this.value;
                
                // nos fijamos si el valor del campo esta vacio
                if (validator.isEmpty(valueInput, {ignore_whitespace: true})){
                    // cuando esta imcompleto muestro el error
                    this.classList.add("error")
                    this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.type}</b> no puede estar vacío`
                } else {
                    // cuando completa el campo remuevo todo.
                    this.classList.remove("error")
                    this.nextElementSibling.innerHTML = ``

                }
            
            
            })
            // valido el campo de número séa correcto. 
            if (input.name === "street_number" || input.name === "heigth" || input.name === "width" || input.name === "monthly_cost" ) {
                input.addEventListener("blur", function () {
                    let valueInput = this.value;
                    // si el campo no es un numero
                    if (!validator.isEmpty(valueInput) && !validator.isNumeric(valueInput)) {
                        console.log ("error")
                        this.classList.add("error")
                        this.nextElementSibling.innerHTML = `El campo <b>${this.dataset.type}</b> es incorrecto`

                    } 
                })
            } 


            /// PREGUNTAR ESTA VALIDACIÓN !VERRRRRRR
            if (input.name === "picture_filename") {
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
            camposConError[input.name] = true;
            /// esto tengo que revisarlo porque no anda con la img. !VERRRRRRR
            //  input.classList.add("error")
            // input.nextElementSibling.innerHTML = `El campo <b>${input.dataset.type}</b> no puede estar vacío`

        }
    }

    if (Object.keys(camposConError).length > 0) {
        event.preventDefault();
    }
})


