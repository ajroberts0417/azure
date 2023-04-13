import { BskyAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api'

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

// export const agent = new BskyAgent({
//     service: "https://bsky.social",
//     persistSession: (e, session) => {
//       switch (e) {
//         case "create":
//         case "update":
//           localStorage.setItem(storageKeys.session.$, JSON.stringify(session));
//           break;
//         case "expired":
//         case "create-failed":
//           localStorage.removeItem(storageKeys.session.$);
//           break;
//       }
//     },
// })

// await agent.login({identifier: 'alice@mail.com', password: 'hunter2'})
// await agent.resumeSession(savedSessionData)
// await agent.createAccount({
//   email: 'alice@mail.com',
//   password: 'hunter2',
//   handle: 'alice.example.com'
// })