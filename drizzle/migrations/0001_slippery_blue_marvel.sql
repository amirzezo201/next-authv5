CREATE TABLE IF NOT EXISTS "ResetPasswordToken" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ResetPasswordToken_token_key" ON "ResetPasswordToken" USING btree (token);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ResetPasswordToken_email_token_key" ON "ResetPasswordToken" USING btree (email,token);