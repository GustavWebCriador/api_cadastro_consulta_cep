const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;


// Permite receber dados em JSON
app.use(express.json());

// Permite acessar os arquivos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Caminho completo do arquivo de cadastros
const arquivoCadastros = path.join(
    __dirname,
    "cadastros.json"
);

// Cria o arquivo cadastros.json caso ele não exista
if (!fs.existsSync(arquivoCadastros)) {

    fs.writeFileSync(
        arquivoCadastros,
        "[]",
        "utf8"
    );

}



app.get("/api/cep/:cep", async (req, res) => {

    try {

        // Pega o CEP enviado na URL
        const cep = req.params.cep.replace(
            /\D/g,
            ""
        );

        // Verifica se possui 8 números
        if (cep.length !== 8) {

            return res.status(400).json({
                erro: true,
                mensagem: "CEP deve conter 8 dígitos."
            });

        }

        // Consulta a BrasilAPI
        const response = await fetch(
            `https://brasilapi.com.br/api/cep/v2/${cep}`
        );

        // Verifica se o CEP foi encontrado
        if (!response.ok) {

            return res.status(response.status).json({
                erro: true,
                mensagem: "CEP não encontrado."
            });

        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Envia os dados para o frontend
        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: true,
            mensagem: "Erro ao consultar o CEP."
        });

    }

});



app.post("/api/cadastro", (req, res) => {

    try {

        // Recebe os dados enviados pelo formulário
        const novoCadastro = req.body;

        // Lê o arquivo cadastros.json
        const conteudo = fs.readFileSync(
            arquivoCadastros,
            "utf8"
        );

        // Converte o JSON para um array
        const cadastros = JSON.parse(
            conteudo
        );

        // Cria um ID para o cadastro
        novoCadastro.id = Date.now();

        // Adiciona o novo cadastro
        cadastros.push(
            novoCadastro
        );

        // Salva os dados no arquivo JSON
        fs.writeFileSync(
            arquivoCadastros,
            JSON.stringify(
                cadastros,
                null,
                2
            ),
            "utf8"
        );

        // Responde ao frontend
        res.status(201).json({

            sucesso: true,

            mensagem:
                "Cadastro realizado com sucesso!",

            cadastro:
                novoCadastro

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            sucesso: false,

            mensagem:
                "Erro ao salvar o cadastro."

        });

    }

});


//Iniciar Servidor
app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});
