export default function Home() {
  return (
    <section className="container-custom">
      <div className="py-24">
        <h1 className="text-5xl font-bold">
          Diamond Jewellery
        </h1>

        <p className="mt-4 text-neutral-600">
          Temporary content for layout preview.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-60 rounded-2xl border border-neutral-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
}