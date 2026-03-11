import type { Review } from "@/types/database";

export const reviews: Review[] = [
  {
    id: "review-001",
    bookingId: "booking-003",
    userId: "user-004",
    propertyId: "prop-003",
    rating: 5,
    comment:
      "Excellent space in a brilliant location. The lighting is perfect for focused work and the coffee is genuinely good. Will definitely be back.",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "review-002",
    bookingId: "booking-004",
    userId: "user-007",
    propertyId: "prop-003",
    rating: 5,
    comment:
      "Ideal for a design sprint. The studio has great energy and the colour-correct lighting made a real difference for our visual work. Seamless booking process.",
    createdAt: "2026-02-26T11:00:00Z",
    updatedAt: "2026-02-26T11:00:00Z",
  },
  {
    id: "review-003",
    bookingId: "booking-008",
    userId: "user-008",
    propertyId: "prop-007",
    rating: 5,
    comment:
      "Angel Workspace is my favourite spot in London. The team are incredibly friendly and the Wi-Fi is rock solid. The coffee from the corner cafe is a bonus.",
    createdAt: "2026-02-21T12:00:00Z",
    updatedAt: "2026-02-21T12:00:00Z",
  },
  {
    id: "review-004",
    bookingId: "booking-009",
    userId: "user-008",
    propertyId: "prop-007",
    rating: 4,
    comment:
      "The Nook worked perfectly for our user research sessions — private and quiet. Slight docking of a star because the air con was a bit noisy.",
    createdAt: "2026-02-21T12:05:00Z",
    updatedAt: "2026-02-21T12:05:00Z",
  },
  {
    id: "review-005",
    bookingId: "booking-001",
    userId: "user-003",
    propertyId: "prop-001",
    rating: 4,
    comment:
      "Shoreditch Hub is a great day out of the office. The vibe is creative and the desk setup is comfortable. A little loud in the afternoon but that's part of the charm.",
    createdAt: "2026-03-16T09:00:00Z",
    updatedAt: "2026-03-16T09:00:00Z",
  },
  {
    id: "review-006",
    bookingId: "booking-002",
    userId: "user-002",
    propertyId: "prop-001",
    rating: 5,
    comment:
      "The Boardroom is excellent — well-equipped, professional, and very easy to book. The Shoreditch location was great for our team coming from all directions.",
    createdAt: "2026-03-19T10:00:00Z",
    updatedAt: "2026-03-19T10:00:00Z",
  },
  {
    id: "review-007",
    bookingId: "booking-006",
    userId: "user-001",
    propertyId: "prop-004",
    rating: 4,
    comment:
      "Kings Cross Quarter is perfect for an off-site planning day. The Knowledge Suite is spacious and well-equipped. Roof terrace views are incredible.",
    createdAt: "2026-03-26T09:30:00Z",
    updatedAt: "2026-03-26T09:30:00Z",
  },
  {
    id: "review-008",
    bookingId: "booking-010",
    userId: "user-002",
    propertyId: "prop-002",
    rating: 4,
    comment:
      "Clerkenwell Works delivered everything we needed for our team off-site. The Vault is a genuinely special room. Manual booking process was slightly slow but staff were helpful.",
    createdAt: "2026-04-03T10:00:00Z",
    updatedAt: "2026-04-03T10:00:00Z",
  },
  {
    id: "review-009",
    bookingId: "booking-011",
    userId: "user-007",
    propertyId: "prop-003",
    rating: 3,
    comment:
      "The room itself is nice but the AV equipment was broken and no one flagged this in advance. A refund would have been appreciated. Dispute is still ongoing.",
    createdAt: "2026-03-06T14:00:00Z",
    updatedAt: "2026-03-06T14:00:00Z",
  },
  {
    id: "review-010",
    bookingId: "booking-005",
    userId: "user-003",
    propertyId: "prop-004",
    rating: 5,
    comment:
      "Quick pending booking resolved fast. The Platform Desk area is exactly what I needed — open, energetic, and great transport links via Kings Cross.",
    createdAt: "2026-03-21T09:00:00Z",
    updatedAt: "2026-03-21T09:00:00Z",
  },
];
