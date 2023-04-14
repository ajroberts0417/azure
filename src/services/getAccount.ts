import { AtpSessionData } from "@atproto/api";
import { atp, bsky, storageKeys } from "./atp";

export async function getAccount() {
  let session = atp.session;
  if (!session) {
    const sessionStr = localStorage.getItem(storageKeys.session.$);
    if (!sessionStr) return undefined;
    session = JSON.parse(sessionStr) as AtpSessionData;
    await atp.resumeSession(session);
  }
  const resp = await bsky.actor.getProfile({
    actor: session.handle,
  });
  return {
    profile: resp.data,
    session,
  };
}
