import { AtpAgent, RichText } from "@atproto/api";


const storageKeys = {
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

//the AtpAgent cannot be created on the server, so we need to check if we are on the server or not
let atp: AtpAgent | null = null

export function getAgent()  {
  if(atp || !isOnServer) return atp
  atp = new AtpAgent({
    service: "",
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
  });
  return atp
}

// export const bsky = atp.api.app.bsky;

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