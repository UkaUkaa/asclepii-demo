import { describe, it, expect } from "vitest";
import { DOCTORS, CATEGORIES, getDoctors, getDoctorBySlug } from "@/lib/api/mock-doctors";

describe("Mock Doctors API", () => {
  it("returns all doctors", async () => {
    const doctors = await getDoctors();
    expect(doctors).toHaveLength(DOCTORS.length);
    expect(doctors.length).toBeGreaterThan(0);
  });

  it("each doctor has required fields", () => {
    DOCTORS.forEach((doctor) => {
      expect(doctor).toHaveProperty("id");
      expect(doctor).toHaveProperty("slug");
      expect(doctor).toHaveProperty("name");
      expect(doctor.name).toHaveProperty("uk");
      expect(doctor.name).toHaveProperty("en");
      expect(doctor).toHaveProperty("specialty");
      expect(doctor).toHaveProperty("experience");
      expect(doctor).toHaveProperty("photo");
      expect(doctor).toHaveProperty("rating");
    });
  });

  it("finds doctor by slug", async () => {
    const doctor = await getDoctorBySlug("olena-kovalenko");
    expect(doctor).not.toBeNull();
    expect(doctor?.name.uk).toContain("Коваленко");
  });

  it("returns null for unknown slug", async () => {
    const doctor = await getDoctorBySlug("unknown-doctor");
    expect(doctor).toBeNull();
  });

  it("all categories have uk and en names", () => {
    CATEGORIES.forEach((cat) => {
      expect(cat).toHaveProperty("uk");
      expect(cat).toHaveProperty("en");
    });
  });

  it("doctor ratings are between 1 and 5", () => {
    DOCTORS.forEach((doctor) => {
      expect(doctor.rating).toBeGreaterThanOrEqual(1);
      expect(doctor.rating).toBeLessThanOrEqual(5);
    });
  });
});
