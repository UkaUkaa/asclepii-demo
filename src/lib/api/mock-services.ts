import { Heart, Brain, Baby, Bone, Eye, Droplets, Microscope, Activity, Stethoscope, Zap, FlaskConical, Scan } from "lucide-react";

export interface Service {
  id: string;
  key: string;
  icon: string;
  color: string;
  bgColor: string;
  category: string;
}

export const SERVICES: Service[] = [
  { id: "1", key: "cardiology", icon: "Heart", color: "#E53935", bgColor: "#FEE2E2", category: "therapy" },
  { id: "2", key: "neurology", icon: "Brain", color: "#7B1FA2", bgColor: "#F3E5F5", category: "therapy" },
  { id: "3", key: "gynecology", icon: "Activity", color: "#E91E63", bgColor: "#FCE4EC", category: "women" },
  { id: "4", key: "pediatrics", icon: "Baby", color: "#F57C00", bgColor: "#FFF3E0", category: "children" },
  { id: "5", key: "orthopedics", icon: "Bone", color: "#0D3A7E", bgColor: "#EEF3FB", category: "surgery" },
  { id: "6", key: "ophthalmology", icon: "Eye", color: "#0097A7", bgColor: "#E0F7FA", category: "therapy" },
  { id: "7", key: "dermatology", icon: "Droplets", color: "#388E3C", bgColor: "#E8F5E9", category: "therapy" },
  { id: "8", key: "gastro", icon: "Stethoscope", color: "#5D4037", bgColor: "#EFEBE9", category: "therapy" },
  { id: "9", key: "endocrinology", icon: "FlaskConical", color: "#1565C0", bgColor: "#E3F2FD", category: "therapy" },
  { id: "10", key: "urology", icon: "Droplets", color: "#00838F", bgColor: "#E0F7FA", category: "therapy" },
  { id: "11", key: "surgery", icon: "Zap", color: "#C62828", bgColor: "#FFEBEE", category: "surgery" },
  { id: "12", key: "diagnostics", icon: "Scan", color: "#1A9EC9", bgColor: "#E6F7FC", category: "diagnostics" },
];

export interface PriceCategory {
  id: string;
  key: string;
  items: PriceItem[];
}

export interface PriceItem {
  id: string;
  name: { uk: string; en: string };
  price: number;
  unit?: { uk: string; en: string };
}

export const PRICE_CATEGORIES: PriceCategory[] = [
  {
    id: "1",
    key: "consultation",
    items: [
      { id: "c1", name: { uk: "Первинна консультація терапевта", en: "Primary therapist consultation" }, price: 450 },
      { id: "c2", name: { uk: "Повторна консультація терапевта", en: "Follow-up therapist consultation" }, price: 350 },
      { id: "c3", name: { uk: "Первинна консультація кардіолога", en: "Primary cardiologist consultation" }, price: 650 },
      { id: "c4", name: { uk: "Первинна консультація невролога", en: "Primary neurologist consultation" }, price: 600 },
      { id: "c5", name: { uk: "Консультація гінеколога", en: "Gynecologist consultation" }, price: 550 },
      { id: "c6", name: { uk: "Консультація педіатра", en: "Pediatrician consultation" }, price: 500 },
      { id: "c7", name: { uk: "Консультація ортопеда", en: "Orthopedist consultation" }, price: 600 },
    ],
  },
  {
    id: "2",
    key: "diagnostics",
    items: [
      { id: "d1", name: { uk: "ЕКГ", en: "ECG" }, price: 280 },
      { id: "d2", name: { uk: "УЗД органів черевної порожнини", en: "Abdominal ultrasound" }, price: 450 },
      { id: "d3", name: { uk: "УЗД серця (ехокардіографія)", en: "Heart ultrasound (echocardiography)" }, price: 750 },
      { id: "d4", name: { uk: "МРТ головного мозку", en: "Brain MRI" }, price: 2800 },
      { id: "d5", name: { uk: "МРТ хребта (один відділ)", en: "Spinal MRI (one section)" }, price: 2400 },
      { id: "d6", name: { uk: "КТ органів грудної клітки", en: "Chest CT scan" }, price: 2200 },
    ],
  },
  {
    id: "3",
    key: "analyses",
    items: [
      { id: "a1", name: { uk: "Загальний аналіз крові", en: "Complete blood count" }, price: 120 },
      { id: "a2", name: { uk: "Загальний аналіз сечі", en: "Urinalysis" }, price: 90 },
      { id: "a3", name: { uk: "Біохімічний аналіз крові", en: "Blood biochemistry panel" }, price: 350 },
      { id: "a4", name: { uk: "Ліпідний профіль", en: "Lipid profile" }, price: 280 },
      { id: "a5", name: { uk: "Гормони щитоподібної залози", en: "Thyroid hormones" }, price: 420 },
      { id: "a6", name: { uk: "Аналіз на COVID-19 (ПЛР)", en: "COVID-19 test (PCR)" }, price: 380 },
    ],
  },
];

export const NEWS_ITEMS = [
  {
    id: "1",
    slug: "new-mri-equipment",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    category: { uk: "Новини клініки", en: "Clinic News" },
    title: { uk: "Нове МРТ обладнання 3 Тесла від Siemens", en: "New 3 Tesla MRI Equipment from Siemens" },
    excerpt: { uk: "Клініка Asklepiy отримала новітній МРТ-апарат Siemens MAGNETOM Vida 3T.", en: "Asklepiy Clinic received the latest Siemens MAGNETOM Vida 3T MRI scanner." },
    date: "2026-02-20",
    readTime: { uk: "3 хв", en: "3 min" },
  },
  {
    id: "2",
    slug: "spring-checkup",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    category: { uk: "Акції", en: "Promotions" },
    title: { uk: "Весняний чекап зі знижкою 25%", en: "Spring Checkup with 25% Discount" },
    excerpt: { uk: "Комплексне обстеження організму за спеціальною весняною ціною до 31 березня.", en: "Comprehensive health examination at a special spring price until March 31." },
    date: "2026-03-01",
    readTime: { uk: "2 хв", en: "2 min" },
  },
  {
    id: "3",
    slug: "pediatrics-center",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    category: { uk: "Новини клініки", en: "Clinic News" },
    title: { uk: "Відкриття оновленого центру педіатрії", en: "Opening of Renovated Pediatrics Center" },
    excerpt: { uk: "Наш дитячий центр повністю оновлений та готовий приймати маленьких пацієнтів.", en: "Our children's center has been fully renovated and is ready to receive young patients." },
    date: "2026-02-28",
    readTime: { uk: "4 хв", en: "4 min" },
  },
];
