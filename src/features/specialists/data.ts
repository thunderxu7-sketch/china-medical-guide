import type { ServiceSlug } from "../../data/services";

export interface Clinician {
  name: string;
  role?: string;
  institution?: string;
  source: { label: string; url: string };
}

export interface Specialty {
  slug: string;
  title: string;
  field: string;
  summary: string;
  overview: string;
  services: ServiceSlug[];
  preparation: { title: string; description: string }[];
  questions: string[];
  travel: string;
  clinician?: Clinician;
}

export const specialties: Specialty[] = [
  {
    slug: "orthopedic",
    title: "Orthopedic Specialist",
    field: "Joint and musculoskeletal care",
    summary: "Plan a discussion about joint replacement, spine care, fractures or a sports injury.",
    overview: "An orthopedic consultation is a chance to describe how a joint or injury affects everyday activities and to ask about available options. The receiving clinic can tell you which department handles your concern, who will review your case and how to arrange a visit.",
    services: ["hip-replacement", "knee-replacement", "spine-surgery", "fracture-treatment", "sports-injury"],
    preparation: [
      { title: "Previous appointments", description: "Make a list of earlier consultations and any treatment you have already discussed." },
      { title: "Imaging and reports", description: "Ask the clinic which existing images or reports it can review and how to share them securely." },
      { title: "Your travel plans", description: "Note your preferred dates, whether someone will accompany you and any mobility support you may need." },
    ],
    questions: [
      "Which doctor and hospital would handle my appointment?",
      "If a procedure is discussed, which items would the written estimate include?",
      "Who should I contact about follow-up after I return home?",
    ],
    travel: "Ask about step-free access at the clinic and your accommodation, transport between appointments and how a companion can take part in your visit.",
  },
  {
    slug: "ophthalmology",
    title: "Ophthalmology Specialist",
    field: "Cataract, retinal and refractive care",
    summary: "Prepare for an eye care visit and compare the details of a proposed procedure or follow-up.",
    overview: "Eye care appointments may be arranged with different departments depending on the reason for your visit. Use the consultation to clarify which specialist will see you, which eye the estimate covers and whether any follow-up can take place at home.",
    services: ["cataract-treatment", "lasik-surgery", "refractive-lens", "retinal-treatment"],
    preparation: [
      { title: "Past eye examinations", description: "Keep a list of earlier eye appointments and ask which reports the receiving clinic wants to see." },
      { title: "Current eyewear", description: "Ask whether to bring your glasses prescription, contact lens details or other records." },
      { title: "Visit and return dates", description: "Write down your possible travel dates and when you would be available for follow-up." },
    ],
    questions: [
      "Which department and specialist would evaluate my concern?",
      "Is the estimate per eye, and what would be charged separately?",
      "When would the clinic need to see me again before I travel home?",
    ],
    travel: "Check whether the clinic expects someone to accompany you between appointments. Ask for written follow-up arrangements and the contact details for questions after your return.",
  },
];
