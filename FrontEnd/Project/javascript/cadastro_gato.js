const API_URL = "http://localhost:3000";

const formGato = document.getElementById("formGato");

formGato.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome_gato").value;
    const raca = document.getElementById("raca").value;
    const sexo = document.getElementById("sexo").value;
    const idade = document.getElementById("idade").value;
    const porte = document.getElementById("porte").value;
    const descricao = document.getElementById("descricao").value;
    const foto_principal = document.getElementById("foto_principal").value;
    const vacinado = document.getElementById("vacinado").checked;
    const id_usuario = document.getElementById("id_usuario").value;

    const gatoData = {
        nome,
        raca,
        sexo,
        idade,
        porte,
        descricao,
        foto_principal,
        vacinado: vacinado ? 1 : 0,
        id_usuario: parseInt(id_usuario)
    };

    console.log("Enviando dados:", gatoData);

    try {
        const response = await fetch(`${API_URL}/gatos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Nota: O backend atualmente exige Token. 
                // Se não houver token, o cadastro falhará.
            },
            body: JSON.stringify(gatoData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Gato cadastrado com sucesso!");
            formGato.reset();
        } else {
            alert("Erro ao cadastrar: " + (result.error || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor.");
    }
});
