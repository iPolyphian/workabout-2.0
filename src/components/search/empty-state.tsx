"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <SearchX size={48} className="text-muted-foreground/40" />
      <p className="text-lg font-medium">No workspaces match your filters</p>
      <p className="text-sm text-muted-foreground">
        Try widening your search or clearing some filters
      </p>
      {onClearFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
