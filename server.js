// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch");

// const app = express();
// app.use(cors);
// app.use(express.json());


// app.post("/gerar", async (req, res) => {
//   const { prompt } = req.body;
//       console.log("bateu na rota");
//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=AIzaSyD_-nt8YG1IN7xRLuseEmmsOTffEXX278g",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: prompt }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     const texto = data.candidates[0].content.parts[0].text;

//     res.json({ resposta: texto });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ erro: "Deu ruim" });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Servidor funcionando");
// });

// app.listen(5000, () => {
//   console.log("Servidor rodando em http://localhost:3000");
// });





const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();



app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const apiKey = process.env.APIKEY;
// app.post("/gerar", (req, res) => {
//   console.log("chegou no backend");
//   console.log(req.body);

//   res.json({ resposta: "backend funcionando" });
// });

// app.post("/gerar", (req, res) => {
//   console.log("chegou:", req.body);

//   res.json({ resposta: "ok chegou" });
// });


app.post("/gerar", async (req, res) => {
  const { prompt } = req.body;

  console.log("prompt:", prompt);

  try {
//     const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD_-nt8YG1IN7xRLuseEmmsOTffEXX278g",
//  {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [{ text: prompt }]
//           }
//         ]
//       })
//     });
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${apiKey}` 
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  })
});

const data = await response.json();

// console.log("resposta bruta:", data);

    console.log("status:", response.status);

    
    const texto = data.choices[0].message.content;
    res.json({ resposta: texto });

  } catch (erro) {
    console.error("erro:", erro);
    res.status(500).json({ erro: "deu ruim" });
  }
});

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log("rodando na 5000");
});







