import type { SpaceType } from "@/types/database";

// Convert pence to formatted GBP string (whole pounds, no symbol): 3500 -> "35", 12000 -> "120"
export function formatPrice(pence: number): string {
  return String(Math.round(pence / 100));
}

const SPACE_TYPE_LABELS: Record<SpaceType, string> = {
  hot_desk: "Hot Desk",
  private_office: "Private Office",
  private_meeting_room: "Meeting Room",
  communal_space: "Communal Space",
  event: "Event Space",
};

// Convert SpaceType enum to display label
export function formatSpaceType(type: SpaceType): string {
  return SPACE_TYPE_LABELS[type];
}

// Format rating to 1 decimal place
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
