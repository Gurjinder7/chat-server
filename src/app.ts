import express from "express";
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import db from './db/index.ts'
import {createDatabase} from "./db/migrations/createDatabase.ts";
import api from './api/routes/routes.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// console.log(process.env)
console.log("Directory: ",__dirname)
console.log("Server: ", __filename)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+ "/views"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
})

app.get("/contact", (req, res) => {
    res.sendFile("contact.html");
})

app.use("/api/", api);


app.listen(3000, () => {
    migrate().then(() => {
        console.log("DB created");
    }).catch((err) => {
        console.error('ERROR_2',err);
    })
    console.log("Server running on port 3000");
});

const migrate = async () => {
    await createDatabase()
}

