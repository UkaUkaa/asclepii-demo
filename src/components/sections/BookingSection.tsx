import { Lock, CheckCircle, Smartphone } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { BookingWizard } from "@/features/booking/BookingWizard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function BookingSection() {
  const t = useTranslations("home.booking");
  const locale = useLocale();

  return (
    <section className="section-padding bg-white">
      <div className="container-clinic">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div>
            <SectionHeader
              title={t("title")}
              subtitle={t("subtitle")}
              tag="Online"
            />
            <div className="mt-8 space-y-5">
              {[
                { num: "01", uk: "Оберіть медичний напрямок та лікаря", en: "Select medical service and doctor" },
                { num: "02", uk: "Виберіть зручний час прийому", en: "Choose a convenient appointment time" },
                { num: "03", uk: "Підтвердіть запис — ми зв'яжемось з вами", en: "Confirm booking — we'll contact you" },
              ].map(({ num, uk, en }) => (
                <div key={num} className="flex items-start gap-2 sm:gap-4">
                  <div className="w-10 h-10 rounded-[6px] bg-[#EEF3FB] border border-[#D5E2F5] flex items-center justify-center text-sm font-medium text-[#0D3A7E] flex-shrink-0">
                    {num}
                  </div>
                  <p className="text-[#4A6180] font-light leading-relaxed pt-2 text-left">
                    {locale === "uk" ? uk : en}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-3 justify-center sm:justify-start">
              {[
                { icon: Lock, uk: "Захищені дані", en: "Secure Data" },
                { icon: CheckCircle, uk: "Без передоплати", en: "No Prepayment" },
                { icon: Smartphone, uk: "SMS підтвердження", en: "SMS Confirmation" },
              ].map(({ icon: Icon, uk, en }) => (
                <span key={uk} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F6FB] border border-[#D6E3F0] rounded-[4px] text-xs text-[#4A6180] font-light">
                  <Icon size={12} className="text-[#0D3A7E] flex-shrink-0" />
                  {locale === "uk" ? uk : en}
                </span>
              ))}
            </div>
          </div>

          {/* Right wizard */}
          <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_4px_30px_rgba(13,58,126,0.08)]">
            <BookingWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
