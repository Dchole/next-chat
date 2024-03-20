import { google } from "googleapis";
import { googleAuth } from "../helpers/googleAuth";
import { Contact } from "../database/schema/Contact";
import { setSession } from "../lib/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const oauth2Client = googleAuth();

  if (code) {
    const res = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(res.tokens);

    const { data } = await google
      .oauth2("v2")
      .userinfo.get({ auth: oauth2Client });

    const existingUser = await Contact.findOne({ google_id: data.id });

    let sessionUid = existingUser?._id;

    if (!existingUser) {
      const newContact = new Contact({
        name: data.given_name + " " + data.family_name || "",
        avatar: data.picture,
        google_id: data.id
      });

      await newContact.save();

      sessionUid = newContact._id;
    }

    setSession({ uid: sessionUid });
  }

  return Response.redirect(new URL("/", request.url));
}
