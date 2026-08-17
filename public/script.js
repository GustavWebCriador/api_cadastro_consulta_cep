const cepInput = document.getElementById("cep");
const cepStatus = document.getElementById("cepStatus");
const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const btnCadastrar = document.getElementById("btnCadastrar");

const camposEndereco = {
    logradouro: document.getElementById("logradouro"),
    bairro: document.getElementById("bairro"),
    cidade: document.getElementById("cidade"),
    estado: document.getElementById("estado")
};

// Máscara de CEP
cepInput.addEventListener("input", (event) => {

    let cep = event.target.value.replace(/\D/g, "");

    if (cep.length > 5) {
        cep = cep.substring(0, 5) + "-" + cep.substring(5, 8);
    }

    event.target.value = cep;
});

// Consulta quando o usuário termina de digitar o CEP
cepInput.addEventListener("blur", consultarCep);

async function consultarCep() {

    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        limparEndereco();
        return;
    }

    cepStatus.textContent = "Consultando...";
    cepStatus.style.color = "#64748b";

    try {

        const response = await fetch(`/api/cep/${cep}`);

        const data = await response.json();

        if (!response.ok || data.erro) {
            throw new Error(data.mensagem || "CEP não encontrado.");
        }

        preencherEndereco(data);

        cepStatus.textContent = "✓";
        cepStatus.style.color = "#16a34a";

    } catch (error) {

        limparEndereco();

        cepStatus.textContent = "✕";
        cepStatus.style.color = "#dc2626";

        mostrarMensagem(error.message, "erro");
    }
}

function preencherEndereco(data) {

    camposEndereco.logradouro.value = data.street || "";
    camposEndereco.bairro.value = data.neighborhood || "";
    camposEndereco.cidade.value = data.city || "";
    camposEndereco.estado.value = data.state || "";
}

function limparEndereco() {

    camposEndereco.logradouro.value = "";
    camposEndereco.bairro.value = "";
    camposEndereco.cidade.value = "";
    camposEndereco.estado.value = "";

    cepStatus.textContent = "";
}

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function limparMensagem() {

    mensagem.textContent = "";
    mensagem.className = "mensagem";
}

// Envio do cadastro
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    limparMensagem();

    const dados = Object.fromEntries(
        new FormData(form).entries()
    );

    btnCadastrar.disabled = true;
    btnCadastrar.textContent = "Cadastrando...";

    try {

        const response = await fetch("/api/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (!response.ok) {
            throw new Error(
                resultado.mensagem || "Erro ao realizar cadastro."
            );
        }

        mostrarMensagem(
            resultado.mensagem,
            "sucesso"
        );

        form.reset();
        limparEndereco();

    } catch (error) {

        mostrarMensagem(
            error.message,
            "erro"
        );

    } finally {

        btnCadastrar.disabled = false;
        btnCadastrar.textContent = "Cadastrar";
    }
});