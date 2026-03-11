interface PagePlaceholderProps {
  title: string;
  description: string;
  featureNumber?: number;
}

export function PagePlaceholder({ title, description, featureNumber }: PagePlaceholderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-lg border border-dashed border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {featureNumber ? `Coming in Feature ${featureNumber}` : "Coming soon"}
          </p>
        </div>
      </div>
    </div>
  );
}
