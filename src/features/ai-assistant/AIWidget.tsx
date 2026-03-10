"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Minimize2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYMPTOM_RESPONSES: Record<string, Record<string, string>> = {
  uk: {
    "болить спина": "Для болю у спині рекомендуємо:\n• **Консультація вертебролога** — аналіз стану хребта\n• **МРТ хребта** — точна діагностика\n• **Масаж та фізіотерапія** — для зняття напруги\n\nБажаєте записатись до спеціаліста?",
    "голова болить": "Хронічний головний біль може вказувати на різні стани. Рекомендуємо:\n• **Консультація невролога** — первинна оцінка\n• **Аналіз крові** — загальна діагностика\n\nЗапишіться до нашого невролога з 22-річним досвідом.",
    "серце": "Симптоми з боку серця потребують уваги кардіолога. Рекомендуємо:\n• **ЕКГ** — базова діагностика\n• **Консультація кардіолога** — повне обстеження\n• **УЗД серця** — якщо необхідно",
    "аналізи": "Ми пропонуємо повний спектр лабораторних досліджень:\n• Загальний аналіз крові\n• Біохімічний аналіз\n• Гормональна панель\n\nМожна замовити онлайн або здати у нашій лабораторії.",
  },
  en: {
    "back pain": "For back pain, we recommend:\n• **Vertebrologist consultation** — spinal assessment\n• **Spinal MRI** — precise diagnostics\n• **Massage & physiotherapy** — tension relief\n\nWould you like to book an appointment?",
    "headache": "Chronic headache may indicate various conditions. We recommend:\n• **Neurologist consultation** — initial assessment\n• **Blood test** — general diagnostics\n\nBook our neurologist with 22 years of experience.",
    "heart": "Cardiac symptoms require cardiology attention. We recommend:\n• **ECG** — basic diagnostics\n• **Cardiologist consultation** — full examination\n• **Heart ultrasound** — if needed",
    "tests": "We offer a full range of laboratory services:\n• Complete blood count\n• Biochemistry panel\n• Hormone panel\n\nOrder online or visit our laboratory.",
  },
};

const PAGE_CONTEXT: Record<string, Record<string, string>> = {
  uk: {
    "/napryamky": "Бачу, що вас цікавлять наші медичні напрямки. Чи є конкретна спеціальність, яка вас цікавить?",
    "/gynecology": "Бачу, що вас цікавить жіноче здоров'я. Бажаєте переглянути розклад нашого гінеколога?",
    "/likari": "Шукаєте спеціаліста? Можу допомогти знайти потрібного лікаря за напрямком.",
    "/tsiny": "Переглядаєте наш прайс-лист? Можу порівняти пакети послуг або відповісти на питання щодо вартості.",
    "/kontakty": "Потрібна допомога з контактами? Можу надати номери телефонів або розповісти, як дістатись.",
  },
  en: {
    "/services": "I see you're exploring our medical services. Is there a specific specialty you're interested in?",
    "/doctors": "Looking for a specialist? I can help you find the right doctor by specialty.",
    "/prices": "Browsing our price list? I can compare service packages or answer pricing questions.",
    "/contacts": "Need help with contacts? I can provide phone numbers or directions.",
  },
};

function getAIResponse(input: string, locale: string): string {
  const responses = SYMPTOM_RESPONSES[locale] || SYMPTOM_RESPONSES.uk;
  const lowerInput = input.toLowerCase();

  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }

  if (locale === "uk") {
    return "Дякую за ваше запитання! Для детальної консультації рекомендуємо:\n• Зателефонувати на рецепцію: **+38 (057) 000-00-01**\n• Або записатись онлайн через форму запису\n\nЧи є ще щось, чим я можу допомогти?";
  }
  return "Thank you for your question! For detailed consultation, we recommend:\n• Calling reception: **+38 (057) 000-00-01**\n• Or booking online through our booking form\n\nIs there anything else I can help you with?";
}

function formatMessage(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < part.split("\n").length - 1 && <br />}
      </span>
    ));
  });
}

export function AIWidget() {
  const t = useTranslations("ai");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [contextShown, setContextShown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      content: t("greeting"),
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Context-aware messages
  useEffect(() => {
    if (!isOpen || contextShown) return;
    const pageCtx = PAGE_CONTEXT[locale]?.[pathname];
    if (!pageCtx) return;

    const timer = setTimeout(() => {
      setContextShown(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `ctx-${Date.now()}`,
          role: "assistant",
          content: pageCtx,
          timestamp: new Date(),
        },
      ]);
    }, 30000);

    return () => clearTimeout(timer);
  }, [pathname, isOpen, locale, contextShown]);

  // Show widget hint after 10s on page
  const [showHint, setShowHint] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isThinking) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      },
    ]);
    setIsThinking(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const response = getAIResponse(text, locale);
    setMessages((prev) => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      },
    ]);
    setIsThinking(false);
  }, [input, isThinking, locale]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Hint bubble */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            // className="glass rounded-[6px] px-4 py-2.5 shadow-[0_4px_20px_rgba(13,58,126,0.15)] border border-white/50 max-w-[200px] cursor-pointer"
            onClick={() => { setIsOpen(true); setShowHint(false); }}
          >
            {/* <p className="text-xs text-[#0C1929] font-light leading-relaxed">
              {locale === "uk" ? "Маю питання? Запитайте мене!" : "Have questions? Ask me!"}
            </p> */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] glass rounded-[6px] shadow-[0_20px_60px_rgba(13,58,126,0.2)] border border-white/50 flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#D6E3F0]/50 bg-[#0D3A7E]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#1A9EC9] flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t("title")}</div>
                  <div className="text-white/50 text-[10px] font-light">
                    {locale === "uk" ? "Онлайн" : "Online"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 rounded-[4px] text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
                  aria-label="Minimize"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-[4px] text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all"
                  aria-label="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F2F6FB]/80">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-2 max-w-[92%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#0D3A7E] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-[6px] px-3 py-2 text-xs leading-relaxed",
                      msg.role === "user"
                        ? "bg-[#0D3A7E] text-white"
                        : "bg-white text-[#0C1929] shadow-[0_1px_4px_rgba(13,58,126,0.08)] border border-[#EBF1F8]"
                    )}
                  >
                    {formatMessage(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D3A7E] flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white rounded-[6px] px-3 py-2 shadow-[0_1px_4px_rgba(13,58,126,0.08)] border border-[#EBF1F8]">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#8298B0]"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#D6E3F0]/50 bg-white/80">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  className="flex-1 h-9 px-3 text-xs bg-[#F2F6FB] border border-[#D6E3F0] rounded-[6px] outline-none focus:border-[#1A9EC9] focus:ring-1 focus:ring-[#1A9EC9]/20 transition-all placeholder:text-[#8298B0]"
                  disabled={isThinking}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isThinking}
                  className="w-9 h-9 rounded-[6px] bg-[#0D3A7E] text-white flex items-center justify-center hover:bg-[#0A2E63] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={t("send")}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized state */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-[6px] px-4 py-2.5 shadow-[0_4px_20px_rgba(13,58,126,0.15)] border border-white/50 flex items-center gap-3 cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="w-6 h-6 rounded-full bg-[#0D3A7E] flex items-center justify-center">
              <Bot size={13} className="text-white" />
            </div>
            <span className="text-xs text-[#0C1929] font-medium">{t("title")}</span>
            <div className="w-2 h-2 bg-[#10B981] rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => { setIsOpen(true); setShowHint(false); }}
          className="relative w-14 h-14 rounded-full bg-[#0D3A7E] text-white shadow-[0_4px_20px_rgba(13,58,126,0.4)] hover:shadow-[0_6px_28px_rgba(13,58,126,0.5)] flex items-center justify-center"
          aria-label={t("title")}
        >
          <div className="absolute inset-0 rounded-full bg-[#1A9EC9]/30 ai-pulse" />
          <MessageCircle size={22} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </motion.button>
      )}
    </div>
  );
}
