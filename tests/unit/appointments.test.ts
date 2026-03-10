import { describe, it, expect } from "vitest";
import {
  MOCK_APPOINTMENTS,
  MOCK_RESULTS,
  MOCK_TIMELINE,
  getAppointments,
  getMedicalResults,
  getTimeline,
} from "@/lib/api/mock-appointments";

describe("Mock Appointments API", () => {
  it("returns appointments", async () => {
    const apts = await getAppointments();
    expect(apts).toHaveLength(MOCK_APPOINTMENTS.length);
  });

  it("appointments have required fields", () => {
    MOCK_APPOINTMENTS.forEach((apt) => {
      expect(apt).toHaveProperty("id");
      expect(apt).toHaveProperty("doctorName");
      expect(apt).toHaveProperty("date");
      expect(apt).toHaveProperty("time");
      expect(["upcoming", "completed", "cancelled"]).toContain(apt.status);
    });
  });

  it("returns medical results", async () => {
    const results = await getMedicalResults();
    expect(results).toHaveLength(MOCK_RESULTS.length);
  });

  it("medical results have AI notes", () => {
    const withNotes = MOCK_RESULTS.filter((r) => r.aiNote);
    expect(withNotes.length).toBeGreaterThan(0);
    withNotes.forEach((r) => {
      expect(r.aiNote).toHaveProperty("uk");
      expect(r.aiNote).toHaveProperty("en");
    });
  });

  it("returns timeline events", async () => {
    const timeline = await getTimeline();
    expect(timeline).toHaveLength(MOCK_TIMELINE.length);
    expect(timeline.length).toBeGreaterThan(0);
  });

  it("timeline events are in chronological order", async () => {
    const timeline = await getTimeline();
    for (let i = 1; i < timeline.length; i++) {
      const prev = new Date(timeline[i - 1].date).getTime();
      const curr = new Date(timeline[i].date).getTime();
      expect(curr).toBeGreaterThanOrEqual(prev);
    }
  });
});
