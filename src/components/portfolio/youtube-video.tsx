import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function YouTubeVideo({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  useEffect(() => {
    setLoaded(false);
  }, [videoId]);

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] bg-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-slate-950/40">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 text-center text-sm text-muted-foreground">
            <div className="space-y-3 px-6">
              <div className="h-3 w-24 animate-pulse rounded-full bg-surface-2" />
              <div className="h-3 w-32 animate-pulse rounded-full bg-surface-2" />
              <div className="mx-auto mt-4 h-10 w-10 rounded-full border border-border bg-transparent" />
            </div>
          </div>
        )}
        <iframe
          title={title}
          width="560"
          height="315"
          src={src}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
