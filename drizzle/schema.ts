import {
  pgTable,
  pgSchema,
  AnyPgColumn,
  serial,
  text,
  varchar,
  timestamp,
  uniqueIndex,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
// Define the User table
export const User = pgTable(
  "User",
  {
    id: uuid("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { precision: 3 }),
    password: text("password"),
    image: text("image"),
  },
  (user) => ({
    emailKey: uniqueIndex("User_email_key").on(user.email),
  })
);

// Define the VerificationToken table
export const VerificationToken = pgTable(
  "VerificationToken",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3 }).notNull(),
  },
  (verificationToken) => ({
    tokenKey: uniqueIndex("VerificationToken_token_key").on(
      verificationToken.token
    ),
    emailTokenKey: uniqueIndex("VerificationToken_email_token_key").on(
      verificationToken.email,
      verificationToken.token
    ),
  })
);
export const ResetPasswordToken = pgTable(
  "ResetPasswordToken",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3 }).notNull(),
  },
  (ResetPasswordToken) => ({
    tokenKey: uniqueIndex("ResetPasswordToken_token_key").on(
      ResetPasswordToken.token
    ),
    emailTokenKey: uniqueIndex("ResetPasswordToken_email_token_key").on(
      ResetPasswordToken.email,
      ResetPasswordToken.token
    ),
  })
);
