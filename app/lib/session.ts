import { cookies } from "next/headers";

export function getSession<T>(): T | null {
  const session = cookies().get("session");
  if (!session) return null;

  return JSON.parse(session.value);
}

export function clearSession() {
  cookies().set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    path: "*"
  });
}

export function setSession(data: string | Record<string, unknown>) {
  const sessionData = typeof data === "string" ? data : JSON.stringify(data);

  cookies().set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "*"
  });
}

export function deleteSession() {
  cookies().delete("session");
}
