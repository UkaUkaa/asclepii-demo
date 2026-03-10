"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Loader2, Activity, Calendar, Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SERVICES } from "@/lib/api/mock-services";
import { DOCTORS } from "@/lib/api/mock-doctors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { cn } from "@/lib/utils/cn";

type Step = "service" | "doctor" | "time" | "confirm";
const STEPS: Step[] = ["service", "doctor", "time", "confirm"];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

const SMART_SUGGESTIONS = [
  { key: "soonest", date: "2026-03-10", time: "09:00" },
  { key: "morning", date: "2026-03-11", time: "08:30" },
  { key: "familiar", date: "2026-03-12", time: "10:30" },
];

function generateCalendar(year: number, month: number) {
  const days: (number | null)[] = [];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

const MONTHS_UK = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_UK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const DAYS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface BookingState {
  serviceKey: string | null;
  doctorId: string | null;
  date: number | null;
  month: number;
  year: number;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function BookingWizard() {
  const t = useTranslations("booking");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const today = new Date();

  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [direction, setDirection] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    serviceKey: null,
    doctorId: null,
    date: null,
    month: today.getMonth(),
    year: today.getFullYear(),
    time: null,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const stepIndex = STEPS.indexOf(currentStep);

  const goNext = async () => {
    if (currentStep === "doctor") {
      setIsSearching(true);
      await new Promise((r) => setTimeout(r, 2000));
      setIsSearching(false);
    }
    setDirection(1);
    setCurrentStep(STEPS[stepIndex + 1]);
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep(STEPS[stepIndex - 1]);
  };

  const handleSubmit = async () => {
    setIsSearching(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSearching(false);
    setIsSuccess(true);
  };

  const monthName = locale === "uk" ? MONTHS_UK[booking.month] : MONTHS_EN[booking.month];
  const dayNames = locale === "uk" ? DAYS_UK : DAYS_EN;
  const calDays = generateCalendar(booking.year, booking.month);

  const selectedService = SERVICES.find((s) => s.key === booking.serviceKey);
  const selectedDoctor = DOCTORS.find((d) => d.id === booking.doctorId);
  const filteredDoctors = booking.serviceKey
    ? DOCTORS.filter((d) => d.category === booking.serviceKey)
    : DOCTORS;

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-[#10B981]/10 border-2 border-[#10B981] flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[#10B981]" />
        </div>
        <h3 className="text-xl font-light text-[#0C1929] mb-2">{t("success")}</h3>
        <p className="text-[#4A6180] text-sm font-light">{t("successMsg")}</p>
        <Button
          variant="ghost"
          className="mt-8"
          onClick={() => { setIsSuccess(false); setCurrentStep("service"); setBooking({ ...booking, serviceKey: null, doctorId: null, date: null, time: null, name: "", phone: "", email: "", notes: "" }); }}
        >
          {locale === "uk" ? "Записатись ще раз" : "Book Again"}
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-4 left-0 right-0 h-px bg-[#D6E3F0] -z-0" />
        {STEPS.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-2 relative z-10">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium transition-all",
                i < stepIndex
                  ? "bg-[#10B981] border-[#10B981] text-white"
                  : i === stepIndex
                  ? "bg-[#0D3A7E] border-[#0D3A7E] text-white"
                  : "bg-white border-[#D6E3F0] text-[#8298B0]"
              )}
              animate={{ scale: i === stepIndex ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {i < stepIndex ? <Check size={14} /> : i + 1}
            </motion.div>
            <span className={cn(
              "text-xs font-light hidden sm:block",
              i === stepIndex ? "text-[#0D3A7E] font-medium" : "text-[#8298B0]"
            )}>
              {t(`steps.${step}`)}
            </span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[320px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Step 1: Service */}
            {currentStep === "service" && (
              <div>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("selectService")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES.slice(0, 9).map((service) => {
                    return (
                      <motion.button
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setBooking((b) => ({ ...b, serviceKey: service.key }))}
                        className={cn(
                          "flex flex-col items-start p-4 rounded-[6px] border text-left transition-all",
                          booking.serviceKey === service.key
                            ? "border-[#0D3A7E] bg-[#EEF3FB]"
                            : "border-[#D6E3F0] bg-white hover:border-[#0D3A7E]/50 hover:bg-[#F8FAFC]"
                        )}
                      >
                        <div
                          className="w-8 h-8 rounded-[4px] flex items-center justify-center mb-2"
                          style={{ background: service.bgColor, color: service.color }}
                        >
                          <Activity size={14} />
                        </div>
                        <span className="text-xs font-medium text-[#0C1929]">
                          {tServices(`items.${service.key}.name`)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Doctor */}
            {currentStep === "doctor" && (
              <div>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("selectDoctor")}</h3>
                <div className="space-y-3">
                  {(filteredDoctors.length > 0 ? filteredDoctors : DOCTORS).slice(0, 4).map((doctor) => (
                    <motion.button
                      key={doctor.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setBooking((b) => ({ ...b, doctorId: doctor.id }))}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-[6px] border text-left transition-all",
                        booking.doctorId === doctor.id
                          ? "border-[#0D3A7E] bg-[#EEF3FB]"
                          : "border-[#D6E3F0] bg-white hover:border-[#0D3A7E]/40"
                      )}
                    >
                      <img
                        src={doctor.photo}
                        alt={doctor.name[locale as "uk" | "en"]}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#0C1929] truncate">
                          {doctor.name[locale as "uk" | "en"]}
                        </div>
                        <div className="text-xs text-[#4A6180] font-light">
                          {doctor.specialty[locale as "uk" | "en"]}
                        </div>
                        <div className="text-xs text-[#8298B0] font-light mt-0.5">
                          {doctor.experience} {locale === "uk" ? "р. досвіду" : "yrs exp"}
                        </div>
                      </div>
                      <div className="text-xs text-[#0D3A7E] font-medium">
                        ⭐ {doctor.rating}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Time */}
            {currentStep === "time" && !isSearching && (
              <div>
                <h3 className="text-lg font-light text-[#0C1929] mb-6">{t("selectDate")}</h3>

                {/* Smart suggestions */}
                <div className="mb-5">
                  <p className="text-xs text-[#8298B0] uppercase tracking-wider mb-2 font-light">
                    {locale === "uk" ? "Розумні пропозиції" : "Smart Suggestions"}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {SMART_SUGGESTIONS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setBooking((b) => ({ ...b, date: parseInt(s.date.split("-")[2]), time: s.time }))}
                        className={cn(
                          "px-3 py-1.5 text-xs rounded-[4px] border transition-all",
                          booking.time === s.time && booking.date === parseInt(s.date.split("-")[2])
                            ? "border-[#0D3A7E] bg-[#EEF3FB] text-[#0D3A7E]"
                            : "border-[#D6E3F0] text-[#4A6180] hover:border-[#0D3A7E]/40"
                        )}
                      >
                        {t(`suggestions.${s.key}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mini calendar */}
                <div className="bg-[#F8FAFC] rounded-[6px] p-4 border border-[#D6E3F0] mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => setBooking((b) => {
                        const d = new Date(b.year, b.month - 1, 1);
                        return { ...b, month: d.getMonth(), year: d.getFullYear() };
                      })}
                      className="text-[#4A6180] hover:text-[#0D3A7E] text-sm px-2"
                    >
                      ‹
                    </button>
                    <span className="text-sm font-medium text-[#0C1929]">
                      {monthName} {booking.year}
                    </span>
                    <button
                      onClick={() => setBooking((b) => {
                        const d = new Date(b.year, b.month + 1, 1);
                        return { ...b, month: d.getMonth(), year: d.getFullYear() };
                      })}
                      className="text-[#4A6180] hover:text-[#0D3A7E] text-sm px-2"
                    >
                      ›
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {dayNames.map((d) => (
                      <span key={d} className="text-[10px] text-[#8298B0] font-medium">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calDays.map((day, i) => (
                      <button
                        key={i}
                        disabled={!day}
                        onClick={() => day && setBooking((b) => ({ ...b, date: day }))}
                        className={cn(
                          "h-8 w-full rounded-[4px] text-xs transition-all",
                          !day ? "cursor-default" : "hover:bg-[#EEF3FB]",
                          day && day === booking.date
                            ? "bg-[#0D3A7E] text-white hover:bg-[#0D3A7E]"
                            : day ? "text-[#0C1929]" : "text-transparent"
                        )}
                      >
                        {day || ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slots */}
                {booking.date && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBooking((b) => ({ ...b, time: slot }))}
                        className={cn(
                          "py-2 text-xs rounded-[4px] border transition-all font-medium",
                          booking.time === slot
                            ? "bg-[#0D3A7E] text-white border-[#0D3A7E]"
                            : "border-[#D6E3F0] text-[#4A6180] hover:border-[#0D3A7E]/50"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Searching loader */}
            {currentStep === "time" && isSearching && (
              <div className="flex flex-col items-center justify-center py-16 gap-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-[#D6E3F0] border-t-[#0D3A7E] animate-spin" />
                  <div className="absolute inset-3 rounded-full bg-[#EEF3FB]" />
                </div>
                <p className="text-sm text-[#4A6180] font-light text-center">
                  {t("searching")}
                </p>
              </div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === "confirm" && (
              <div className="space-y-5">
                <h3 className="text-lg font-light text-[#0C1929] mb-1">{t("confirmBooking")}</h3>

                {/* Summary */}
                {selectedDoctor && (
                  <div className="bg-[#F2F6FB] rounded-[6px] p-4 border border-[#D6E3F0]">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={selectedDoctor.photo}
                        alt={selectedDoctor.name[locale as "uk" | "en"]}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-[#0C1929]">
                          {selectedDoctor.name[locale as "uk" | "en"]}
                        </div>
                        <div className="text-xs text-[#4A6180]">
                          {selectedDoctor.specialty[locale as "uk" | "en"]}
                        </div>
                      </div>
                    </div>
                    {booking.date && booking.time && (
                      <div className="flex items-center gap-3 text-xs text-[#4A6180] font-light">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} className="text-[#0D3A7E]" />
                          {booking.date}.{String(booking.month + 1).padStart(2, "0")}.{booking.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-[#0D3A7E]" />
                          {booking.time}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Form */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t("name")}
                    value={booking.name}
                    onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))}
                    placeholder={locale === "uk" ? "Ім'я та прізвище" : "First and last name"}
                  />
                  <PhoneInput
                    label={t("phone")}
                    value={booking.phone}
                    onChange={(value) => setBooking((b) => ({ ...b, phone: value }))}
                  />
                  <Input
                    label={t("email")}
                    value={booking.email}
                    onChange={(e) => setBooking((b) => ({ ...b, email: e.target.value }))}
                    placeholder={locale === "uk" ? "email@example.com" : "email@example.com"}
                    type="email"
                    className="sm:col-span-2"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {!isSearching && !isSuccess && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EBF1F8]">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={stepIndex === 0}
            className={stepIndex === 0 ? "invisible" : ""}
          >
            ← {t("back")}
          </Button>

          {currentStep === "confirm" ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSearching}
              icon={<Check size={15} />}
              iconPosition="right"
            >
              {t("submit")}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={goNext}
              disabled={
                (currentStep === "service" && !booking.serviceKey) ||
                (currentStep === "doctor" && !booking.doctorId) ||
                (currentStep === "time" && (!booking.date || !booking.time))
              }
              icon={<ChevronRight size={15} />}
              iconPosition="right"
            >
              {t("next")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
