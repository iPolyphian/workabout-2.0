"use client";

interface MapPinProps {
  price: string; // formatted GBP string like "35"
  isHighlighted?: boolean;
}

export default function MapPin({ price, isHighlighted = false }: MapPinProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer select-none">
      <div
        className={[
          "px-2 py-1 rounded-full text-xs font-semibold shadow-md transition-transform hover:scale-110",
          isHighlighted
            ? "bg-indigo-700 text-white"
            : "bg-white text-slate-800",
        ].join(" ")}
        style={{ whiteSpace: "nowrap" }}
      >
        £{price}
      </div>
      {/* Downward-pointing triangle arrow */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: isHighlighted
            ? "6px solid #3730a3" /* indigo-700 */
            : "6px solid white",
          marginTop: -1,
          filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))",
        }}
      />
    </div>
  );
}

export type { MapPinProps };
