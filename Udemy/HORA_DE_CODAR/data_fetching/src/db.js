import { PrismaClient } from "./generated/client";
import path from "path";

const dbPath = path.join(process.cwd(), "dev.db");

export const db = new PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`,
        },
    },
});