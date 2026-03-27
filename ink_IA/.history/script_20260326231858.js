let objetivo = "";
let tipo = "";
let estilo = "";
let desc = "";

// Capturar valores dos selects
document.getElementById("objetivo").addEventListener("change", (e) => {
  objetivo = e.target.value;
});

document.getElementById("tipo").addEventListener("change", (e) => {
  tipo = e.target.value;
});

document.getElementById("estilo").addEventListener("change", (e) => {
  estilo = e.target.value;
});

// Capturar descrição
const descricao = document.getElementById("descricao");

descricao.addEventListener("input", () => {
  desc = descricao.value;
});

// Modal
function abrirModal(texto) {
  document.getElementById("conteudoResposta").innerText = texto;
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// Copiar texto
function copyText() {
  const textCopy = document.getElementById("conteudoResposta").innerText;

  navigator.clipboard.writeText(textCopy)
    .then(() => {
      alert("Text copied!");
    })
    .catch((err) => {
      console.log("Erro ao copiar", err);
    });
}

// Enviar prompt
function enviarPrompt() {
  const prompt = `Você é um especialista em marketing para tatuadores.

Crie uma legenda para Instagram com base EXCLUSIVAMENTE nas informações abaixo:

Descrição: ${desc}
Tipo: ${tipo}
Estilo: ${estilo}
Objetivo: ${objetivo}

REGRAS IMPORTANTES:
- NÃO invente elementos que não estão na descrição
- NÃO substitua palavras por sinônimos
- Use exatamente os conceitos fornecidos
- Seja fiel à descrição

A legenda deve:
- Ser envolvente e natural
- Incluir um CTA sutil

Inclua também:
- 10 hashtags relevantes

Formato:

Legenda:
CTA:
Hashtags:`;

  enviar(prompt);
}

// Chamada API
async function enviar(prompt) {
  const response = await fetch("https://ink-api-0mwz.onrender.com/gerar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt
    })
  });

  const data = await response.json();
  abrirModal(data.resposta);
}