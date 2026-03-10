"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Check, FileText, GraduationCap, PenLine, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { DOCTORS } from "@/lib/api/mock-doctors";
import { cn } from "@/lib/utils/cn";

type Step = "doctor" | "documents" | "sign";
const STEPS: Step[] = ["doctor", "documents", "sign"];

const ICONS = [GraduationCap, FileText, PenLine];

export default function DeclarationPage() {
  const t = useTranslations("declaration");
  const locale = useLocale() as "uk" | "en";
  const [step, setStep] = useState<Step>("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const stepIndex = STEPS.indexOf(step);

  const familyDoctors = DOCTORS.filter((d) => d.category === "pediatrics").concat(DOCTORS.slice(0, 2));

  const handleSign = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-[#10B981]/10 border-2 border-[#10B981] flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-[#10B981]" />
          </div>
          <h2 className="text-2xl font-light text-[#0C1929] mb-3">
            {locale === "uk" ? "Декларацію підписано!" : "Declaration Signed!"}
          </h2>
          <p className="text-[#4A6180] font-light leading-relaxed text-sm">
            {locale === "uk"
              ? "Вашу декларацію успішно зареєстровано. Ви отримаєте підтвердження на вказаний email."
              : "Your declaration has been successfully registered. You will receive confirmation at the provided email."}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F2F6FB] border-b border-[#D6E3F0]">
        <div className="container-clinic py-12">
          <SectionHeader title={t("title")} subtitle={t("subtitle")} tag="eHealth" />
        </div>
      </div>

      <section className="section-padding bg-white">
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* Progress */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute top-5 left-8 right-8 h-px bg-[#D6E3F0]" />
            {STEPS.map((s, i) => {
              const Icon = ICONS[i];
              return (
                <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                    i < stepIndex ? "bg-[#10B981] border-[#10B981]" : i === stepIndex ? "bg-[#0D3A7E] border-[#0D3A7E]" : "bg-white border-[#D6E3F0]"
                  )}>
                    {i < stepIndex ? <Check size={16} className="text-white" /> : <Icon size={16} className={i === stepIndex ? "text-white" : "text-[#8298B0]"} />}
                  </div>
                  <span className={cn("text-xs font-light", i === stepIndex ? "text-[#0D3A7E] font-medium" : "text-[#8298B0]")}>
                    {t(`steps.${s}` as any)}
                  </span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Doctor */}
            {step === "doctor" && (
              <motion.div key="doctor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("chooseDoctor")}</h3>
                <div className="space-y-3">
                  {familyDoctors.slice(0, 4).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDoctor(d.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-[6px] border text-left transition-all",
                        selectedDoctor === d.id ? "border-[#0D3A7E] bg-[#EEF3FB]" : "border-[#D6E3F0] hover:border-[#0D3A7E]/40"
                      )}
                    >
                      <img src={d.photo} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-[#0C1929]">{d.name[locale]}</div>
                        <div className="text-xs text-[#4A6180] font-light">{d.specialty[locale]}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="primary" disabled={!selectedDoctor} onClick={() => setStep("documents")} icon={<ChevronRight size={15} />} iconPosition="right">
                    {locale === "uk" ? "Далі" : "Next"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Documents */}
            {step === "documents" && (
              <motion.div key="documents" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("uploadDocs")}</h3>
                <div className="space-y-4">
                  {[
                    { uk: "Паспорт або ID-картка", en: "Passport or ID card" },
                    { uk: "Ідентифікаційний код", en: "Tax ID number" },
                    { uk: "Поліс медичного страхування (якщо є)", en: "Health insurance policy (if any)" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-[#D6E3F0] rounded-[6px] bg-[#F8FAFC]">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-[#4A6180]" />
                        <span className="text-sm text-[#0C1929] font-light">{doc[locale]}</span>
                      </div>
                      <button className="text-xs text-[#1A9EC9] font-medium hover:text-[#0D3A7E] transition-colors">
                        {locale === "uk" ? "Завантажити" : "Upload"}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep("doctor")}>← {locale === "uk" ? "Назад" : "Back"}</Button>
                  <Button variant="primary" onClick={() => setStep("sign")} icon={<ChevronRight size={15} />} iconPosition="right">
                    {locale === "uk" ? "Далі" : "Next"}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Sign */}
            {step === "sign" && (
              <motion.div key="sign" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("signDeclaration")}</h3>
                <div className="bg-[#F8FAFC] border border-[#D6E3F0] rounded-[6px] p-6 mb-6 text-sm text-[#4A6180] font-light leading-relaxed">
                  <p className="mb-3">
                    {locale === "uk"
                      ? "Я, пацієнт, підтверджую свою згоду на медичне обслуговування у клініці Asklepiy та обираю лікаря первинної медичної допомоги для надання послуг відповідно до Програми медичних гарантій."
                      : "I, the patient, confirm my consent to medical care at Asklepiy Clinic and choose a primary care physician to provide services in accordance with the Medical Guarantees Program."}
                  </p>
                  <p>
                    {locale === "uk"
                      ? "Ця декларація надає право обраному лікарю мати доступ до моєї медичної інформації з метою надання первинної медичної допомоги."
                      : "This declaration authorizes the chosen doctor to access my medical information for the purpose of providing primary health care."}
                  </p>
                </div>
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#D6E3F0] text-[#0D3A7E] accent-[#0D3A7E]"
                  />
                  <span className="text-sm text-[#4A6180] font-light">
                    {locale === "uk"
                      ? "Я ознайомився з умовами декларації та підтверджую свою згоду"
                      : "I have read the declaration terms and confirm my consent"}
                  </span>
                </label>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep("documents")}>← {locale === "uk" ? "Назад" : "Back"}</Button>
                  <Button variant="primary" disabled={!agreed} loading={loading} onClick={handleSign} icon={<PenLine size={15} />} iconPosition="right">
                    {locale === "uk" ? "Підписати декларацію" : "Sign Declaration"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
