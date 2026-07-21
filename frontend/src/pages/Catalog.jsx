import { Link } from "react-router-dom";

const categories = [
  {
    number: "01",
    title: "CVD Certified",
    description:
      "Certified diamonds with grading reports and detailed specifications.",
    slug: "cvd-certified",
  },
  {
    number: "02",
    title: "CVD Non Certified",
    description:
      "High-quality diamonds without certification, suitable for various applications.",
    slug: "cvd-non-certified",
  },
  {
    number: "03",
    title: "Wholesale Melee",
    description:
      "Bulk melee diamonds for jewellery manufacturing and large-volume requirements.",
    slug: "wholesale-melee",
  },
];

export default function Catalog() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111827] py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="container-custom relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Inventory Portal
            </p>

            <h1 className="mb-5 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Browse available
              <br />
              inventory categories
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              Access inventory listings, specifications, and trade availability.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="overflow-hidden rounded-2xl border border-[--border]">
            <div className="grid divide-x divide-[--border] md:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/catalog/${category.slug}`}
                  className="group relative bg-white p-9 transition hover:bg-neutral-50"
                >
                  <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                    Category {category.number}
                  </p>

                  <h3 className="mb-2 text-lg font-bold text-[#111827]">
                    {category.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#6b7280]">
                    {category.description}
                  </p>

                  <span className="absolute bottom-6 right-6 text-neutral-300 transition-all group-hover:text-[#111827]">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}