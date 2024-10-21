import SkeletonCard from "@/components/skeleton-card";

export default function Loading() {
  return (
    <section className="grid grid-cols-3 gap-8">
      {"abcedfghi".split("").map((i) => (
        <SkeletonCard key={i} />
      ))}
    </section>
  );
}
