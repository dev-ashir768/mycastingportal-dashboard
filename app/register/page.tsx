"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, ChevronDown } from "lucide-react";
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
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 p-14 flex-col justify-center gap-8">
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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Register for Actors Access
          </h1>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            An Actors Access account is free to create and maintain and must be
            created by the individual or a Parent or Legal Guardian.
          </p>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
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
              "mt-8 w-full py-3 rounded text-white font-semibold text-base transition-colors",
              selected
                ? "bg-[#2d2d7b] hover:bg-[#23236a]"
                : "bg-gray-300 cursor-not-allowed"
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
    <label className="flex items-start gap-4 py-5 cursor-pointer">
      <div className="mt-0.5 flex-shrink-0">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            isSelected ? "border-blue-500" : "border-gray-400"
          )}
        >
          {isSelected && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          )}
        </div>
      </div>
      <span className="text-gray-800 text-sm leading-snug">{label}</span>
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
      <h2 className="font-bold text-gray-900 text-base mb-1">{title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
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
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Parent / Legal Guardian Agreement
        </h1>
        <p className="text-gray-700 text-sm mb-8 leading-relaxed">
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
            placeholder=""
          />
          <FormField
            label="Parent / Guardian Email"
            value={email}
            onChange={setEmail}
            placeholder=""
            type="email"
          />
          <FormField
            label="Parent / Guardian Electronic Signature (Full Legal Name as above)"
            value={signature}
            onChange={setSignature}
            placeholder=""
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded border border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!canContinue}
            className={cn(
              "flex-1 py-3 rounded text-white font-semibold transition-colors",
              canContinue
                ? "bg-[#2d2d7b] hover:bg-[#23236a]"
                : "bg-gray-300 cursor-not-allowed"
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
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

// ─── Step 3: Minor's Information Form ────────────────────────────────────────

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const COUNTRIES = [
  "United States","Canada","United Kingdom","Australia","Germany","France",
  "Spain","Italy","Mexico","Brazil","Japan","China","India","South Korea",
  "Other",
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
  const colors = ["bg-gray-200", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors",
              strength >= i ? colors[strength] : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <p className="text-xs text-gray-500">Password strength: {labels[strength]}</p>
        <p className="text-xs text-gray-500">8-character minimum</p>
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

  return (
    <div className="min-h-screen flex items-start justify-center bg-white p-6 pt-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Complete all fields with minor&apos;s information.
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter your professional name
          <br />
          <span className="text-gray-400">
            (If you have a mononym, enter it in the first name field)
          </span>
        </p>

        <div className="space-y-6">
          {/* Name row */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => set("firstName")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Middle Name
              </label>
              <input
                type="text"
                value={form.middleName}
                onChange={(e) => set("middleName")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => set("lastName")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Country + State */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Country
              </label>
              <div className="relative">
                <select
                  value={form.country}
                  onChange={(e) => {
                    set("country")(e.target.value);
                    set("state")("");
                  }}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                State/Province
              </label>
              {needsStateDropdown ? (
                <div className="relative">
                  <select
                    value={form.state}
                    onChange={(e) => set("state")(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              ) : (
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => set("state")(e.target.value)}
                  placeholder="Non US State/Canadian Province"
                  disabled={!form.country}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                />
              )}
            </div>
          </div>

          {/* City + Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Postal Code
              </label>
              <input
                type="text"
                value={form.postalCode}
                onChange={(e) => set("postalCode")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => set("username")(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password")(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
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
              className="w-4 h-4 rounded border-gray-300 accent-[#2d2d7b]"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                Terms of Use
              </span>
            </span>
          </label>

          {/* reCAPTCHA placeholder */}
          <div className="border border-gray-300 rounded bg-gray-50 w-72 h-[78px] flex items-center gap-4 px-4">
            <div className="w-6 h-6 border-2 border-gray-400 rounded flex-shrink-0" />
            <span className="text-sm text-gray-700">I&apos;m not a robot</span>
            <div className="ml-auto flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="w-8 h-8" fill="none">
                  <path
                    d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4z"
                    fill="#4A90D9"
                  />
                  <path
                    d="M32 12c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z"
                    fill="#fff"
                  />
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
              "w-full py-3.5 rounded text-white font-semibold text-base transition-colors",
              canContinue
                ? "bg-[#2d2d7b] hover:bg-[#23236a]"
                : "bg-gray-300 cursor-not-allowed"
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
  "Talent Representative Media Storage - all purchased marketing material is available for your Talent Representative to use when responding to projects and roles",
  "Access to the iOS App",
];

const plusFeatures = [
  "All the benefits of Actors Access Starter plus...",
  "The ability to respond to ALL projects and roles released on Actors Access with your full profile (as outlined in your Starter membership)",
  "Actors Access Media - include any media from your Talent Representative Media Storage when responding to projects and roles",
  "Full access to the iOS App",
];

function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900 mb-4 uppercase">
          Actors Access Memberships
        </h1>
        <p className="text-sm text-gray-700 leading-relaxed mb-8">
          Your <strong>Actors Access</strong> profile is the industry standard
          for professional Actors. Free to create and maintain, this is what
          Casting sees when viewing submissions from Talent Representatives or
          directly from you.
        </p>

        <hr className="border-gray-200 mb-6" />

        {/* Starter */}
        <p className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
          Your <strong>Actors Access Starter</strong> Membership Includes:
        </p>
        <ul className="space-y-2.5 mb-10">
          {starterFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span
                className="text-sm text-gray-700 leading-snug"
                dangerouslySetInnerHTML={{
                  __html: f
                    .replace("Talent Representative Media Storage", "<strong>Talent Representative Media Storage</strong>")
                    .replace("Actors Access", "<strong>Actors Access</strong>"),
                }}
              />
            </li>
          ))}
        </ul>

        <hr className="border-gray-200 mb-6" />

        {/* Plus */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
          <span className="text-[#e07b20] font-bold text-lg italic tracking-tight">
            actors access<span className="text-[#2d2d7b]">+</span>
          </span>
          <span className="text-gray-900 font-bold text-lg">
            $68.00/yr{" "}
            <span className="font-normal text-gray-500 text-base">or</span>{" "}
            $9.99/mo
          </span>
        </div>

        <p className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
          Upgrade to <strong>Actors Access Plus</strong> To Get:
        </p>
        <ul className="space-y-2.5 mb-10">
          {plusFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span
                className="text-sm text-gray-700 leading-snug"
                dangerouslySetInnerHTML={{
                  __html: f
                    .replace(/Actors Access Starter/g, "<strong>Actors Access Starter</strong>")
                    .replace(/Actors Access Media/g, "<strong>Actors Access Media</strong>")
                    .replace(/Actors Access/g, "<strong>Actors Access</strong>")
                    .replace(/Talent Representative Media Storage/g, "<strong>Talent Representative Media Storage</strong>")
                    .replace(/Starter/g, "<strong>Starter</strong>"),
                }}
              />
            </li>
          ))}
        </ul>

        <hr className="border-gray-200 mb-6" />

        <button
          onClick={onNext}
          className="bg-[#2d2d7b] hover:bg-[#23236a] text-white font-semibold px-10 py-3 rounded transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [ageOption, setAgeOption] = useState<AgeOption>(null);

  const handleStep1Next = () => {
    if (!ageOption) return;
    if (ageOption === "minor") {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  return (
    <>
      {step === 1 && (
        <Step1
          selected={ageOption}
          onSelect={setAgeOption}
          onNext={handleStep1Next}
        />
      )}
      {step === 2 && (
        <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />
      )}
      {step === 3 && <Step3 onNext={() => setStep(4)} />}
      {step === 4 && <Step4 onNext={() => alert("Registration complete!")} />}
    </>
  );
}
