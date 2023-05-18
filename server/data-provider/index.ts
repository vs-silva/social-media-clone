import { PrismaClient } from '@prisma/client';
import Settings from "../settings";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: Settings.dbConnectionString
        }
    }
});
export default prisma;
