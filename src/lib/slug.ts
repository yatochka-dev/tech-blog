import type { TDatabaseClient } from "~/server/db";

function customSlugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function postSlugExists(slug: string, db: TDatabaseClient): Promise<boolean> {
  return (await db.post.findFirst({ where: { slug } })) !== null;
}

export async function createUniqueSlug(db: TDatabaseClient, title: string, existingSlug?: string | null): Promise<string> {
  let slug = existingSlug ?? customSlugify(title);
  if (existingSlug && !(await postSlugExists(slug, db))) {
    return slug;
  }
  let tries = 0;
  while (await postSlugExists(slug, db)) {
    if (tries >= 5) {
      throw new Error(`Could not generate a unique slug for ${title}`);
    }
    slug = `${slug}-${Math.floor(Math.random() * 100)}`;
    tries++;
  }
  return slug;
}