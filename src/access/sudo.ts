import type { User } from "payload-types";
import type { Access, FieldAccess } from "payload";
import { env } from "~/env";

export const isSudoF: FieldAccess<User> = ({ req }) => {
  const email = req.user?.email;

  if (!email) return false;

  const sudo_emails = env.SUDO_USERS;

  return sudo_emails.includes(email);
};

export const isSudo: Access<User> = ({ req }) => {
  const email = req.user?.email;

  if (!email) return false;

  const sudo_emails = env.SUDO_USERS;

  return sudo_emails.includes(email);
};
