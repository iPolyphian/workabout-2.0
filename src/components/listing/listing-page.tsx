"use client";

import type { Property, Space, Amenity, Review, Photo } from "@/types/database";
import { PhotoGallery } from "@/components/listing/photo-gallery";
import { PropertyHeader } from "@/components/listing/property-header";
import { AmenitiesGrid } from "@/components/listing/amenities-grid";
import { SpaceList } from "@/components/listing/space-list";
import { ReviewsSection } from "@/components/listing/reviews-section";
import { BookCta } from "@/components/listing/book-cta";

interface ListingPageProps {
  property: Property;
  photos: Photo[];
  spaces: Space[];
  amenities: Amenity[];
  reviews: Review[];
  lowestPrice: number | null;
}

export function ListingPage({
  property,
  photos,
  spaces,
  amenities,
  reviews,
  lowestPrice,
}: ListingPageProps) {
  const averageRating = property.averageRating ?? 0;
  const reviewCount = property.reviewCount ?? reviews.length;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Photo gallery */}
      {photos.length > 0 && (
        <PhotoGallery photos={photos} propertyName={property.name} />
      )}

      <div className="px-4 md:px-0 mt-6 space-y-10">
        {/* Property header */}
        <PropertyHeader
          property={property}
          reviewCount={reviewCount}
          averageRating={averageRating}
        />

        {/* Amenities */}
        {amenities.length > 0 && <AmenitiesGrid amenities={amenities} />}

        {/* Spaces */}
        <SpaceList spaces={spaces} />

        {/* Reviews */}
        <ReviewsSection reviews={reviews} averageRating={averageRating} />

        {/* Desktop Book CTA */}
        <div className="hidden md:block pb-8">
          <BookCta propertyName={property.name} lowestPrice={lowestPrice} />
        </div>
      </div>

      {/* Mobile sticky Book CTA */}
      <div className="md:hidden">
        <BookCta propertyName={property.name} lowestPrice={lowestPrice} />
      </div>
    </div>
  );
}
