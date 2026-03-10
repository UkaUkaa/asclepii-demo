export interface Appointment {
  id: string;
  doctorName: { uk: string; en: string };
  specialty: { uk: string; en: string };
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: { uk: string; en: string };
  room?: string;
}

export interface MedicalResult {
  id: string;
  title: { uk: string; en: string };
  date: string;
  type: "analysis" | "imaging" | "consultation";
  status: "ready" | "pending";
  aiNote?: { uk: string; en: string };
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: { uk: string; en: string };
  description: { uk: string; en: string };
  type: "appointment" | "result" | "prescription" | "note";
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "apt1",
    doctorName: { uk: "Коваленко Олена Іванівна", en: "Olena Kovalenko" },
    specialty: { uk: "Кардіолог", en: "Cardiologist" },
    date: "2026-03-15",
    time: "10:00",
    status: "upcoming",
    type: { uk: "Первинна консультація", en: "Initial consultation" },
    room: "204",
  },
  {
    id: "apt2",
    doctorName: { uk: "Петренко Микола Сергійович", en: "Mykola Petrenko" },
    specialty: { uk: "Невролог", en: "Neurologist" },
    date: "2026-03-22",
    time: "14:30",
    status: "upcoming",
    type: { uk: "Повторна консультація", en: "Follow-up consultation" },
    room: "118",
  },
  {
    id: "apt3",
    doctorName: { uk: "Марченко Ірина Олексіївна", en: "Iryna Marchenko" },
    specialty: { uk: "Гінеколог", en: "Gynecologist" },
    date: "2026-02-10",
    time: "11:00",
    status: "completed",
    type: { uk: "Планова консультація", en: "Routine consultation" },
  },
];

export const MOCK_RESULTS: MedicalResult[] = [
  {
    id: "res1",
    title: { uk: "Загальний аналіз крові", en: "Complete Blood Count" },
    date: "2026-02-28",
    type: "analysis",
    status: "ready",
    aiNote: {
      uk: "Показники заліза повернулись до норми порівняно з минулим місяцем. Загальний стан здоров'я відповідає нормі.",
      en: "Your iron levels returned to normal compared to last month. Overall health indicators are within normal range.",
    },
  },
  {
    id: "res2",
    title: { uk: "ЕКГ (електрокардіограма)", en: "ECG (Electrocardiogram)" },
    date: "2026-02-15",
    type: "imaging",
    status: "ready",
    aiNote: {
      uk: "Ритм серця рівномірний, синусовий. Патологічних змін не виявлено.",
      en: "Heart rhythm is regular, sinus. No pathological changes detected.",
    },
  },
  {
    id: "res3",
    title: { uk: "МРТ хребта", en: "Spinal MRI" },
    date: "2026-03-01",
    type: "imaging",
    status: "ready",
    aiNote: {
      uk: "Виявлено незначні дегенеративні зміни L4-L5. Рекомендована консультація вертебролога.",
      en: "Minor degenerative changes at L4-L5 detected. Vertebrologist consultation recommended.",
    },
  },
];

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "te1",
    date: "2026-02-10",
    title: { uk: "Консультація гінеколога", en: "Gynecologist consultation" },
    description: { uk: "Планова консультація. Призначено обстеження.", en: "Routine consultation. Tests prescribed." },
    type: "appointment",
  },
  {
    id: "te2",
    date: "2026-02-15",
    title: { uk: "ЕКГ виконано", en: "ECG completed" },
    description: { uk: "Результати в межах норми.", en: "Results within normal range." },
    type: "result",
  },
  {
    id: "te3",
    date: "2026-02-28",
    title: { uk: "Аналіз крові виконано", en: "Blood test completed" },
    description: { uk: "Показники заліза нормалізувались.", en: "Iron levels normalized." },
    type: "result",
  },
  {
    id: "te4",
    date: "2026-03-01",
    title: { uk: "МРТ хребта", en: "Spinal MRI" },
    description: { uk: "Незначні зміни L4-L5. Призначено лікування.", en: "Minor L4-L5 changes. Treatment prescribed." },
    type: "result",
  },
  {
    id: "te5",
    date: "2026-03-15",
    title: { uk: "Запис до кардіолога", en: "Cardiologist appointment scheduled" },
    description: { uk: "Прийом заплановано на 10:00, каб. 204.", en: "Appointment scheduled for 10:00, room 204." },
    type: "appointment",
  },
];

export async function getAppointments(): Promise<Appointment[]> {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_APPOINTMENTS;
}

export async function getMedicalResults(): Promise<MedicalResult[]> {
  await new Promise((r) => setTimeout(r, 350));
  return MOCK_RESULTS;
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_TIMELINE;
}
