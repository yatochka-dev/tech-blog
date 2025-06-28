import type { CollectionConfig } from "payload";
import { z } from "zod";
import { isSudo, isSudoF } from "~/access/sudo";
import payload from "~/data-access";
import { revalidateTag } from "next/cache";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "username",
  },
  auth: true,
  access: {
    create: isSudo,
    admin: ({ req }) => {
      return !!req.user?.isAdmin || isSudoF({ req });
    },
    unlock: isSudo,
  },
  hooks: {
    afterChange: [
      async (args) => {
        // if the user for example changes their pfp or their name -> we have to display that
        const id: number = (args.doc as { id: number }).id;
        const p = await payload();
        const { docs } = await p.find({
          collection: "posts",
          where: {
            author: { equals: id },
          },
          select: { slug: true }, // I need only ID, but it doesn't let me do that, so Im getting the slug as well
        });

        for (const post of docs) {
          revalidateTag(`POST-${post.id}`);
        }
      },
    ],
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      access: {
        update: () => false,
        create: () => true,
        read: () => true,
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      defaultValue: "Stealthy User",
      admin: {
        position: "sidebar",
      },
    },

    {
      name: "username",
      type: "text",
      required: true,
      defaultValue: "stealthyuser",
      minLength: 3,
      maxLength: 50,
      unique: true,
      admin: {
        position: "sidebar",
      },
      validate: (value: unknown) => {
        console.log(value);
        // only lowecase letter, _, - and numbers
        const schema = z.string();

        const { success, error } = schema.safeParse(JSON.stringify(value));
        console.log(success);

        if (!success) {
          return error?.issues[0]?.message ?? "Invalid username";
        }

        return true;
      },
    },

    {
      name: "isAdmin",
      type: "checkbox",
      saveToJWT: true,
      defaultValue: false,
      required: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: isSudoF,
        create: isSudoF,
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};
