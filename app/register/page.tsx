"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AgeOption = "adult" | "minor" | null;
type Step = 1 | 2 | 3 | 4;

// ─── Step 1: Age Selection ───────────────────────────────────────────────────

function Step1({
  selected,
  onSelect,
  onNext,
}: {
  selected: AgeOption;
  onSelect: (v: AgeOption) => void;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — red gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-r from-red-600 to-red-500 p-14 flex-col justify-center gap-10">
        <Section
          title="Uniquely You – a true reflection of who you are today"
          body="Your Actors Access profile is everything that makes you unique including headshots, résumé, special skills, and union affiliations."
        />
        <Section
          title="The Professional Profile"
          body="This is YOUR profile that you control throughout your career. It is the first thing Casting sees when viewing submissions. When you add a Talent Representative this is the profile they use to submit you to Casting."
        />
        <Section
          title="Auditions"
          body="Audition invitations are sent directly to your Actors Access account. Join ECO CAST LIVE auditions with the click of a button. Reply to ECO CAST self-tape requests."
        />
        <Section
          title="Secure, Integrated, Innovative, Industry Standard"
          body="Free to create and maintain."
        />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Register for Actors Access
          </h1>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            An Actors Access account is free to create and maintain and must be
            created by the individual or a Parent or Legal Guardian.
          </p>

          <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
            <RadioOption
              value="adult"
              selected={selected}
              onSelect={onSelect}
              label="I am 13 or older"
            />
            <RadioOption
              value="minor"
              selected={selected}
              onSelect={onSelect}
              label="I am the Parent or Legal Guardian registering on behalf of a minor"
            />
          </div>

          <button
            onClick={onNext}
            disabled={!selected}
            className={cn(
              "mt-8 w-full py-3 rounded-md text-white font-semibold text-sm transition-colors",
              selected
                ? "bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-sm"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function RadioOption({
  value,
  selected,
  onSelect,
  label,
}: {
  value: AgeOption;
  selected: AgeOption;
  onSelect: (v: AgeOption) => void;
  label: string;
}) {
  const isSelected = selected === value;
  return (
    <label className="flex items-start gap-4 py-5 cursor-pointer group">
      <div className="mt-0.5 flex-shrink-0">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
            isSelected ? "border-red-500" : "border-gray-300 group-hover:border-red-300"
          )}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          )}
        </div>
      </div>
      <span className="text-gray-700 text-sm leading-snug">{label}</span>
      <input
        type="radio"
        className="sr-only"
        checked={isSelected}
        onChange={() => onSelect(value)}
      />
    </label>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-bold text-white text-base mb-1.5">{title}</h2>
      <p className="text-red-100 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Step 2: Parent / Legal Guardian Agreement ───────────────────────────────

function Step2({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");

  const canContinue = name.trim() && email.trim() && signature.trim();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Parent / Legal Guardian Agreement
        </h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          As the Parent or Legal Guardian of a minor child:
          <br />
          You are consenting to the creation of this account on behalf of a
          minor child.
        </p>

        <div className="space-y-5">
          <FormField
            label="Parent / Guardian (Full Legal Name)"
            value={name}
            onChange={setName}
          />
          <FormField
            label="Parent / Guardian Email"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <FormField
            label="Parent / Guardian Electronic Signature (Full Legal Name as above)"
            value={signature}
            onChange={setSignature}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-2.5 rounded-md border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!canContinue}
            className={cn(
              "flex-1 py-2.5 rounded-md text-white text-sm font-semibold transition-colors",
              canContinue
                ? "bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-sm"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
      />
    </div>
  );
}

// ─── Step 3: Minor's Information Form ────────────────────────────────────────

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const COUNTRIES = [
  "United States","Canada","United Kingdom","Australia","Germany","France",
  "Spain","Italy","Mexico","Brazil","Japan","China","India","South Korea","Other",
];

function getPasswordStrength(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function PasswordStrengthBar({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  const barColors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors",
              password.length > 0 && strength >= i
                ? barColors[strength - 1]
                : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <p className="text-xs text-gray-500">
          Password strength:{" "}
          {password.length > 0 && (
            <span className="font-medium text-gray-700">{labels[strength]}</span>
          )}
        </p>
        <p className="text-xs text-gray-400">8-character minimum</p>
      </div>
    </div>
  );
}

function Step3({ onNext }: { onNext: () => void }) {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isUS = form.country === "United States";
  const isCA = form.country === "Canada";
  const needsStateDropdown = isUS || isCA;

  const canContinue =
    form.firstName &&
    form.lastName &&
    form.email &&
    form.country &&
    form.city &&
    form.username &&
    form.password.length >= 8 &&
    agreed;

  const inputClass =
    "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Complete all fields with minor&apos;s information.
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter your professional name &mdash;{" "}
          <span className="text-gray-400 text-xs">
            (If you have a mononym, enter it in the first name field)
          </span>
        </p>

        <div className="space-y-5">
          {/* Name row */}
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                ["firstName", "First Name"],
                ["middleName", "Middle Name"],
                ["lastName", "Last Name"],
              ] as const
            ).map(([key, lbl]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {lbl}
                </label>
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => set(key)(e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Country + State */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Country
              </label>
              <div className="relative">
                <select
                  value={form.country}
                  onChange={(e) => {
                    set("country")(e.target.value);
                    set("state")("");
                  }}
                  className={cn(inputClass, "appearance-none pr-9")}
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                State/Province
              </label>
              {needsStateDropdown ? (
                <div className="relative">
                  <select
                    value={form.state}
                    onChange={(e) => set("state")(e.target.value)}
                    className={cn(inputClass, "appearance-none pr-9")}
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => set("state")(e.target.value)}
                  placeholder="Non US State/Canadian Province"
                  disabled={!form.country}
                  className={cn(
                    inputClass,
                    "placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-300"
                  )}
                />
              )}
            </div>
          </div>

          {/* City + Postal Code */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                City
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city")(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Postal Code
              </label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => set("postalCode")(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => set("username")(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password")(e.target.value)}
                className={cn(inputClass, "pr-10")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <PasswordStrengthBar password={form.password} />
          </div>

          {/* Terms */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-red-600"
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-red-600 font-medium hover:underline cursor-pointer">
                Terms of Use
              </span>
            </span>
          </label>

          {/* reCAPTCHA placeholder */}
          <div className="border border-gray-200 rounded-md bg-gray-50 w-72 h-[78px] flex items-center gap-4 px-4">
            <div className="w-6 h-6 border-2 border-gray-300 rounded flex-shrink-0" />
            <span className="text-sm text-gray-600">I&apos;m not a robot</span>
            <div className="ml-auto flex flex-col items-center gap-0.5">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <span className="text-[9px] text-gray-400 leading-tight">
                reCAPTCHA
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={onNext}
            disabled={!canContinue}
            className={cn(
              "w-full py-3 rounded-md text-white text-sm font-semibold transition-colors",
              canContinue
                ? "bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-sm"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Memberships ──────────────────────────────────────────────────────

const starterFeatures = [
  "The ability to view all Breakdowns released to Actors Access",
  "2 free photos",
  "1 free SlateShot upload",
  "Your résumé",
  "Your size card, special skills, and union affiliations",
  "Role Match notifications",
  "A single, shared profile used by all your Talent Representatives",
  "Access to your Eco Cast Self-Tapes, Eco Cast Live Invitations, Secure Sides, and other audition updates",
  "The ability to purchase optional marketing material (additional photos, SlateShots, performance media)",
  "Talent Representative Media Storage — all purchased marketing material is available for your Talent Representative to use when responding to projects and roles",
  "Access to the iOS App",
];

const plusFeatures = [
  "All the benefits of Actors Access Starter plus…",
  "The ability to respond to ALL projects and roles released on Actors Access with your full profile (as outlined in your Starter membership)",
  "Actors Access Media — include any media from your Talent Representative Media Storage when responding to projects and roles",
  "Full access to the iOS App",
];

function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header banner */}
        <div className="bg-linear-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white shadow-sm">
          <p className="text-red-100 text-xs font-medium uppercase tracking-wide mb-1">
            Membership
          </p>
          <h1 className="text-2xl font-bold">Actors Access Memberships</h1>
          <p className="text-red-100 text-sm mt-2 leading-relaxed">
            Your profile is the industry standard for professional Actors. Free
            to create and maintain — this is what Casting sees when viewing
            submissions from Talent Representatives or directly from you.
          </p>
        </div>

        {/* Starter card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide">
              Starter — Free
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Your Actors Access Starter Membership Includes:
          </p>
          <ul className="space-y-2.5">
            {starterFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Plus card */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wide">
              Actors Access+
            </span>
            <span className="text-gray-900 font-bold text-base">
              $68.00
              <span className="text-gray-400 font-normal text-sm">/yr</span>
              <span className="text-gray-400 font-normal text-sm mx-1.5">
                or
              </span>
              $9.99
              <span className="text-gray-400 font-normal text-sm">/mo</span>
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upgrade to Actors Access Plus to Get:
          </p>
          <ul className="space-y-2.5">
            {plusFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onNext}
          className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-md shadow-sm transition-colors text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="bg-linear-to-r from-red-600 to-red-500 sticky top-0 z-20 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={160} height={80} priority />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-red-100 hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-white text-sm font-semibold border border-white/40 rounded-md px-4 py-1.5 hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [ageOption, setAgeOption] = useState<AgeOption>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {step === 1 && (
        <Step1
          selected={ageOption}
          onSelect={setAgeOption}
          onNext={() => {
            if (!ageOption) return;
            setStep(ageOption === "minor" ? 2 : 3);
          }}
        />
      )}
      {step === 2 && (
        <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}
      {step === 3 && <Step3 onNext={() => setStep(4)} />}
      {step === 4 && <Step4 onNext={() => alert("Registration complete!")} />}
    </div>
  );
}
