import { useState } from "react";

const contactInfo = [
  {
    icon: "📞",
    label: "Phone",
    value: "YOUR_PHONE",
    sub: "Trade inquiries welcome",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "YOUR_EMAIL",
    sub: "Replies within 1 business day",
  },
  {
    icon: "📍",
    label: "Address",
    value: "YOUR_ADDRESS",
    sub: "Surat, Gujarat",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "YOUR_WHATSAPP",
    sub: "Quick responses",
  },
];

const whyContactUs = [
  {
    title: "Bulk Orders",
    desc: "Competitive pricing and reliable supply for large volume requirements.",
  },
  {
    title: "Custom Requirements",
    desc: "Need specific color, clarity, shape or size ranges? We can help.",
  },
  {
    title: "Certified Stones",
    desc: "IGI certified inventory available for qualified buyers.",
  },
  {
    title: "International Supply",
    desc: "Export-ready documentation and worldwide trade support.",
  },
];

const faqs = [
  {
    q: "Is there a minimum order quantity?",
    a: "MOQ depends on the product category. Contact us with your requirements and we'll advise accordingly.",
  },
  {
    q: "Do you export internationally?",
    a: "Yes. We work with trade buyers across multiple markets and provide export documentation where required.",
  },
  {
    q: "Can I request certified stones?",
    a: "Yes. Certified inventory is available depending on category and availability.",
  },
  {
    q: "How quickly do you respond?",
    a: "Most inquiries receive a response within one business day.",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    shape: "",
    carat: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    setSent(true);
  };

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
              Contact Us
            </p>

            <h1 className="mb-6 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">
              Let's discuss your
              <br />
              diamond requirements
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              Share your specifications and our team will respond with
              availability, pricing, and recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
            {/* LEFT */}
            <div>
              <p className="section-subtitle mb-2 text-[11px] font-medium uppercase tracking-[0.12em]">
                Contact Information
              </p>

              <h2 className="section-title text-left">
                Reach us
                <br />
                directly
              </h2>

              <div className="mt-8 overflow-hidden rounded-2xl border border-[--border]">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-4 border-b border-[--border] bg-white p-5 last:border-none"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[--border] bg-neutral-50">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                        {item.label}
                      </p>

                      <p className="mt-1 font-semibold text-[#111827]">
                        {item.value}
                      </p>

                      <p className="text-sm text-[#6b7280]">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[--border] bg-neutral-50 p-6">
                <p className="mb-3 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                  Business Location
                </p>

                <div className="flex h-40 items-center justify-center rounded-xl border border-[--border] bg-white">
                  <div className="text-center">
                    <div className="mb-2 text-3xl text-neutral-300">
                      📍
                    </div>

                    <p className="text-sm text-neutral-500">
                      Google Maps Embed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="rounded-2xl border border-[--border] bg-white p-8">
              {sent ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[--border] bg-neutral-50 text-2xl">
                    ✓
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-[#111827]">
                    Inquiry Sent
                  </h3>

                  <p className="max-w-md text-[#6b7280]">
                    Thank you for contacting us. We'll review your
                    requirements and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="mb-1 text-xl font-bold text-[#111827]">
                    Send an Inquiry
                  </h3>

                  <p className="mb-8 text-[#6b7280]">
                    Fill in your requirements and our team will contact you.
                  </p>

                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <input
                      required
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />

                    <input
                      placeholder="Company Name"
                      value={form.company}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          company: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />
                  </div>

                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />

                    <input
                      placeholder="Phone / WhatsApp"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />
                  </div>

                  <div className="mb-4">
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    >
                      <option value="">
                        Product Category
                      </option>
                      <option>
                        CVD Certified Diamonds
                      </option>
                      <option>
                        CVD Non-Certified Diamonds
                      </option>
                      <option>
                        Wholesale Melee Diamonds
                      </option>
                    </select>
                  </div>

                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <input
                      placeholder="Shape"
                      value={form.shape}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          shape: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />

                    <input
                      placeholder="Carat Range"
                      value={form.carat}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          carat: e.target.value,
                        })
                      }
                      className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                    />
                  </div>

                  <textarea
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    className="mb-6 w-full rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]"
                  />

                  <button
                    type="submit"
                    className="primary-button w-full justify-center"
                  >
                    Send Inquiry →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CONTACT US */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <p className="section-subtitle mb-2 text-[11px] uppercase tracking-[0.12em]">
              Why Contact Us
            </p>

            <h2 className="section-title">
              Built for
              <br />
              trade buyers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyContactUs.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[--border] bg-white p-8"
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
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <div className="mb-14 text-center">
            <p className="section-subtitle mb-2 text-[11px] uppercase tracking-[0.12em]">
              FAQ
            </p>

            <h2 className="section-title">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[--border]">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`bg-white p-7 ${
                  index !== faqs.length - 1
                    ? "border-b border-[--border]"
                    : ""
                }`}
              >
                <h3 className="mb-2 font-semibold text-[#111827]">
                  {faq.q}
                </h3>

                <p className="text-sm leading-relaxed text-[#6b7280]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}