import express from "express"
const app = express()
const port = 5000

app.get("/", (req, res) => {
  res.send("Hello from gitHub")
})

app.listen(port, () => console.log("Server listen at http://localhost:5000"))
