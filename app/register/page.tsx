"use client";

import { useState } from "react";
import { Eye, EyeOff, CheckCircle2, ChevronDown, X, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AgeOption = "adult" | "minor" | null;
type Step = 1 | 2 | 3 | 4 | 5;

// ─── Shared helpers ───────────────────────────────────────────────────────────

const inputClass =
  "w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition";

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "appearance-none pr-9")}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 pb-1 border-b border-gray-100">
      <span className="text-base">{icon}</span>
      <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
        {title}
      </h3>
    </div>
  );
}

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
    <div className="flex flex-1">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-red-600 to-red-500 p-14 flex-col justify-center gap-10">
        <MarketingSection
          title="Uniquely You – a true reflection of who you are today"
          body="Your Actors Access profile is everything that makes you unique including headshots, résumé, special skills, and union affiliations."
        />
        <MarketingSection
          title="The Professional Profile"
          body="This is YOUR profile that you control throughout your career. It is the first thing Casting sees when viewing submissions. When you add a Talent Representative this is the profile they use to submit you to Casting."
        />
        <MarketingSection
          title="Auditions"
          body="Audition invitations are sent directly to your Actors Access account. Join ECO CAST LIVE auditions with the click of a button. Reply to ECO CAST self-tape requests."
        />
        <MarketingSection
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
            isSelected
              ? "border-red-500"
              : "border-gray-300 group-hover:border-red-300"
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

function MarketingSection({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-bold text-white text-base mb-1.5">{title}</h2>
      <p className="text-red-100 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Step 2: Parent / Legal Guardian Agreement ───────────────────────────────

function Step2({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const canContinue = name.trim() && email.trim() && signature.trim();

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
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
          <SimpleField label="Parent / Guardian (Full Legal Name)" value={name} onChange={setName} required />
          <SimpleField label="Parent / Guardian Email" value={email} onChange={setEmail} type="email" required />
          <SimpleField
            label="Parent / Guardian Electronic Signature (Full Legal Name as above)"
            value={signature}
            onChange={setSignature}
            required
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

function SimpleField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

// ─── Step 3: Account Information ─────────────────────────────────────────────

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
  const barColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return (
    <div className="mt-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-full transition-colors",
              password.length > 0 && strength >= i ? barColors[strength - 1] : "bg-gray-200"
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
    firstName: "", middleName: "", lastName: "",
    email: "", country: "", state: "", city: "", postalCode: "",
    username: "", password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const needsStateDropdown = form.country === "United States" || form.country === "Canada";
  const canContinue =
    form.firstName && form.lastName && form.email && form.country &&
    form.city && form.username && form.password.length >= 8 && agreed;

  return (
    <div className="flex-1 bg-gray-50 py-10 px-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center">3</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Account Information</h1>
            <p className="text-xs text-gray-400">Complete all fields with your information</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Professional Name */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Professional Name
              <span className="text-gray-400 font-normal normal-case ml-1">
                (If you have a mononym, enter it in the first name field)
              </span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(
                [["firstName","First Name"],["middleName","Middle Name"],["lastName","Last Name"]] as const
              ).map(([key, lbl]) => (
                <div key={key}>
                  <FieldLabel required={key !== "middleName"}>{lbl}</FieldLabel>
                  <input type="text" value={form[key]} onChange={(e) => set(key)(e.target.value)} className={inputClass} />
                </div>
              ))}
            </div>
          </div>

          {/* Email */}
          <SimpleField label="Email" value={form.email} onChange={set("email")} type="email" required />

          {/* Country + State */}
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Country" value={form.country} required
              onChange={(v) => { set("country")(v); set("state")(""); }}
              options={COUNTRIES} placeholder="Select Country"
            />
            <div>
              <FieldLabel>State / Province</FieldLabel>
              {needsStateDropdown ? (
                <div className="relative">
                  <select value={form.state} onChange={(e) => set("state")(e.target.value)}
                    className={cn(inputClass, "appearance-none pr-9")}>
                    <option value="">Select State</option>
                    {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              ) : (
                <input type="text" value={form.state} onChange={(e) => set("state")(e.target.value)}
                  placeholder="Non US State/Canadian Province" disabled={!form.country}
                  className={cn(inputClass, "placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-gray-300")} />
              )}
            </div>
          </div>

          {/* City + Postal */}
          <div className="grid grid-cols-2 gap-3">
            <SimpleField label="City" value={form.city} onChange={set("city")} required />
            <SimpleField label="Postal Code" value={form.postalCode} onChange={set("postalCode")} />
          </div>

          {/* Username + Password */}
          <SimpleField label="Username" value={form.username} onChange={set("username")} required />
          <div>
            <FieldLabel required>Password</FieldLabel>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password")(e.target.value)}
                className={cn(inputClass, "pr-10")}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 transition-colors">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <PasswordStrengthBar password={form.password} />
          </div>

          {/* Terms */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-red-600" />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-red-600 font-medium hover:underline cursor-pointer">Terms of Use</span>
            </span>
          </label>

          {/* reCAPTCHA */}
          <div className="border border-gray-200 rounded-md bg-gray-50 w-72 h-[78px] flex items-center gap-4 px-4">
            <div className="w-6 h-6 border-2 border-gray-300 rounded flex-shrink-0" />
            <span className="text-sm text-gray-600">I&apos;m not a robot</span>
            <div className="ml-auto flex flex-col items-center gap-0.5">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-400 to-red-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              </div>
              <span className="text-[9px] text-gray-400 leading-tight">reCAPTCHA</span>
            </div>
          </div>

          <button
            onClick={onNext} disabled={!canContinue}
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

// ─── Step 4: Actor Physical Profile ──────────────────────────────────────────

const HEIGHTS_FT = ["4","5","6","7"];
const HEIGHTS_IN = ["0","1","2","3","4","5","6","7","8","9","10","11"];
const WEIGHTS = Array.from({ length: 221 }, (_, i) => `${i + 80} lbs`);
const EYE_COLORS = ["Brown","Blue","Green","Hazel","Gray","Amber","Other"];
const HAIR_COLORS = ["Black","Dark Brown","Brown","Light Brown","Dirty Blonde","Blonde","Auburn","Red","Gray","White","Bald","Other"];
const HAIR_LENGTHS = ["Bald / Shaved","Very Short","Short","Medium","Long","Very Long"];
const SKIN_TONES = ["Very Fair","Fair","Light","Medium","Olive","Tan","Dark","Very Dark"];
const BODY_TYPES = ["Slim / Lean","Athletic","Average / Medium","Heavy / Full-Figured","Muscular","Petite"];
const GENDERS = ["Male","Female","Non-binary","Transgender Male","Transgender Female","Gender Non-Conforming","Prefer Not to Say"];
const ETHNICITIES = [
  "Caucasian / White","African American / Black","Hispanic / Latino",
  "Asian","South Asian","East Asian","Southeast Asian","Middle Eastern",
  "Native American / Indigenous","Pacific Islander","Mixed / Multi-Racial","Other",
];
const UNIONS = ["Non-Union","SAG-AFTRA","AEA (Actors' Equity)","ACTRA","CAEA","AGVA","Other"];
const LANGUAGES = [
  "English","Spanish","French","Mandarin","Cantonese","Arabic","Portuguese",
  "German","Italian","Japanese","Korean","Russian","Hindi","Other",
];
const ACCENTS = [
  "American – Standard","American – Southern","American – New York","American – Midwest",
  "British – RP","British – Cockney","British – Scottish","Irish","Australian",
  "South African","French","German","Italian","Spanish","Russian","Indian","Other",
];
const SPECIAL_SKILLS_SUGGESTIONS = [
  "Singing","Dancing","Piano","Guitar","Drums","Violin","Martial Arts","Boxing",
  "Gymnastics","Acrobatics","Horseback Riding","Swimming","Rock Climbing",
  "Skateboarding","Skiing","Snowboarding","Stage Combat","Improv",
  "Stand-up Comedy","Magic","Juggling","Puppetry","Dialects","Stunts",
];
const DRESS_SIZES = ["0","2","4","6","8","10","12","14","16","18","20","22","24"];
const SUIT_SIZES = ["34S","36S","38S","40S","42S","44S","36R","38R","40R","42R","44R","46R","38L","40L","42L","44L","46L"];
const SHOE_SIZES_US = ["5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","12.5","13","14","15"];
const WAIST_SIZES = Array.from({ length: 31 }, (_, i) => `${i + 24}"`);
const INSEAM_SIZES = ["28\"","29\"","30\"","31\"","32\"","33\"","34\"","35\"","36\"","38\""];
const CHEST_SIZES = Array.from({ length: 21 }, (_, i) => `${i + 30}"`);

function SkillTags({
  skills,
  onAdd,
  onRemove,
}: {
  skills: string[];
  onAdd: (s: string) => void;
  onRemove: (s: string) => void;
}) {
  const [input, setInput] = useState("");

  function handleAdd(skill: string) {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onAdd(trimmed);
    }
    setInput("");
  }

  return (
    <div className="space-y-2">
      {/* existing tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {s}
              <button type="button" onClick={() => onRemove(s)} className="hover:text-red-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd(input); } }}
          placeholder="Type a skill and press Enter…"
          className={cn(inputClass, "flex-1")}
        />
        <button
          type="button"
          onClick={() => handleAdd(input)}
          className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      {/* suggestions */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {SPECIAL_SKILLS_SUGGESTIONS.filter((s) => !skills.includes(s)).slice(0, 12).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onAdd(s)}
            className="text-xs text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            + {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step4({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [form, setForm] = useState({
    gender: "", dob: "", ethnicity: "",
    heightFt: "", heightIn: "",
    weight: "", eyeColor: "", hairColor: "", hairLength: "",
    skinTone: "", bodyType: "",
    chest: "", waist: "", hips: "", inseam: "",
    shoeSize: "", dressSize: "", suitSize: "",
    union: "", languages: [] as string[], accents: [] as string[],
    specialSkills: [] as string[],
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function toggleArr(key: "languages" | "accents", val: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(val)
        ? prev[key].filter((x) => x !== val)
        : [...prev[key], val],
    }));
  }

  const canContinue = form.gender && form.dob && form.heightFt && form.eyeColor && form.hairColor && form.union;

  return (
    <div className="flex-1 bg-gray-50 py-10 px-6">
      <div className="w-full max-w-3xl mx-auto">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center">4</div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Actor Physical Profile</h1>
            <p className="text-xs text-gray-400">Physical attributes &amp; professional details used for casting submissions</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">

          {/* ── SECTION 1: Basic Info ── */}
          <div className="space-y-4">
            <SectionHeading icon="👤" title="Basic Information" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField label="Gender" value={form.gender} onChange={set("gender")} options={GENDERS} required />
              <div>
                <FieldLabel required>Date of Birth</FieldLabel>
                <input type="date" value={form.dob} onChange={(e) => set("dob")(e.target.value)}
                  className={inputClass} max={new Date().toISOString().split("T")[0]} />
              </div>
              <SelectField label="Ethnicity" value={form.ethnicity} onChange={set("ethnicity")} options={ETHNICITIES} />
            </div>
          </div>

          {/* ── SECTION 2: Physical Measurements ── */}
          <div className="space-y-4">
            <SectionHeading icon="📏" title="Physical Measurements" />

            {/* Height */}
            <div>
              <FieldLabel required>Height</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select value={form.heightFt} onChange={(e) => set("heightFt")(e.target.value)}
                    className={cn(inputClass, "appearance-none pr-9")}>
                    <option value="">Feet</option>
                    {HEIGHTS_FT.map((v) => <option key={v} value={v}>{v} ft</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={form.heightIn} onChange={(e) => set("heightIn")(e.target.value)}
                    className={cn(inputClass, "appearance-none pr-9")}>
                    <option value="">Inches</option>
                    {HEIGHTS_IN.map((v) => <option key={v} value={v}>{v} in</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField label="Weight" value={form.weight} onChange={set("weight")} options={WEIGHTS} placeholder="Select weight" />
              <SelectField label="Body Type" value={form.bodyType} onChange={set("bodyType")} options={BODY_TYPES} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SelectField label="Eye Color" value={form.eyeColor} onChange={set("eyeColor")} options={EYE_COLORS} required />
              <SelectField label="Hair Color" value={form.hairColor} onChange={set("hairColor")} options={HAIR_COLORS} required />
              <SelectField label="Hair Length" value={form.hairLength} onChange={set("hairLength")} options={HAIR_LENGTHS} />
            </div>

            <SelectField label="Skin Tone" value={form.skinTone} onChange={set("skinTone")} options={SKIN_TONES} />
          </div>

          {/* ── SECTION 3: Clothing & Sizes ── */}
          <div className="space-y-4">
            <SectionHeading icon="👗" title="Clothing &amp; Size Details" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <SelectField label="Chest / Bust" value={form.chest} onChange={set("chest")} options={CHEST_SIZES} placeholder='Select size' />
              <SelectField label="Waist" value={form.waist} onChange={set("waist")} options={WAIST_SIZES} placeholder='Select size' />
              <SelectField label="Hips" value={form.hips} onChange={set("hips")} options={WAIST_SIZES} placeholder='Select size' />
              <SelectField label="Inseam" value={form.inseam} onChange={set("inseam")} options={INSEAM_SIZES} placeholder='Select size' />
              <SelectField label="Shoe Size (US)" value={form.shoeSize} onChange={set("shoeSize")} options={SHOE_SIZES_US} placeholder='Select size' />
              <SelectField label="Dress Size" value={form.dressSize} onChange={set("dressSize")} options={DRESS_SIZES} placeholder='Select size' />
            </div>
            <SelectField label="Suit Size" value={form.suitSize} onChange={set("suitSize")} options={SUIT_SIZES} placeholder='Select suit size' />
          </div>

          {/* ── SECTION 4: Professional Info ── */}
          <div className="space-y-4">
            <SectionHeading icon="🎭" title="Professional Information" />
            <SelectField label="Union Affiliation" value={form.union} onChange={set("union")} options={UNIONS} required />

            {/* Languages */}
            <div>
              <FieldLabel>Languages Spoken</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => {
                  const selected = form.languages.includes(lang);
                  return (
                    <button
                      key={lang} type="button"
                      onClick={() => toggleArr("languages", lang)}
                      className={cn(
                        "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                        selected
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
                      )}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accents */}
            <div>
              <FieldLabel>Accents / Dialects</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((acc) => {
                  const selected = form.accents.includes(acc);
                  return (
                    <button
                      key={acc} type="button"
                      onClick={() => toggleArr("accents", acc)}
                      className={cn(
                        "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
                        selected
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
                      )}
                    >
                      {acc}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Skills */}
            <div>
              <FieldLabel>Special Skills</FieldLabel>
              <SkillTags
                skills={form.specialSkills}
                onAdd={(s) => setForm((p) => ({ ...p, specialSkills: [...p.specialSkills, s] }))}
                onRemove={(s) => setForm((p) => ({ ...p, specialSkills: p.specialSkills.filter((x) => x !== s) }))}
              />
            </div>
          </div>

          {/* Required note */}
          <p className="text-xs text-gray-400">
            <span className="text-red-500">*</span> Required fields
          </p>

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-md border border-red-500 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={onNext}
              disabled={!canContinue}
              className={cn(
                "flex-1 py-3 rounded-md text-white text-sm font-semibold transition-colors",
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
    </div>
  );
}

// ─── Step 5: Memberships ──────────────────────────────────────────────────────

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
  "Talent Representative Media Storage — all purchased marketing material is available for your Talent Representative",
  "Access to the iOS App",
];

const plusFeatures = [
  "All the benefits of Actors Access Starter plus…",
  "The ability to respond to ALL projects and roles released on Actors Access with your full profile",
  "Actors Access Media — include any media from your Talent Representative Media Storage when responding",
  "Full access to the iOS App",
];

function Step5({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex-1 bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="bg-linear-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white shadow-sm">
          <p className="text-red-100 text-xs font-medium uppercase tracking-wide mb-1">Step 5 of 5 — Final</p>
          <h1 className="text-2xl font-bold">Actors Access Memberships</h1>
          <p className="text-red-100 text-sm mt-2 leading-relaxed">
            Free to create and maintain — choose the plan that fits your career.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wide mb-4 block w-fit">
            Starter — Free
          </span>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Actors Access Starter Membership Includes:
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

        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-semibold uppercase tracking-wide">
              Actors Access+
            </span>
            <span className="text-gray-900 font-bold">
              $68.00<span className="text-gray-400 font-normal text-sm">/yr</span>
              <span className="text-gray-400 font-normal text-sm mx-1.5">or</span>
              $9.99<span className="text-gray-400 font-normal text-sm">/mo</span>
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
          Complete Registration
        </button>
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const STEP_LABELS: Record<number, string> = {
  1: "Account Type",
  2: "Guardian",
  3: "Account Info",
  4: "Physical Profile",
  5: "Membership",
};

function ProgressBar({ step, isMinor }: { step: Step; isMinor: boolean }) {
  const steps = isMinor ? [1, 2, 3, 4, 5] : [1, 3, 4, 5];
  const currentIndex = steps.indexOf(step);
  const pct = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">
            Step {currentIndex + 1} of {steps.length} — {STEP_LABELS[step]}
          </span>
          <span className="text-xs text-gray-400">{Math.round(pct)}% complete</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
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
          <Link href="/" className="text-red-100 hover:text-white text-sm font-medium transition-colors">
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
      {step > 1 && <ProgressBar step={step} isMinor={ageOption === "minor"} />}

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
      {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <Step3 onNext={() => setStep(4)} />}
      {step === 4 && <Step4 onBack={() => setStep(3)} onNext={() => setStep(5)} />}
      {step === 5 && <Step5 onNext={() => alert("Registration complete! 🎉")} />}
    </div>
  );
}
