import { googleAuth } from "@/app/helpers/googleAuth";
import { deleteSession, getSession } from "@/app/lib/session";
import type { IAuthSession } from "@/app/helpers/types";

export async function GET(request: Request) {
  const oauth2Client = googleAuth();
  const session = getSession<IAuthSession>();

  if (session) {
    oauth2Client.revokeCredentials();
    deleteSession();
  }

  return Response.redirect(new URL("/", request.url));
}
