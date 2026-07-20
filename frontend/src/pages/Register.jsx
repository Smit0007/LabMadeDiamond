import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = details, 2 = verify otp

  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "",
    businessType: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const validateDetails = () => {
    if (!form.fullName || form.fullName.trim().length < 2) return "Enter a valid name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(form.password)) return "Password must contain uppercase, lowercase, number and special character";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };

  const sendOTP = async () => {
    setError(null);
    const v = validateDetails();
    if (v) return setError(v);

    try {
      setLoading(true);
      await api.post("/otp/send", {
        email: form.email,
        purpose: "register",
      });
      setMessage("OTP sent to your email.");
      setResendCountdown(60);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setError(null);
    if (!/^[0-9]{6}$/.test(otp)) return setError("Enter the 6-digit OTP");

    try {
      setLoading(true);
      await api.post("/otp/verify", {
        email: form.email,
        otp,
        purpose: "register",
      });
      setMessage("OTP verified. You can now complete registration.");

      // Move to final confirmation step so user can review details before registering
      setStep(3);

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const submitRegistration = async () => {
    setError(null);
    try {
      setLoading(true);
      await api.post("/auth/register", {
        fullName: form.fullName.trim(),
        companyName: form.companyName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        country: form.country.trim(),
        businessType: form.businessType,
        password: form.password,
      });
      navigate("/pending-approval");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (resendCountdown > 0) return;
    try {
      setLoading(true);
      await api.post("/otp/send", { email: form.email, purpose: "register" });
      setMessage("OTP resent.");
      setResendCountdown(60);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#111827] py-24">
        <div className="container-custom relative z-10 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-500">Trade Registration</p>
            <h1 className="mb-5 text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">Request access to<br/>inventory listings</h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-neutral-400 md:text-lg">Register your business account to access inventory, specifications, and inquiry tools.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[--border] bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#111827]">Create Trade Account</h2>
              <p className="mt-2 text-sm text-[#6b7280]">An OTP will be sent to your email to verify it before registration.</p>
            </div>

            {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); sendOTP(); }}>
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                  <input placeholder="Company Name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                </div>

                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={step===2 || step===3} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                  <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                </div>

                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <input placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                  <select value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]">
                    <option value="">Business Type</option>
                    <option>Jeweller</option>
                    <option>Wholesaler</option>
                    <option>Manufacturer</option>
                    <option>Retailer</option>
                    <option>Trader</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                  <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e)=> setForm({ ...form, confirmPassword:e.target.value })} className="rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                </div>

                <button type="submit" disabled={loading} className="primary-button w-full justify-center">{loading ? "Sending OTP..." : "Send OTP →"}</button>
              </form>
            )}

            {step === 2 && (
              <div>
                <p className="mb-4 text-sm text-[#6b7280]">Enter the 6-digit code sent to <strong>{form.email}</strong></p>

                <div className="mb-4">
                  <input placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0,6))} className="w-full rounded-lg border border-[--border] px-4 py-3 outline-none focus:border-[#111827]" />
                </div>

                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <button onClick={verifyOTP} disabled={loading} className="primary-button w-full justify-center">{loading ? "Verifying..." : "Verify & Register →"}</button>
                  <button onClick={resend} disabled={loading || resendCountdown>0} className="border border-[--border] rounded-lg px-4 py-3">{resendCountdown>0?`Resend (${resendCountdown}s)`:"Resend OTP"}</button>
                </div>

                <div className="mt-6 border-t border-[--border] pt-6 text-center">
                  <p className="text-sm text-[#6b7280]">Change email?</p>
                  <button onClick={() => setStep(1)} className="mt-2 inline-block font-medium text-[#111827] hover:underline">Edit details</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Confirm Details</h3>
                <ul className="mb-4 text-sm text-[#374151]">
                  <li><strong>Full name:</strong> {form.fullName}</li>
                  <li><strong>Company:</strong> {form.companyName}</li>
                  <li><strong>Email:</strong> {form.email}</li>
                  <li><strong>Phone:</strong> {form.phone}</li>
                  <li><strong>Country:</strong> {form.country}</li>
                  <li><strong>Business type:</strong> {form.businessType}</li>
                </ul>

                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <button onClick={submitRegistration} disabled={loading} className="primary-button w-full justify-center">{loading?"Registering...":"Complete Registration →"}</button>
                  <button onClick={() => setStep(1)} className="border border-[--border] rounded-lg px-4 py-3">Edit details</button>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-[--border] pt-6 text-center">
              <p className="text-sm text-[#6b7280]">Already have an account?</p>
              <Link to="/login" className="mt-2 inline-block font-medium text-[#111827] hover:underline">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
