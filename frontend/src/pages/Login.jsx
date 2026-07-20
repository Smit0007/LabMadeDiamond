import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const response =
          await loginUser({

            email:
              form.email
                .trim()
                .toLowerCase(),

            password:
              form.password,

          });

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        window.location.href =
          "/catalog";

      }

      catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Login failed."
        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <>

      <section className="relative overflow-hidden bg-[#111827] py-24">

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
            backgroundSize:
              "52px 52px",
          }}
        />

        <div className="container-custom relative z-10 text-center">

          <div className="mx-auto max-w-2xl">

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">

              Trade Portal

            </p>

            <h1 className="mb-5 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">

              Access inventory

              <br />

              and trade listings

            </h1>

            <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">

              Login to access approved inventory listings,
              specifications and inquiry tools.

            </p>

          </div>

        </div>

      </section>

      <section className="section-padding bg-white">

        <div className="container-custom">

          <div className="mx-auto max-w-md">

            <div className="rounded-2xl border border-[--border] bg-white p-8 shadow-sm">

              <div className="mb-8 text-center">

                <h2 className="text-2xl font-bold text-[#111827]">

                  Welcome Back

                </h2>

                <p className="mt-2 text-sm text-[#6b7280]">

                  Sign in to continue

                </p>

              </div>

              {

                error &&

                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                  {error}

                </div>

              }

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <label className="mb-2 block text-sm font-medium">

                    Email Address

                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e)=>
                      setForm({
                        ...form,
                        email:e.target.value,
                      })
                    }
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none transition focus:border-[#111827]"
                  />

                </div>

                <div className="mb-2">

                  <label className="mb-2 block text-sm font-medium">

                    Password

                  </label>

                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e)=>
                      setForm({
                        ...form,
                        password:e.target.value,
                      })
                    }
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none transition focus:border-[#111827]"
                  />

                </div>

                <div className="mb-6 text-right">

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#111827] hover:underline"
                  >

                    Forgot Password?

                  </Link>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="primary-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {

                    loading

                    ? "Signing In..."

                    : "Login →"

                  }

                </button>

              </form>

              <div className="mt-6 border-t border-[--border] pt-6 text-center">

                <p className="text-sm text-[#6b7280]">

                  Don't have an account?

                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block font-medium text-[#111827] hover:underline"
                >

                  Request Access

                </Link>

              </div>

            </div>

            <div className="mt-6 rounded-2xl border border-[--border] bg-neutral-50 p-6">

              <p className="mb-2 text-[10px] uppercase tracking-[0.15em] text-neutral-400">

                Access Notice

              </p>

              <p className="text-sm leading-relaxed text-[#6b7280]">

                Inventory access is restricted to approved customers.
                New registrations are reviewed before access is granted.

              </p>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}