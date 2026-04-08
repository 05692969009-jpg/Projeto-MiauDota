const adotar = document.querySelector(".buttonA")
const modal = document.querySelector("dialog")
const fecharPop = document.querySelector("dialog button")


function abrirModal(titulo, desc,img){
    document.querySelector(".modal-img").src = img
    document.querySelector(".modal-titulo").innerHTML = titulo
    document.querySelector(".desc").innerHTML = desc

    modal.showModal()
}

fecharPop.onclick = function(){
    modal.close()
}


