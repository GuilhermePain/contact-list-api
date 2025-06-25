import { configDotenv } from "dotenv"
configDotenv();

export const jwtConstants = {
    jwtSecretKey: process.env.JWT_SECRET_KEY
}