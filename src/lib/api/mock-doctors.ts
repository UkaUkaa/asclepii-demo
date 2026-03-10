export interface Doctor {
  id: string;
  slug: string;
  name: { uk: string; en: string };
  specialty: { uk: string; en: string };
  experience: number;
  photo: string;
  bio: { uk: string; en: string };
  education: { uk: string[]; en: string[] };
  specializations: { uk: string[]; en: string[] };
  languages: string[];
  schedule: { uk: string; en: string };
  rating: number;
  reviewCount: number;
  category: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "1",
    slug: "olena-kovalenko",
    name: { uk: "Коваленко Олена Іванівна", en: "Olena Kovalenko" },
    specialty: { uk: "Кардіолог", en: "Cardiologist" },
    experience: 18,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: {
      uk: "Досвідчений кардіолог з 18-річним стажем. Спеціалізується на діагностиці та лікуванні ішемічної хвороби серця, гіпертонії та аритмій. Автор понад 30 наукових публікацій.",
      en: "Experienced cardiologist with 18 years of practice. Specializes in diagnosis and treatment of coronary artery disease, hypertension, and arrhythmias. Author of over 30 scientific publications.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Інтернатура: Кардіологія", "Сертифікація ESC (Європейське кардіологічне товариство)"],
      en: ["Kharkiv National Medical University", "Residency: Cardiology", "ESC Certification (European Society of Cardiology)"],
    },
    specializations: {
      uk: ["Ішемічна хвороба серця", "Гіпертонічна хвороба", "Порушення ритму серця", "Серцева недостатність"],
      en: ["Coronary artery disease", "Arterial hypertension", "Cardiac arrhythmias", "Heart failure"],
    },
    languages: ["uk", "en", "ru"],
    schedule: { uk: "Пн, Ср, Пт: 09:00–17:00", en: "Mon, Wed, Fri: 09:00–17:00" },
    rating: 4.9,
    reviewCount: 284,
    category: "cardiology",
  },
  {
    id: "2",
    slug: "mykola-petrenko",
    name: { uk: "Петренко Микола Сергійович", en: "Mykola Petrenko" },
    specialty: { uk: "Невролог", en: "Neurologist" },
    experience: 22,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: {
      uk: "Провідний невролог клініки з 22-річним досвідом. Спеціаліст з діагностики та лікування захворювань центральної та периферичної нервової системи, хронічних головних болей та мігрені.",
      en: "Lead neurologist with 22 years of experience. Specialist in diagnosing and treating central and peripheral nervous system disorders, chronic headaches, and migraines.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Докторантура: Неврологія", "Стажування в клініці Charité, Берлін"],
      en: ["Kharkiv National Medical University", "Doctorate in Neurology", "Fellowship at Charité Clinic, Berlin"],
    },
    specializations: {
      uk: ["Мігрень та хронічний головний біль", "Вертеброгенна патологія", "Інсульт та реабілітація", "Епілепсія"],
      en: ["Migraine and chronic headache", "Vertebrogenic pathology", "Stroke and rehabilitation", "Epilepsy"],
    },
    languages: ["uk", "en"],
    schedule: { uk: "Вт, Чт: 10:00–18:00; Сб: 09:00–14:00", en: "Tue, Thu: 10:00–18:00; Sat: 09:00–14:00" },
    rating: 4.8,
    reviewCount: 312,
    category: "neurology",
  },
  {
    id: "3",
    slug: "iryna-marchenko",
    name: { uk: "Марченко Ірина Олексіївна", en: "Iryna Marchenko" },
    specialty: { uk: "Гінеколог", en: "Gynecologist" },
    experience: 15,
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    bio: {
      uk: "Гінеколог вищої категорії з 15-річним досвідом роботи. Спеціалізується на репродуктивному здоров'ї, ведені вагітності та малоінвазивній гінекологічній хірургії.",
      en: "Senior gynecologist with 15 years of experience. Specializes in reproductive health, pregnancy management, and minimally invasive gynecological surgery.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Інтернатура: Акушерство та гінекологія", "Стажування в Польщі (PTOS)"],
      en: ["Kharkiv National Medical University", "Residency: Obstetrics & Gynecology", "Fellowship in Poland (PTOS)"],
    },
    specializations: {
      uk: ["Репродуктивне здоров'я", "Ведення вагітності", "Малоінвазивна хірургія", "Клімакс та менопауза"],
      en: ["Reproductive health", "Pregnancy management", "Minimally invasive surgery", "Menopause management"],
    },
    languages: ["uk", "en", "pl"],
    schedule: { uk: "Пн–Пт: 09:00–18:00", en: "Mon–Fri: 09:00–18:00" },
    rating: 4.9,
    reviewCount: 398,
    category: "gynecology",
  },
  {
    id: "4",
    slug: "volodymyr-shevchenko",
    name: { uk: "Шевченко Володимир Олегович", en: "Volodymyr Shevchenko" },
    specialty: { uk: "Педіатр", en: "Pediatrician" },
    experience: 12,
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: {
      uk: "Дитячий лікар з 12-річним досвідом. Спеціалізується на загальній педіатрії, дитячій кардіології та профілактичній медицині.",
      en: "Pediatrician with 12 years of experience. Specializes in general pediatrics, pediatric cardiology, and preventive medicine.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Інтернатура: Педіатрія", "Курси підвищення кваліфікації (ЄС)"],
      en: ["Kharkiv National Medical University", "Residency: Pediatrics", "Advanced training (EU)"],
    },
    specializations: {
      uk: ["Загальна педіатрія", "Дитяча кардіологія", "Профілактична медицина", "Вакцинація"],
      en: ["General pediatrics", "Pediatric cardiology", "Preventive medicine", "Vaccination"],
    },
    languages: ["uk", "en"],
    schedule: { uk: "Пн, Вт, Чт: 08:00–16:00", en: "Mon, Tue, Thu: 08:00–16:00" },
    rating: 4.7,
    reviewCount: 215,
    category: "pediatrics",
  },
  {
    id: "5",
    slug: "tetiana-bondarenko",
    name: { uk: "Бондаренко Тетяна Василівна", en: "Tetiana Bondarenko" },
    specialty: { uk: "Ортопед-травматолог", en: "Orthopedic Surgeon" },
    experience: 20,
    photo: "https://randomuser.me/api/portraits/women/60.jpg",
    bio: {
      uk: "Ортопед-травматолог вищої категорії. 20 років практики в лікуванні захворювань і травм опорно-рухового апарату. Спеціаліст з ендопротезування суглобів.",
      en: "Senior orthopedic surgeon with 20 years of experience treating musculoskeletal disorders and injuries. Joint arthroplasty specialist.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Докторантура: Ортопедія і травматологія", "Стажування в Австрії (Wien)"],
      en: ["Kharkiv National Medical University", "Doctorate in Orthopedics & Traumatology", "Fellowship in Austria (Vienna)"],
    },
    specializations: {
      uk: ["Ендопротезування суглобів", "Спортивні травми", "Артроскопія", "Захворювання хребта"],
      en: ["Joint arthroplasty", "Sports injuries", "Arthroscopy", "Spinal disorders"],
    },
    languages: ["uk", "en", "de"],
    schedule: { uk: "Вт, Пт: 10:00–18:00; Сб: 10:00–15:00", en: "Tue, Fri: 10:00–18:00; Sat: 10:00–15:00" },
    rating: 4.8,
    reviewCount: 176,
    category: "orthopedics",
  },
  {
    id: "6",
    slug: "andriy-lysenko",
    name: { uk: "Лисенко Андрій Павлович", en: "Andriy Lysenko" },
    specialty: { uk: "Офтальмолог", en: "Ophthalmologist" },
    experience: 14,
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: {
      uk: "Офтальмолог з 14-річним досвідом. Сертифікований спеціаліст з лазерної корекції зору та лікування катаракти. Виконав понад 3000 успішних операцій.",
      en: "Ophthalmologist with 14 years of experience. Certified specialist in laser vision correction and cataract surgery. Performed over 3,000 successful operations.",
    },
    education: {
      uk: ["Харківський національний медичний університет", "Інтернатура: Офтальмологія", "Стажування в Ізраїлі (Hadassah)"],
      en: ["Kharkiv National Medical University", "Residency: Ophthalmology", "Fellowship in Israel (Hadassah)"],
    },
    specializations: {
      uk: ["Лазерна корекція зору", "Хірургія катаракти", "Лікування глаукоми", "Дитяча офтальмологія"],
      en: ["Laser vision correction", "Cataract surgery", "Glaucoma treatment", "Pediatric ophthalmology"],
    },
    languages: ["uk", "en"],
    schedule: { uk: "Пн, Ср, Пт: 08:00–16:00", en: "Mon, Wed, Fri: 08:00–16:00" },
    rating: 4.9,
    reviewCount: 221,
    category: "ophthalmology",
  },
];

export const CATEGORIES = [
  { id: "all", uk: "Всі", en: "All" },
  { id: "cardiology", uk: "Кардіологія", en: "Cardiology" },
  { id: "neurology", uk: "Неврологія", en: "Neurology" },
  { id: "gynecology", uk: "Гінекологія", en: "Gynecology" },
  { id: "pediatrics", uk: "Педіатрія", en: "Pediatrics" },
  { id: "orthopedics", uk: "Ортопедія", en: "Orthopedics" },
  { id: "ophthalmology", uk: "Офтальмологія", en: "Ophthalmology" },
];

export async function getDoctors(): Promise<Doctor[]> {
  await new Promise((r) => setTimeout(r, 300));
  return DOCTORS;
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  await new Promise((r) => setTimeout(r, 200));
  return DOCTORS.find((d) => d.slug === slug) ?? null;
}
