import { PrismaClient } from '@prisma/client';
import Settings from "../settings";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: Settings.dbConnectionString as string
        }
    }
});
export default prisma;
