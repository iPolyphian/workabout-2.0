import type { Property, Review, Photo } from "@/types/database";
import { properties } from "@/data/fixtures";
import { reviews } from "@/data/fixtures";
import { photos } from "@/data/fixtures";

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getReviewsForProperty(propertyId: string): Review[] {
  return reviews
    .filter((r) => r.propertyId === propertyId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getPhotosForProperty(propertyId: string): Photo[] {
  return photos
    .filter((p) => p.propertyId === propertyId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
