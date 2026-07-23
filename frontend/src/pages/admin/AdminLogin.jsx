import { useState } from "react";
import { adminLogin } from "../../services/adminService";

export default function AdminLogin() {
  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const response =
          await adminLogin(
            form
          );

        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(
            response.data.admin
          )
        );

        window.location.href =
          "/admin";
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={
          handleSubmit
        }
        className="w-full max-w-md rounded-xl bg-white p-8 shadow"
      >

        <h1 className="mb-6 text-3xl font-bold">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={
            form.email
          }
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
          className="mb-4 w-full rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={
            form.password
          }
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-black py-3 text-white"
        >
          Login
        </button>

      </form>

    </div>
  );
}