import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.25}px)`;
      heroRef.current.style.opacity = `${Math.max(0.35, 1 - y / 650)}`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      num: "01",
      title: "CVD Certified",
      desc: "IGI-graded diamonds with full documentation. Ideal for retail and branded jewellery requiring certified provenance.",
      path: "/catalog/cvd-certified",
    },
    {
      num: "02",
      title: "CVD Non Certified",
      desc: "Premium CVD stones without grading reports — cost-efficient for manufacturers who handle grading in-house.",
      path: "/catalog/cvd-non-certified",
    },
    {
      num: "03",
      title: "Wholesale Melee",
      desc: "Precision-cut small stones in bulk for pavé, halo, and accent setting. Consistent sizing, competitive pricing.",
      path: "/catalog/wholesale-melee",
    },
  ];

  const features = [
    {
      title: "Verified quality",
      desc: "Every stone passes rigorous QC before dispatch. Certified lots can include full documentation.",
    },
    {
      title: "Trade-first pricing",
      desc: "Competitive wholesale rates with volume-friendly structure for manufacturers and resellers.",
    },
    {
      title: "Consistent supply",
      desc: "Reliable inventory across all categories with repeatable specs and predictable lead times.",
    },
  ];

  const steps = [
    { num: "01", title: "Inquiry", desc: "Share your specifications — shape, size, clarity, and quantity." },
    { num: "02", title: "Quote", desc: "Detailed pricing, availability, and lead time within one business day." },
    { num: "03", title: "Approval", desc: "Confirm your order. Certified lots include documents for review." },
    { num: "04", title: "Delivery", desc: "Secure dispatch with tracking and coordinated handoff." },
  ];

  const marqueeItems = [
    "CVD Certified Diamonds",
    "CVD Non-Certified",
    "Wholesale Melee",
    "Trade Pricing",
    "IGI Documentation",
    "Custom Orders",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-[#111827]">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div ref={heroRef} className="relative z-10 w-full px-6 py-24 text-center">
          <div className="mx-auto max-w-[760px]">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                Premium Lab-Grown Diamonds
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
            </div>

            <h1 className="mb-5 text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Brilliance you can
              <br />
              trust, certified
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              Premium supplier of CVD Certified, CVD Non Certified, and Wholesale Melee Diamonds —
              built for trade buyers who demand consistency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/catalog"
                className="primary-button border border-white bg-white !text-[#111827] hover:!opacity-90"
              >
                View Catalog →
              </Link>
              <Link
                to="/contact"
                className="secondary-button !border-white/15 !text-white/75 hover:!border-white/35 hover:!text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="border-t border-white/[0.07] bg-[#111827] py-7">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            {[
              { num: "500+", label: "SKUs Available" },
              { num: "IGI", label: "Certified Stones" },
              { num: "B2B", label: "Trade Only" },
              { num: "Surat", label: "Based & Trusted" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold tracking-tight text-white">{s.num}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-[--border] bg-neutral-50 py-3.5">
        <div className="flex animate-marquee gap-10 whitespace-nowrap">
          {[...Array(2)].flatMap((_, outerIndex) =>
            marqueeItems.map((t, innerIndex) => (
              <span
                key={`${outerIndex}-${innerIndex}`}
                className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-neutral-400"
              >
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                {t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
              Our collections
            </p>
            <h2 className="section-title">
              Three categories,
              <br />
              one trusted source
            </h2>
            <p className="section-subtitle mt-3">
              Everything from fully certified stones to bulk melee — all from a single, reliable
              supplier.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[--border] bg-white">
            <div className="grid divide-x divide-[--border] md:grid-cols-3">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  to={cat.path}
                  className="group relative bg-white p-9 transition-colors hover:bg-neutral-50"
                >
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
                    Category {cat.num}
                  </p>
                  <h3 className="mb-2 text-base font-bold text-[#111827]">{cat.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6b7280]">{cat.desc}</p>
                  <span className="absolute bottom-6 right-6 text-[#e5e7eb] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#111827]">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
                Why Diamond
              </p>
              <h2 className="section-title mb-0">
                Built for serious
                <br />
                trade buyers
              </h2>

              <div className="mt-8 divide-y divide-[--border]">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-3.5 py-5 first:pt-0 last:pb-0">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[--border] bg-white text-sm text-[#374151]">
                      ✦
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-[#111827]">{f.title}</p>
                      <p className="text-sm leading-relaxed text-[#6b7280]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[--border] bg-white p-8">
              <div className="overflow-hidden rounded-xl border border-[--border]">
                <div className="grid grid-cols-2 divide-x divide-y divide-[--border]">
                  {[
                    { val: "D–Z", lbl: "Color range" },
                    { val: "FL–SI", lbl: "Clarity grades" },
                    { val: "0.01+", lbl: "Carat weight" },
                    { val: "EX", lbl: "Cut standard" },
                  ].map((s) => (
                    <div key={s.lbl} className="bg-white p-6 text-center">
                      <p className="text-2xl font-bold tracking-tight text-[#111827]">{s.val}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                        {s.lbl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-center text-[10px] uppercase tracking-[0.22em] text-neutral-300">
                Available specification range
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-[#111827]">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-md text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
              How it works
            </p>
            <h2 className="section-title text-white">
              Simple, transparent
              <br />
              procurement
            </h2>
            <p className="section-subtitle mt-3 text-neutral-500">
              From first inquiry to delivery, we keep the process clean and efficient.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.07]">
            <div className="grid divide-x divide-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.num} className="bg-white/[0.03] p-8">
                  <p className="mb-4 text-[11px] tracking-[0.22em] text-white/20">{s.num}</p>
                  <h3 className="mb-2 text-base font-semibold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-white/40">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="container-custom max-w-md">
          <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
            Get started
          </p>
          <h2 className="section-title">
            Ready to place
            <br />
            your first order?
          </h2>
          <p className="section-subtitle mx-auto mt-3 max-w-sm">
            Contact our team with your requirements and we&apos;ll respond within one business day.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="primary-button">
              Contact Us →
            </Link>
            <Link to="/catalog" className="secondary-button">
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}