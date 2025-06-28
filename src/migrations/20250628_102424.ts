import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_comments_fk";
  
  DROP INDEX IF EXISTS "posts_rels_comments_id_idx";
  ALTER TABLE "users" ALTER COLUMN "avatar_id" SET NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "status" SET NOT NULL;
  ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "comments_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "avatar_id" DROP NOT NULL;
  ALTER TABLE "posts" ALTER COLUMN "status" DROP NOT NULL;
  ALTER TABLE "posts_rels" ADD COLUMN "comments_id" integer;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "posts_rels_comments_id_idx" ON "posts_rels" USING btree ("comments_id");`)
}
