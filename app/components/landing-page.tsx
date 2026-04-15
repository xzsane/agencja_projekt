"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const plans = [
  {
    name: "Starter AI",
    price: "2 900 PLN",
    period: "/miesiąc",
    description: "Dla marek, które chcą szybko odpalić automatyzację i performance.",
    features: [
      "Strategia AI Growth",
      "2 kampanie reklamowe",
      "Automatyzacje CRM",
      "Raport tygodniowy",
    ],
    featured: false,
  },
  {
    name: "Scale Engine",
    price: "6 900 PLN",
    period: "/miesiąc",
    description: "Najczęściej wybierany pakiet dla firm chcących skalować sprzedaż.",
    features: [
      "Pełny lejek leadowy AI",
      "A/B testy kreacji",
      "3 kanały pozyskania",
      "Dashboard KPI live",
    ],
    featured: true,
  },
  {
    name: "Enterprise Flow",
    price: "Indywidualnie",
    period: "",
    description: "Kompleksowe wdrożenia AI i custom automatyzacje dla dużych zespołów.",
    features: [
      "Architektura AI end-to-end",
      "Integracje z ERP/CRM",
      "Dedykowany zespół",
      "SLA i wsparcie 24/7",
    ],
    featured: false,
  },
];

export default function LandingPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const animatedWords = useMemo(
    () => ["Growth", "AI", "Automation", "Funnels", "Performance"],
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const { error } = await supabase.from("leads").insert({
      name: formState.name,
      email: formState.email,
      company: formState.company,
      message: formState.message,
    });

    if (error) {
      setStatus("error");
      setStatusMessage("Nie udało się wysłać formularza. Spróbuj ponownie.");
      return;
    }

    setStatus("success");
    setStatusMessage("Dziękujemy! Odezwiemy się do Ciebie w ciągu 24h.");
    setFormState(initialFormState);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:46px_46px] opacity-45" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-16 md:px-10">
        <section className="space-y-8 border border-slate-800 bg-slate-950/40 p-8 backdrop-blur-sm md:p-12">
          <motion.span
            className="inline-flex items-center gap-2 border border-slate-800 px-3 py-1 text-xs uppercase tracking-[0.28em] text-violet-300"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} /> LUMINA AI
          </motion.span>

          <div className="space-y-6">
            <motion.h1
              className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Skalujemy sprzedaż dzięki{" "}
              <span className="text-violet-400">systemom AI, które pracują 24/7.</span>
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              {animatedWords.map((word, index) => (
                <motion.span
                  key={word}
                  className="border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-300"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.18,
                    ease: "easeInOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="max-w-2xl text-slate-400"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Projektujemy lejki i automatyzacje w stylu &quot;ship fast, scale
              faster&quot;.
              Zero przypadkowych działań, 100% danych i mierzalnych KPI.
            </motion.p>
          </div>
        </section>

        <section id="pricing" className="space-y-6">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold md:text-4xl">Bento Pricing Grid</h2>
            <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
              Transparentne pakiety
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {plans.map((plan, index) => (
              <motion.article
                key={plan.name}
                className={`border border-slate-800 bg-slate-950/50 p-6 ${
                  index === 1 ? "md:col-span-3 md:row-span-2" : "md:col-span-3"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                {plan.featured ? (
                  <span className="mb-4 inline-block border border-violet-500/60 bg-violet-500/10 px-2 py-1 text-xs uppercase tracking-[0.2em] text-violet-300">
                    Najpopularniejszy
                  </span>
                ) : null}
                <h3 className="text-2xl font-medium">{plan.name}</h3>
                <p className="mt-2 text-slate-400">{plan.description}</p>
                <p className="mt-6 text-3xl text-violet-300">
                  {plan.price}
                  <span className="ml-1 text-base text-slate-400">{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 size={16} className="text-violet-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="grid gap-10 border border-slate-800 bg-slate-950/50 p-8 md:grid-cols-2 md:p-10"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold md:text-4xl">Skontaktuj się z nami</h2>
            <p className="text-slate-400">
              Zostaw kontakt, a przygotujemy plan wzrostu oparty o AI dla Twojej firmy.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="Imię i nazwisko"
              className="w-full border border-slate-800 bg-black px-4 py-3 outline-none transition-colors focus:border-violet-400"
              value={formState.name}
              onChange={(event) =>
                setFormState((current) => ({ ...current, name: event.target.value }))
              }
            />
            <input
              required
              type="email"
              placeholder="Adres e-mail"
              className="w-full border border-slate-800 bg-black px-4 py-3 outline-none transition-colors focus:border-violet-400"
              value={formState.email}
              onChange={(event) =>
                setFormState((current) => ({ ...current, email: event.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Nazwa firmy"
              className="w-full border border-slate-800 bg-black px-4 py-3 outline-none transition-colors focus:border-violet-400"
              value={formState.company}
              onChange={(event) =>
                setFormState((current) => ({ ...current, company: event.target.value }))
              }
            />
            <textarea
              required
              rows={4}
              placeholder="Napisz, jaki cel chcesz osiągnąć"
              className="w-full resize-none border border-slate-800 bg-black px-4 py-3 outline-none transition-colors focus:border-violet-400"
              value={formState.message}
              onChange={(event) =>
                setFormState((current) => ({ ...current, message: event.target.value }))
              }
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 border border-violet-500 bg-violet-500/15 px-5 py-3 text-violet-200 transition-colors hover:bg-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Wysyłanie..." : "Wyślij zapytanie"}
              <ArrowRight size={16} />
            </button>

            {statusMessage ? (
              <p
                className={
                  status === "error" ? "text-sm text-rose-300" : "text-sm text-emerald-300"
                }
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  );
}
