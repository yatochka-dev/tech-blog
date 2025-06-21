import sharp from "sharp";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { env } from "~/env";
import { AppConfig } from "~/globals/appConfig";
import { Users } from "~/collections/User";
import { Media } from "~/collections/Media";
import { s3Storage } from "@payloadcms/storage-s3";
import { Posts } from "~/collections/Post";
import { editor } from "./editor";
import { Comment } from "~/collections/Comment";
import { PostTag } from "~/collections/PostTag";

const r2 = s3Storage({
  collections: {
    media: true,
  },
  config: {
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
    endpoint: env.R2_URL,
    region: "auto",
  },
  bucket: env.R2_BUCKET,
});

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: editor,
  plugins: [r2],
  admin: {
    meta: {},
    user: Users.slug,
  },
  // Define and configure your collections in this array
  collections: [Users, Media, Posts, Comment, PostTag],
  globals: [AppConfig],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: env.PAYLOAD_SECRET,
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
