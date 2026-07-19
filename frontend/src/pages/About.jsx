import { Link } from "react-router-dom";

const processSteps = [
  {
    num: "01",
    title: "Inquiry",
    desc: "Share your specifications including category, size, quality, and quantity requirements.",
  },
  {
    num: "02",
    title: "Quote",
    desc: "Our team reviews availability and provides detailed pricing and delivery information.",
  },
  {
    num: "03",
    title: "Approval",
    desc: "Confirm your selection and review specifications before final order processing.",
  },
  {
    num: "04",
    title: "Dispatch",
    desc: "Orders are securely packed and dispatched with tracking and documentation.",
  },
];

const qualityStandards = [
  {
    title: "Color Verification",
    desc: "Every lot is checked for color consistency before dispatch.",
  },
  {
    title: "Clarity Verification",
    desc: "Internal quality control ensures accurate clarity grading.",
  },
  {
    title: "Cut Assessment",
    desc: "Stones are reviewed for cut quality and visual performance.",
  },
  {
    title: "Lot Consistency",
    desc: "Bulk orders are matched for uniformity and consistency.",
  },
];

const stats = [
  {
    number: "10+",
    label: "Years in Trade",
  },
  {
    number: "500+",
    label: "Active SKUs",
  },
  {
    number: "200+",
    label: "Trade Customers",
  },
  {
    number: "3",
    label: "Product Categories",
  },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111827] py-28">
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
              About Diamond
            </p>

            <h1 className="mb-6 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Built for trade buyers
              <br />
              who value consistency
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              We supply premium CVD Certified, CVD Non-Certified, and Wholesale
              Melee Diamonds to jewellers, manufacturers, and wholesalers who
              demand reliability, transparency, and consistent quality.
            </p>
          </div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
                Company Story
              </p>

              <h2 className="section-title">
                A trusted supplier
                <br />
                from Surat
              </h2>

              <p className="section-subtitle mt-4">
                Located in the heart of India's diamond industry, we focus on
                providing trade buyers with dependable access to high-quality
                lab-grown diamonds across multiple categories.
              </p>

              <p className="section-subtitle mt-4">
                Our approach is simple: transparent specifications, consistent
                inventory, competitive pricing, and long-term business
                relationships built on trust.
              </p>
            </div>

            <div className="flex h-80 items-center justify-center rounded-2xl border border-[--border] bg-neutral-50">
              <div className="text-center">
                <div className="mb-4 text-6xl text-neutral-300">
                  💎
                </div>

                <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                  Surat, Gujarat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-[#111827]">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-md text-center">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-500">
              Our Process
            </p>

            <h2 className="section-title text-white">
              Simple &
              <br />
              transparent workflow
            </h2>

            <p className="section-subtitle mt-3 text-neutral-500">
              Designed to make procurement efficient for trade buyers.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            <div className="grid divide-x divide-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white/[0.03] p-8"
                >
                  <p className="mb-4 text-[11px] tracking-[0.2em] text-white/20">
                    {step.num}
                  </p>

                  <h3 className="mb-2 text-base font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/40">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
              Quality Standards
            </p>

            <h2 className="section-title">
              Quality remains
              <br />
              our priority
            </h2>

            <p className="section-subtitle mt-3">
              Every lot passes internal quality checks before dispatch.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[--border] bg-white">
            <div className="grid divide-x divide-y divide-[--border] md:grid-cols-2">
              {qualityStandards.map((item) => (
                <div
                  key={item.title}
                  className="p-8"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[--border] bg-neutral-50">
                    ✦
                  </div>

                  <h3 className="mb-2 font-semibold text-[#111827]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#6b7280]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
              By The Numbers
            </p>

            <h2 className="section-title">
              A track record
              <br />
              you can trust
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[--border]">
            <div className="grid divide-x divide-[--border] sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white px-6 py-10 text-center"
                >
                  <p className="text-4xl font-bold tracking-tight text-[#111827]">
                    {stat.number}
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50 text-center">
        <div className="container-custom max-w-md">
          <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
            Get Started
          </p>

          <h2 className="section-title">
            Ready to work
            <br />
            together?
          </h2>

          <p className="section-subtitle mt-3">
            Contact our team to discuss your requirements and receive a
            tailored quotation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="primary-button"
            >
              Contact Us →
            </Link>

            <Link
              to="/catalog"
              className="secondary-button"
            >
              View Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}