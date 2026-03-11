// Enums
export type SpaceType =
  | "hot_desk"
  | "private_office"
  | "private_meeting_room"
  | "communal_space"
  | "event";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "disputed"
  | "no_show";

export type PropertyStatus = "draft" | "review" | "active" | "inactive" | "imported";

export type UserRole =
  | "provider"
  | "employer_admin"
  | "employer_manager"
  | "employee"
  | "individual"
  | "platform_admin";

export type PurchaseCategory = "meet" | "work";

export type BookingType = "instant" | "manual";

export type MemberRole = "admin" | "manager" | "employee";

export type ProviderStatus =
  | "applied"
  | "documents"
  | "review"
  | "approved"
  | "rejected";

export type PaymentEventType = "charge" | "refund" | "payout" | "fee";

export type SettlementStatus = "pending" | "processing" | "completed" | "failed";

// Core entities
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SpaceProvider {
  id: string;
  userId: string;
  companyName: string;
  companyNumber?: string;
  status: ProviderStatus;
  stripeAccountId?: string;
  commissionRate: number; // basis points (e.g., 1500 = 15%)
  createdAt: string;
  updatedAt: string;
}

export interface Organisation {
  id: string;
  name: string;
  domain?: string;
  logoUrl?: string;
  billingEmail: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  userId: string;
  organisationId: string;
  role: MemberRole;
  teamId?: string;
  tier?: number;
  isActive: boolean;
  createdAt: string;
}

export interface Team {
  id: string;
  organisationId: string;
  name: string;
  managerId?: string;
  createdAt: string;
}

export interface Property {
  id: string;
  providerId: string;
  name: string;
  description: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  latitude: number;
  longitude: number;
  status: PropertyStatus;
  coverImageUrl?: string;
  openingTime: string; // HH:mm
  closingTime: string; // HH:mm
  bookingType: BookingType;
  cancellationHours: number;
  averageRating?: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Space {
  id: string;
  propertyId: string;
  name: string;
  type: SpaceType;
  capacity: number;
  fullDayPrice: number; // pence
  halfDayPrice?: number; // pence
  hourlyPrice?: number; // pence
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category: string;
}

export interface Photo {
  id: string;
  propertyId: string;
  url: string;
  caption?: string;
  sortOrder: number;
  createdAt: string;
}

export interface FloorPlan {
  id: string;
  propertyId: string;
  name: string;
  imageUrl: string;
  floor: number;
  createdAt: string;
}

export interface FloorPlanMapping {
  id: string;
  floorPlanId: string;
  spaceId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Booking {
  id: string;
  userId: string;
  spaceId: string;
  propertyId: string;
  organisationId?: string;
  status: BookingStatus;
  date: string; // YYYY-MM-DD
  startTime?: string; // HH:mm (for hourly bookings)
  endTime?: string; // HH:mm
  isHalfDay: boolean;
  guestCount: number;
  totalPrice: number; // pence
  notes?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSlot {
  id: string;
  bookingId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number; // pence
}

export interface Purchase {
  id: string;
  bookingId: string;
  userId: string;
  amount: number; // pence
  currency: string;
  category: PurchaseCategory;
  stripePaymentIntentId?: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  createdAt: string;
}

export interface PlatformPurchase {
  id: string;
  purchaseId: string;
  platformFee: number; // pence
  providerAmount: number; // pence
  createdAt: string;
}

export interface PaymentEvent {
  id: string;
  purchaseId: string;
  type: PaymentEventType;
  amount: number; // pence
  stripeEventId?: string;
  createdAt: string;
}

export interface PlatformTransaction {
  id: string;
  type: "commission" | "refund" | "adjustment";
  amount: number; // pence
  referenceId: string;
  referenceType: string;
  createdAt: string;
}

export interface Settlement {
  id: string;
  providerId: string;
  amount: number; // pence
  status: SettlementStatus;
  periodStart: string;
  periodEnd: string;
  stripeTransferId?: string;
  processedAt?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  propertyId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  organisationId: string;
  totalAmount: number; // pence
  usedAmount: number; // pence
  periodStart: string;
  periodEnd: string;
  isActive: boolean;
  createdAt: string;
}

export interface BudgetTier {
  id: string;
  budgetId: string;
  tier: number; // 1, 2, or 3
  amount: number; // pence per person per period
  label: string;
  createdAt: string;
}

export interface BookingRestriction {
  id: string;
  organisationId: string;
  type:
    | "geofence"
    | "property_whitelist"
    | "space_type"
    | "time_window"
    | "approval_required";
  config: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
}

export interface ApprovalRule {
  id: string;
  organisationId: string;
  condition: string;
  approverRole: MemberRole;
  isActive: boolean;
  createdAt: string;
}

export interface ChannelIntegration {
  id: string;
  organisationId: string;
  type: "slack" | "teams" | "email";
  webhookUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface OrgBilling {
  id: string;
  organisationId: string;
  stripeCustomerId: string;
  plan: "free" | "pro" | "enterprise";
  billingCycleDay: number;
  createdAt: string;
}

export interface PaidModule {
  id: string;
  organisationId: string;
  module: "hq" | "analytics" | "api_access";
  isActive: boolean;
  activatedAt: string;
}
