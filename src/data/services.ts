export const services = [
  { slug: "hip-replacement", name: "Hip Replacement", category: "surgery" },
  { slug: "knee-replacement", name: "Knee Replacement", category: "surgery" },
  { slug: "cardiac-surgery", name: "Cardiac Surgery", category: "surgery" },
  { slug: "spine-surgery", name: "Spine Surgery", category: "surgery" },
  { slug: "cataract-treatment", name: "Cataract Treatment", category: "ophthalmology" },
  { slug: "lasik-surgery", name: "LASIK Vision Correction", category: "ophthalmology" },
  { slug: "refractive-lens", name: "Refractive Lens Exchange", category: "ophthalmology" },
  { slug: "retinal-treatment", name: "Retinal Treatment", category: "ophthalmology" },
  { slug: "fracture-treatment", name: "Non-Surgical Fracture Treatment", category: "orthopedics" },
  { slug: "sports-injury", name: "Sports Injury Treatment", category: "orthopedics" },
  { slug: "mens-health", name: "Men's Health Program", category: "tcm" },
  { slug: "gastrointestinal-therapy", name: "Gastrointestinal Therapy", category: "tcm" },
  { slug: "remote-consultation", name: "Remote Consultation", category: "tcm" },
  { slug: "herbal-medicine-delivery", name: "Herbal Medicine Delivery", category: "tcm" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
