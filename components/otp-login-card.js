"use client";

import { useEffect, useMemo, useState } from "react";
import { BilingualText } from "@/components/portal-text";

const OTP_LENGTH = 6;

export function OtpLoginCard() {
  const [phone, setPhone] = useState("98765 43210");
  const [otp, setOtp] = useState(["4", "8", "", "", "", ""]);
  const [seconds, setSeconds] = useState(59);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      return undefined;
    }
    const timer = window.setTimeout(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const otpValue = useMemo(() => otp.join(""), [otp]);

  function updateDigit(index, value) {
    const next = [...otp];
    next[index] = value.slice(-1).replace(/[^0-9]/g, "");
    setOtp(next);
  }

  function handleVerify() {
    setVerified(otpValue.length === OTP_LENGTH && !otpValue.includes(""));
  }

  function resendOtp() {
    setOtp(["", "", "", "", "", ""]);
    setSeconds(59);
    setVerified(false);
  }

  return (
    <section className="portal-card w-full max-w-2xl overflow-hidden p-6 sm:p-10">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-police text-4xl text-white dark:bg-copper dark:text-ink">
            🛡️
          </div>
          <BilingualText
            en="THUNA Citizen Access"
            ml="തുണ പൗരപ്രവേശനം"
            enClassName="mt-6 text-4xl font-black tracking-tight text-ink dark:text-white"
            mlClassName="text-lg"
          />
          <p className="mt-4 text-base leading-8 text-slateText dark:text-slate-300">
            Secure, role-aware access for public users tracking complaint and FIR status.
          </p>
        </div>

        <div className="mt-8 grid gap-6">
          <div>
            <label className="value-label" htmlFor="phone">
              Mobile Number
            </label>
            <div className="mt-2 grid gap-3 sm:grid-cols-[90px_1fr]">
              <div className="rounded-2xl border border-line bg-slate-50 px-4 py-4 text-center text-lg font-semibold dark:border-darkLine dark:bg-slate-900/40">
                +91
              </div>
              <input
                id="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="interactive-ring rounded-2xl border border-line bg-white px-4 py-4 text-lg dark:border-darkLine dark:bg-darkPanel"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            <div className="h-px bg-line dark:bg-darkLine" />
            OR
            <div className="h-px bg-line dark:bg-darkLine" />
          </div>

          <button
            type="button"
            className="interactive-ring flex items-center justify-center rounded-2xl border border-line bg-white px-4 py-4 text-base font-semibold text-ink transition hover:border-police hover:bg-slate-50 dark:border-darkLine dark:bg-darkPanel dark:text-white dark:hover:border-copperSoft"
          >
            Sign in with Google
          </button>

          <div className="rounded-[24px] border border-line bg-slate-50/80 p-6 dark:border-darkLine dark:bg-slate-900/40">
            <p className="value-label">Enter 6-digit verification code</p>
            <p className="mt-3 text-sm text-slateText dark:text-slate-300">Sent to +91 {phone}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  onChange={(event) => updateDigit(index, event.target.value)}
                  inputMode="numeric"
                  maxLength={1}
                  className="interactive-ring h-16 w-14 rounded-2xl border border-line bg-white text-center text-3xl font-black dark:border-darkLine dark:bg-darkPanel"
                />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm">
              <span className="text-slateText dark:text-slate-300">⏱ {seconds.toString().padStart(2, "0")}s</span>
              <button
                type="button"
                onClick={resendOtp}
                className="interactive-ring font-semibold uppercase tracking-[0.2em] text-police dark:text-copperSoft"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerify}
              className="interactive-ring mt-6 w-full rounded-2xl bg-copper px-4 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:bg-[#ad8427]"
            >
              Verify & Login
            </button>

            {verified && (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-success dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
                Demo verification complete. In production, this would continue into authenticated public tracking views through Supabase auth.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
