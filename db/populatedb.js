import "dotenv/config";
import { Client } from "pg";

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString:process.env.DATABASE_URL,
    });
    try{
        await client.connect();
        await client.query("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,firstname VARCHAR(255),lastname VARCHAR(255),username VARCHAR(255) UNIQUE NOT NULL ,password VARCHAR(255) NOT NULL , ismember BOOLEAN NOT NULL DEFAULT FALSE, isadmin BOOLEAN NOT NULL DEFAULT FALSE);");
        await client.query("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,title VARCHAR(255),text TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), userid INTEGER REFERENCES users(id));");
        console.log("Done.");
    }
    catch(err) {
        console.error("Database setup failed:", err);
    }
    finally{
        await client.end();
    }
}
main();