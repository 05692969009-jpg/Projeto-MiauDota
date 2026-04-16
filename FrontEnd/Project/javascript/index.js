

const adotar = document.querySelector(".buttonA")
const modal = document.querySelector("dialog")
const fecharPop = document.querySelector(".fechadorDeModal")


function abrirModal(foto_principal, nome, descricao, idade, sexo, vacinado, castrado, raca) {
    document.querySelector(".modal-img").src = foto_principal
    document.querySelector(".modal-titulo").innerHTML = nome
    document.querySelector(".desc").innerHTML = descricao
    document.querySelector(".idade").innerHTML = idade
    document.querySelector(".sexo").innerHTML = sexo
    document.querySelector(".vacinado").innerHTML = vacinado
    document.querySelector(".castrado").innerHTML = castrado
    document.querySelector(".raca").innerHTML = raca

    document.querySelector(".modal_gatos").style.display = "block"
  
}

function fechadorDeModal(){
    document.querySelector(".modal_gatos").style.display = "none"
}

// fecharPop.onclick = function(){
//     modal.close()
// }

async function carregarGatos() {
    const response = await fetch('http://localhost:3000/gatos')
    const data = await response.json()
    const select = document.getElementById("cards")
    console.log(select);

    // select.innerHTML = data.map(g => `<h2> =${g.nome}</h2> <dialog><p class="raca">=${g.raca}</p></dialog>,
    //  <h4>=${g.idade}</h4> <dialog><p>=${g.descricao}</p></dialog>, <dialog><p class="sexo">=${g.sexo}</p></dialog>,
    //  <dialog><img class="modal-img"=${g.foto_principal}>,<dialog><p class="vacinado">=${g.vacinado}</p></dialog>, <dialog><p class="castrado">= ${g.castrado}</p></dialog>`
    // ).join("")
    console.log(data);

    select.innerHTML = data.map(g => `
                        <div class="card">
                    <img src="${g.foto_principal}" alt="gato filhote tricolor">
                    <h2>${g.nome}</h2>
                    <h4>${g.idade}</h4>
                    <p class="stats"><i class="bi bi-patch-check"></i>${g.vacinado}</p>
                    <p class="stats"><i class="bi bi-patch-check"></i>${g.castrado}</p>
                    <a class="buttonA" onclick="abrirModal('${g.foto_principal}','${g.nome}','${g.descricao}','${g.foto_principal}', '${g.idade}', '${g.sexo}', '${g.vacinado}', '${g.castrado}', '${g.raca}')" >Quero Adotar</a>
                    </div>
                    <div class ="modal_gatos">
                        <img src="${g.foto_principal}" alt="" class="modal-img">
                        <h1 class="modal-titulo">${g.nome}</h1>
                        <p class="desc">${g.descricao}</p>
                        <p class="idade">${g.idade}</p>
                        <p class="sexo">${g.sexo}</p>
                        <p class="vacinado">${g.vacinado}</p>
                        <p class="castrado">${g.castrado}</p>
                        <p class="raca">${g.raca}</p>
                        <button onclick="fechadorDeModal()">Fechar</button>
                    </div>
        `)

}
carregarGatos()



