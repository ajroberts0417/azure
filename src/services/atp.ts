import { AtpAgent, RichText } from "@atproto/api";


export const storageKeys = {
  session: {
    $: "session",
  },
  config: {
    theme: {
      $: "theme",
    },
    tlFilters: {
      reply: {
        $: "tlFilterReply",
      },
      repost: {
        $: "tlFilterRepost",
      },
    },
  },
};


const isOnServer = typeof window === "undefined"

// atp keeps crashing due to broken schema definition, apparently.
// I'm not sure if it's a bug in atp or if it just doesn't work on the server.
// so we're only going to initialize it on the client, not the server.

export const atp = new AtpAgent({
  service: "https://bsky.social",
  persistSession: (e, session) => {
    switch (e) {
      case "create":
      case "update":
        localStorage.setItem(storageKeys.session.$, JSON.stringify(session));
        break;
      case "expired":
      case "create-failed":
        localStorage.removeItem(storageKeys.session.$);
        break;
    }
  },
})

export const bsky = atp.api.app.bsky;

export function isRichTextValid(rt: RichText) {
  return rt.length <= 3000 && rt.graphemeLength <= 300;
}

export function isPostValid(rt: RichText, imageLen: number) {
  return isRichTextValid(rt) && (rt.graphemeLength > 0 || imageLen > 0);
}

export type AtpError = {
  error: "NotFound";
  message: string;
};

export function isAtpError(err: unknown): err is AtpError {
  if (typeof err !== "object" || err === null) return false;
  return "error" in err && "message" in err;
}