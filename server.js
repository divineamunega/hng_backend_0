import app from "./app.js";
import { config } from "dotenv";

config({ path: ".env" });
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server is running on Port:${PORT}`);
});
