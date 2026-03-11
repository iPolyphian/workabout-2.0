import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getPropertyById, getReviewsForProperty, getPhotosForProperty } from "@/lib/property";
import { getSpacesForProperty, getAmenitiesForProperty, getLowestPrice } from "@/lib/search";
import { ListingPage } from "@/components/listing/listing-page";

interface ListingDetailPageProps {
  params: Promise<{ propertyId: string }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { propertyId } = await params;
  const property = getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  const photos = getPhotosForProperty(propertyId);
  const spaces = getSpacesForProperty(propertyId);
  const amenities = getAmenitiesForProperty(propertyId);
  const reviews = getReviewsForProperty(propertyId);
  const lowestPrice = getLowestPrice(propertyId);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
          Back to search
        </Link>
      </div>

      <ListingPage
        property={property}
        photos={photos}
        spaces={spaces}
        amenities={amenities}
        reviews={reviews}
        lowestPrice={lowestPrice}
      />
    </div>
  );
}
