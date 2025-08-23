import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { configer } from "./config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, "../app")));
app.use(express.json());
// function handle_log_in_page (req : Request , res : Response) {
//     res.header({
//         "Content-Type" : "text/html"
//     })
//     res.status(200).sendFile(path.join(__dirname , "/login_page/index.html"));
// }
app.listen(configer.port, () => {
    console.log(`the server is know run on the ${configer.port}`);
});
