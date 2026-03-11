"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Review } from "@/types/database";
import { formatRating } from "@/lib/format";
import { ReviewCard } from "./review-card";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
}

const INITIAL_VISIBLE = 3;

function SummaryStars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < filled
              ? "fill-yellow-400 text-yellow-400"
              : "fill-none text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ reviews, averageRating }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleReviews = showAll ? reviews : reviews.slice(0, INITIAL_VISIBLE);
  const hasMore = reviews.length > INITIAL_VISIBLE;

  return (
    <section id="reviews" className="flex flex-col gap-6">
      {/* Section heading */}
      <h2 className="text-xl font-semibold font-barlow">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <>
          {/* Summary bar */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold font-barlow leading-none">
              {formatRating(averageRating)}
            </span>
            <div className="flex flex-col gap-1">
              <SummaryStars rating={averageRating} />
              <span className="text-sm text-muted-foreground">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Review cards */}
          <div className="flex flex-col gap-4">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Show more / show less toggle */}
          {hasMore && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="self-start text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              {showAll
                ? "Show fewer reviews"
                : `Show all ${reviews.length} reviews`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
