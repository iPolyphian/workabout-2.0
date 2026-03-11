import { Star } from "lucide-react";
import type { Review } from "@/types/database";

interface ReviewCardProps {
  review: Review;
}

function formatReviewDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function anonymiseUser(userId: string): string {
  const suffix = userId.slice(-3);
  return `User •••${suffix}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-3">
      {/* Top row: stars + date */}
      <div className="flex items-center justify-between gap-2">
        <StarRating rating={review.rating} />
        <span className="text-xs text-muted-foreground shrink-0">
          {formatReviewDate(review.createdAt)}
        </span>
      </div>

      {/* Comment */}
      {review.comment ? (
        <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
      ) : (
        <p className="text-sm text-muted-foreground italic">No comment left.</p>
      )}

      {/* Anonymised user */}
      <p className="text-xs text-muted-foreground">{anonymiseUser(review.userId)}</p>
    </div>
  );
}
