import { type AccessArgs } from "payload";

export default function admin(args: AccessArgs) {
  const isAdmin = args.req.user?.isAdmin;

  return isAdmin === true;
}
