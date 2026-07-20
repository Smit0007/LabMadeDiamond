import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

export default function ForgotPassword() {

  const navigate =
    useNavigate();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    otp,
    setOtp,
  ] = useState("");

  const [
    step,
    setStep,
  ] = useState(1);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    resendTimer,
    setResendTimer,
  ] = useState(0);

  useEffect(() => {

    if (
      resendTimer <= 0
    ) return;

    const timer =
      setInterval(() => {

        setResendTimer(
          previous =>
            previous - 1
        );

      },1000);

    return () =>
      clearInterval(
        timer
      );

  },[
    resendTimer
  ]);

  const sendOTP =
    async ()=>{

      setError("");

      setMessage("");

      if(!email){

        setError(
          "Enter your email."
        );

        return;

      }

      try{

        setLoading(
          true
        );

        await api.post(
          "/password/send-otp",
          {
            email,
          }
        );

        setMessage(
          "OTP sent successfully."
        );

        setResendTimer(
          60
        );

        setStep(
          2
        );

      }

      catch(error){

        setError(
          error.response?.data?.message ||
          "Unable to send OTP."
        );

      }

      finally{

        setLoading(
          false
        );

      }

    };

  const verifyOTP =
    async ()=>{

      setError("");

      setMessage("");

      try{

        setLoading(
          true
        );

        await api.post(
          "/password/verify-otp",
          {
            email,
            otp,
          }
        );

        navigate(
          "/reset-password",
          {
            state:{
              email,
            }
          }
        );

      }

      catch(error){

        setError(
          error.response?.data?.message ||
          "Invalid OTP."
        );

      }

      finally{

        setLoading(
          false
        );

      }

    };

  return (

    <>

      <section className="relative overflow-hidden bg-[#111827] py-24">

        <div className="container-custom text-center">

          <h1 className="text-5xl font-bold text-white">

            Forgot Password

          </h1>

          <p className="mt-5 text-neutral-400">

            Recover your account securely.

          </p>

        </div>

      </section>

      <section className="section-padding bg-white">

        <div className="container-custom">

          <div className="mx-auto max-w-lg rounded-2xl border border-[--border] bg-white p-8 shadow-sm">

            {message &&
              <p className="mb-4 text-green-600">
                {message}
              </p>
            }

            {error &&
              <p className="mb-4 text-red-600">
                {error}
              </p>
            }

            {

              step===1 &&

              <>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="mb-5 w-full rounded-lg border border-[--border] px-4 py-3"
                />

                <button
                  onClick={
                    sendOTP
                  }
                  disabled={
                    loading
                  }
                  className="primary-button w-full justify-center"
                >

                  {
                    loading
                    ? "Sending..."
                    : "Send OTP"
                  }

                </button>

              </>

            }

            {

              step===2 &&

              <>

                <input
                  value={otp}
                  placeholder="OTP"
                  maxLength={6}
                  onChange={(e)=>
                    setOtp(
                      e.target.value
                      .replace(/\D/g,"")
                    )
                  }
                  className="mb-5 w-full rounded-lg border border-[--border] px-4 py-3"
                />

                <button
                  onClick={
                    verifyOTP
                  }
                  disabled={
                    loading
                  }
                  className="primary-button mb-4 w-full justify-center"
                >

                  {
                    loading
                    ? "Verifying..."
                    : "Verify OTP"
                  }

                </button>

                <button
                  onClick={
                    sendOTP
                  }
                  disabled={
                    resendTimer>0
                  }
                  className="w-full rounded-lg border border-[--border] py-3"
                >

                  {

                    resendTimer>0

                    ? `Resend (${resendTimer}s)`

                    : "Resend OTP"

                  }

                </button>

              </>

            }

            <div className="mt-8 text-center">

              <Link
                to="/login"
                className="font-medium hover:underline"
              >

                Back to Login

              </Link>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}