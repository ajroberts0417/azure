import React, { useEffect, useState } from "react"
import { InfiniteCards, Card, InfiniteCardsState, colors } from '@/components/Card'
import { useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { bsky } from "@/services/atp";
import { AppBskyFeedDefs } from "@atproto/api";

const Feed: React.FC = () =>{
    const [dragStart, setDragStart] = useState<InfiniteCardsState>({
        axis: null,
        animation: { x: 0, y: 0 }
      });
      const x = useMotionValue(0);
      const y = useMotionValue(0);
      const scale = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [1, .5, 1]);
      const shadowBlur = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, 25, 0]);
      const shadowOpacity = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, .2, 0]);
      const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;

      const [poasts, setPoasts] = useState<AppBskyFeedDefs.FeedViewPost[]>([])

      useEffect(() => {
        bsky.feed.getTimeline({
          limit: 30
        }).then(resp => setPoasts(resp.data.feed))
      }, [])

        
      return (
        <div className="flex min-h-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-forest">
          <div className="max-w-md max-h-screen overflow-y-scroll text-center relative">
            {poasts.map((poast, i) => {              
              return (
                <Card
                  key={poast.post.cid}
                  card={{ text: poast.post.record['text'], background: colors[0] }}
                  style={{
                    zIndex: i,
                    // scale,
                    boxShadow,
                  }}
                />
              );
            })}
          </div>
        </div>
      );
}
export default Feed