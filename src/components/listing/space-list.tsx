import type { Space } from "@/types/database";
import { SpaceCard } from "./space-card";

interface SpaceListProps {
  spaces: Space[];
}

export function SpaceList({ spaces }: SpaceListProps) {
  return (
    <section>
      <h2 className="font-semibold text-xl font-barlow mb-4">
        Available Spaces
        <span className="ml-2 text-base font-normal text-muted-foreground">
          ({spaces.length})
        </span>
      </h2>

      {spaces.length === 0 ? (
        <p className="text-sm text-muted-foreground">No spaces available.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {spaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </section>
  );
}
