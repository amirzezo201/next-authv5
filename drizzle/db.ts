import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { neon } from "@neondatabase/serverless";
const client = neon(
  "postgresql://auth_owner:Z2tEKrOw7qiT@ep-morning-butterfly-a21d6oiw-pooler.eu-central-1.aws.neon.tech/auth?sslmode=require"
);
export const db = drizzle(client, { schema, logger: true });
