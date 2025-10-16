import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(express.json());

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 100,
	message: {
		status: "error",
		message: "Too many requests. Please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);
const user = {
	email: "divineamunega@gmail.com",
	name: "Divine Amunega",
	stack: "Node.js/Express",
};

const getUTCTimeStamp = () => new Date().toISOString();

const fetchCatFact = async () => {
	const ErrMSG = "An error was encountered while getting cat facts";
	try {
		const res = await axios.get("https://catfact.ninja/fact", {
			timeout: 5000,
		});
		if (!res.data?.fact) throw new Error(ErrMSG);
		return res.data.fact;
	} catch (err) {
		throw new Error(err.code === "ECONNABORTED" ? "Request timed out" : ErrMSG);
	}
};

app.get("/me", async (req, res) => {
	try {
		const fact = await fetchCatFact();
		const timestamp = getUTCTimeStamp();

		res.status(200).json({
			status: "success",
			user,
			timestamp,
			fact,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message:
				err.message || "Failed to fetch cat fact. Please try again later.",
		});
	}
});

app.get("/", (req, res) => {
	res.json({ message: "Backend Stage 0 API running" });
});

export default app;
