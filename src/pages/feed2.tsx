import { bsky } from "@/services/atp";
import { AppBskyFeedDefs } from "@atproto/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Feed2() {
  const [currentPoastIndex, setCurrentPoastIndex] = useState(0);

  const [poasts, setPoasts] = useState<AppBskyFeedDefs.FeedViewPost[]>([]);

  const currentPoast = poasts[currentPoastIndex];

  useEffect(() => {
    bsky.feed
      .getTimeline({
        limit: 30,
      })
      .then((resp) => setPoasts(resp.data.feed));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPoastIndex === poasts.length - 1) {
        return setCurrentPoastIndex(0);
      } else {
        return setCurrentPoastIndex(currentPoastIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPoastIndex, poasts]);

  return (
    <div className="flex min-h-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-forest">



      <motion.div
        key={currentPoast?.post.cid}
        // transition={{ duration: 1, ease: "easeIn" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center w-full max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-t text-lg text-gray-200"
      >
        {currentPoast?.post.record["text"]}
      </motion.div>
      {/* <div className="bg-orange-300 w-full max-w-sm rounded-b p-4 flex flex-col">
          <button className="text-lg bg-orange-100 p-2 rounded">
            Next Poast
          </button>
        </div> */}
    </div>
  );
}
