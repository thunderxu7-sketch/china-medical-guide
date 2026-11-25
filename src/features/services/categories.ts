import type { services } from "../../data/services";

export type ServiceCategory = (typeof services)[number]["category"];

export const categories = {
  surgery: {
    name: "Surgical Procedures",
    description: "Compare hospital assessments for joint replacement, heart procedures and spine surgery.",
    icon: "activity",
  },
  ophthalmology: {
    name: "Ophthalmology Services",
    description: "Explore eye assessments, lens choices and the cost of treatment for each eye.",
    icon: "eye",
  },
  orthopedics: {
    name: "Orthopedic Care",
    description: "Plan a specialist review for a fracture or sports injury, with time for follow-up.",
    icon: "bone",
  },
  tcm: {
    name: "Specialized TCM Programs",
    description: "Find clinic and remote options for traditional Chinese medicine consultations and follow-up.",
    icon: "leaf",
  },
} as const satisfies Record<ServiceCategory, {
  name: string;
  description: string;
  icon: "activity" | "eye" | "bone" | "leaf";
}>;

export const categoryOrder: ServiceCategory[] = ["surgery", "ophthalmology", "orthopedics", "tcm"];
