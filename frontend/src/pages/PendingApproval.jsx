import { Link } from "react-router-dom";

export default function PendingApproval() {
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
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">
              Registration Received
            </p>

            <h1 className="mb-5 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Account Pending
              <br />
              Approval
            </h1>

            <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">
              Your registration has been submitted successfully.
              Our team is reviewing your account before granting
              inventory access.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[--border] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[--border] bg-neutral-50 text-4xl">
              ⏳
            </div>

            <h2 className="mb-3 text-3xl font-bold text-[#111827]">
              Approval In Progress
            </h2>

            <p className="mx-auto max-w-lg text-[#6b7280]">
              We manually review all registrations to maintain
              a trusted trade-only environment. Once approved,
              you'll receive access to inventory listings,
              filtering tools, and inquiry features.
            </p>

            <div className="mt-10 rounded-xl border border-[--border] bg-neutral-50 p-6">
              <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                What Happens Next
              </p>

              <div className="space-y-3 text-left text-sm text-[#6b7280]">
                <p>✓ Registration received</p>
                <p>✓ Account verification review</p>
                <p>✓ Approval by admin team</p>
                <p>✓ Inventory access granted</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="secondary-button"
              >
                Back Home
              </Link>

              <Link
                to="/contact"
                className="primary-button"
              >
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}