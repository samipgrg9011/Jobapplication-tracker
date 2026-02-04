import { auth } from "@/lib/auth/auth"; // path to your auth file
// console.log("Imported auth:", !!auth, auth);
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);