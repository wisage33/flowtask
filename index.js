import express from "express"

const app = express()
const port = 5000

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile("public/index.html", { root: __dirname })
})

app.listen(port, () => console.log("Server listen at http://localhost:5000"))
