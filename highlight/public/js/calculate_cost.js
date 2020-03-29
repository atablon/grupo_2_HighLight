console.log("cargó")
        



window.addEventListener("load", function () {
    let timeCost = document.querySelector("#timeCost");
    timeCost.addEventListener("change", function (e) {
        e.preventDefault()
        // if (timeCost.value == "2 mes") {
        //     console.log("2")
        // }
        // // ifelse (timeCost.value == "3 mes") {
        // //     console.log("3")
        // // } else {
        // //     console.log("1")
        // // }
        console.log(timeCost.value)
        let costRent = costRent.value
    
        switch (timeCost.value ) {
            case "1 mes":
                
                console.log(costRent.value)
                break;
            case "2 mes":
                console.log("2")        
                break;
            case "3 mes":
                console.log("3")
                break;
            }
       
    })

})

     