async function carregarGatos() {
    const response = await fetch('http://localhost:3000/gatos')
    const data = await response.json()
    const select = document.getElementById("mostrarGatos")
    select.innerHTML = data.map(g => `option value =${g.id} >${g.nome, g.raca, g.enum, g.idade, g.descricao, g.sexo,g.porte, g.foto_principal,g.cadastrado,g.vacinado,g.id_usuario}`
    ).join("")

}

document.getElementById("formAnimal").addEventListener("submit", async (g)=> {
    g.preventDefault()
    const nome = document.getElementById("nomeAnimal").value
    const raca = document.getElementById("racaAnimal").value
    const sexo = document.getElementById("sexoAnimal").value
    const idade = document.getElementById("faixaEtaria").value
    const foto_principal = document.getElementById("fotoAnimal").value
    const descricao = document.getElementById("descricao").value
    let vacinado = document.getElementById("animalVacinado").value
    let castrado = document.getElementById("animalCastrado").value

    if(vacinado == "false"){
        vacinado = false
    }else{
        vacinado = true
    }
    
    if(castrado == "false"){
        castrado = false
    } else{
        castrado = true
    }

   
        
    
    
    const response = await fetch("http://localhost:3000/gatos", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify( {nome, raca, idade, descricao, sexo, foto_principal, vacinado, castrado }
        )
    })
    
    
    if(response.ok){
        alert("gato cadastrado!")
        g.currentTarget.reset()
        carregarGatos()
    }
    else{
        alert("erro ao cadastrar gato, verifique as informações")
    }
    
})