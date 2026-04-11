const API_URL = "http://localhost:3000";

const formGato = document.getElementById("formGato");

formGato.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Capturando os elementos com segurança
    const nomeEl = document.getElementById("nome_gato");
    const racaEl = document.getElementById("raca");
    const sexoEl = document.getElementById("sexo");
    const idadeEl = document.getElementById("idade");
    const porteEl = document.getElementById("porte");
    const descricaoEl = document.getElementById("descricao");
    const fotoEl = document.getElementById("foto_principal");
    const vacinadoEl = document.getElementById("vacinado");
    const idUsuarioEl = document.getElementById("id_usuario");

    // Validação básica se os campos existem (evita crash se o HTML mudar)
    if (!nomeEl || !racaEl || !sexoEl || !idadeEl || !porteEl || !descricaoEl) {
        console.error("Erro: Alguns campos obrigatórios não foram encontrados no HTML.");
        alert("Erro interno: O formulário está incompleto.");
        return;
    }

    // Para a foto, por enquanto estamos enviando uma string placeholder 
    // ou o nome do arquivo, já que o backend não lida com upload de arquivos binários ainda
    let fotoUrl = "img/gato.jpg"; // Placeholder padrão
    if (fotoEl && fotoEl.files && fotoEl.files[0]) {
        // Em um app real, aqui faríamos o upload para um servidor (S3, Cloudinary, etc)
        // Por ora, vamos apenas simular usando o nome do arquivo ou mantendo o padrão
        fotoUrl = "img/" + fotoEl.files[0].name;
    }

    // Tenta pegar o ID do usuário do localStorage (caso exista login) ou do campo oculto
    let id_usuario = 1; // Default para testes
    if (idUsuarioEl && idUsuarioEl.value) {
        id_usuario = parseInt(idUsuarioEl.value);
    } else if (localStorage.getItem("usuario_id")) {
        id_usuario = parseInt(localStorage.getItem("usuario_id"));
    }

    const gatoData = {
        nome: nomeEl.value,
        raca: racaEl.value,
        sexo: sexoEl.value,
        idade: idadeEl.value,
        porte: porteEl.value,
        descricao: descricaoEl.value,
        foto_principal: fotoUrl,
        vacinado: vacinadoEl ? (vacinadoEl.checked ? 1 : 0) : 0,
        id_usuario: id_usuario
    };

    console.log("Enviando dados para o servidor:", gatoData);

    try {
        const response = await fetch(`${API_URL}/gatos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                // Caso o backend exija token futuramente:
                // "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(gatoData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("✨ Gato cadastrado com sucesso!");
            formGato.reset();
            // Redirecionar para a home para ver o novo gato?
            // window.location.href = "index.html";
        } else {
            console.error("Erro do servidor:", result);
            alert("❌ Erro ao cadastrar: " + (result.error || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("❌ Erro ao conectar com o servidor. Verifique se o BackEnd está rodando.");
    }
});
