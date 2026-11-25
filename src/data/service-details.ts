import type { ServiceSlug } from "./services";

export interface ServicePrice {
  currency: "USD";
  minimum: number;
  maximum?: number;
  unit: "procedure" | "eye" | "session" | "month" | "program" | "unspecified";
}

export interface ServiceDetails {
  summary?: string;
  price?: ServicePrice;
  referencePrice?: ServicePrice;
  stayInChina?: string;
  recovery?: string;
}

interface ServiceGuide extends ServiceDetails {
  summary: string;
  overview: string;
  stayInChina: string;
  recovery: string;
  setting: "In person" | "Clinic or remote" | "Remote";
  prepare: string[];
  questions: string[];
  followUp: string;
}

function published(minimum: number, maximum: number, unit: ServicePrice["unit"]): ServicePrice {
  return { currency: "USD", minimum, maximum, unit };
}

// Reference figures describe the linked third-party listings. Operator-approved
// estimates belong in price and take precedence over the published reference.
export const serviceDetails: Record<ServiceSlug, ServiceGuide> = {
  "hip-replacement": {
    summary: "Plan a hip replacement consultation, from sharing prior imaging to arranging support after discharge.",
    overview: "A hip replacement enquiry starts with an orthopaedic review of the affected joint. Ask the hospital to identify the proposed implant, surgical approach and rehabilitation arrangements in its written estimate.",
    referencePrice: published(12000, 18000, "procedure"), stayInChina: "1–2 weeks", recovery: "6–12 weeks to full mobility", setting: "In person",
    prepare: ["Copies of hip X-rays and their written reports.", "A list of earlier hip procedures, walking aids and the help available at home."],
    questions: ["Which implant and hospital services are included in the estimate?", "When would the team reassess travel and return to daily activities?"],
    followUp: "Ask for implant identification details and a written rehabilitation handover for the team at home.",
  },
  "knee-replacement": {
    summary: "Explore the assessment, hospital stay and rehabilitation arrangements for knee replacement.",
    overview: "The knee assessment helps the surgeon discuss a partial or total replacement and the support needed afterwards. A useful estimate identifies the knee, implant and number of planned inpatient days.",
    referencePrice: published(12000, 17000, "procedure"), stayInChina: "1–2 weeks", recovery: "6–12 weeks to walking independently", setting: "In person",
    prepare: ["Recent knee imaging and reports, labelled with the affected side.", "A short account of walking, stairs and activities you hope to return to."],
    questions: ["Which rehabilitation sessions and walking aids are included?", "Who reviews progress after the first hospital appointment?"],
    followUp: "Request a discharge summary and a physiotherapy plan that your local team can continue.",
  },
  "cardiac-surgery": {
    summary: "Prepare for a hospital review of heart treatment options and the practical demands of a longer stay.",
    overview: "Cardiac enquiries can involve very different procedures. Have the receiving team name the proposed intervention and outline hospital monitoring, follow-up and any rehabilitation in its estimate.",
    referencePrice: published(15000, 28000, "procedure"), stayInChina: "2–3 weeks", recovery: "8–12 weeks of cardiac rehabilitation", setting: "In person",
    prepare: ["Existing cardiology letters, imaging reports and procedure records.", "A current medication list and the contact details of your cardiologist."],
    questions: ["What procedure and level of inpatient care does this estimate cover?", "Who coordinates the return to your home cardiologist?"],
    followUp: "Discuss the first outpatient review, the rehabilitation plan and travel timing with the treating team.",
  },
  "spine-surgery": {
    summary: "Organise a spine specialist review and understand what is included in a proposed procedure.",
    overview: "A spine consultation brings together symptoms, imaging and previous treatment. Ask for the exact procedure and spinal level in writing so that separate estimates can be compared.",
    referencePrice: published(10000, 22000, "procedure"), stayInChina: "1–2 weeks", recovery: "6–16 weeks", setting: "In person",
    prepare: ["MRI or CT files and the corresponding radiology reports.", "Previous procedure notes and a timeline of changes in movement or day-to-day activity."],
    questions: ["Which hospital items and implants are included?", "Where will follow-up examinations or imaging take place?"],
    followUp: "Request a copy of the operative report and a review schedule to take to your local specialist.",
  },
  "cataract-treatment": {
    summary: "Compare cataract assessment, lens options and the cost per eye before planning your visit.",
    overview: "Cataract appointments include measurements used to plan a replacement lens. Compare quotes for the same eye and lens type, and ask how the hospital schedules a second eye when relevant.",
    referencePrice: published(2500, 5500, "eye"), stayInChina: "2–3 days per visit", recovery: "1–4 weeks", setting: "In person",
    prepare: ["A recent eye examination or spectacle prescription, if available.", "Details of previous eye surgery and the activities for which you use glasses."],
    questions: ["Which lens model, measurements and review visits does the per-eye price include?", "If both eyes are treated, how many appointments should you plan for?"],
    followUp: "Confirm who will review each eye and how results can be shared with your eye-care professional at home.",
  },
  "lasik-surgery": {
    summary: "Arrange a refractive assessment and compare the per-eye estimate for laser vision correction.",
    overview: "The assessment determines whether laser correction is suitable and which technique the clinician proposes. Ask for a written breakdown covering both the initial evaluation and follow-up appointments.",
    referencePrice: published(1800, 3500, "eye"), stayInChina: "2–3 days", recovery: "1–3 days for early vision", setting: "In person",
    prepare: ["Recent and earlier spectacle or contact lens prescriptions.", "Any eye examination reports and details of previous refractive treatment."],
    questions: ["Which technique and follow-up visits does the price cover?", "When should the clinic reassess vision for work and travel?"],
    followUp: "Ask the clinic to distinguish early visual improvement from the later checks needed to assess stability.",
  },
  "refractive-lens": {
    summary: "Discuss lens exchange, lens choice and how two-eye treatment is scheduled and priced.",
    overview: "Refractive lens exchange involves planning around measurements of each eye and vision needs at different distances. Ask the hospital to identify the proposed lens and the schedule for each eye.",
    referencePrice: published(3500, 6000, "eye"), stayInChina: "4–5 days", recovery: "2–6 weeks", setting: "In person",
    prepare: ["Recent vision prescriptions, eye measurements and examination reports.", "A list of tasks for which distance, screen and near vision matter to you."],
    questions: ["Which lens is specified in the per-eye estimate?", "How will the two review schedules fit into one trip?"],
    followUp: "Request the lens information for your records and a plan for post-procedure vision checks.",
  },
  "retinal-treatment": {
    summary: "Prepare a retinal specialist enquiry with scan results and a proposed follow-up plan.",
    overview: "Retinal care covers a range of conditions and procedures. The hospital needs the diagnosis and scans before it can specify a treatment, quote or travel schedule.",
    referencePrice: published(5000, 14000, "procedure"), stayInChina: "1–2 weeks", recovery: "4–12 weeks", setting: "In person",
    prepare: ["Retinal scans, clinic letters and earlier eye procedure records.", "The latest findings for each eye and dates of recent reviews."],
    questions: ["Which intervention and which eye does the written estimate cover?", "When can the treating ophthalmologist confirm whether flying is safe?"],
    followUp: "Keep return travel flexible until the treating ophthalmologist has reviewed the procedure and cleared your plans.",
  },
  "fracture-treatment": {
    summary: "Discuss an existing fracture diagnosis and how scheduled reviews might be shared between clinics.",
    overview: "A specialist can review earlier imaging and explain the proposed non-surgical care pathway. A planned enquiry should identify the fracture site and local team available for repeat examinations.",
    referencePrice: published(3000, 7000, "unspecified"), stayInChina: "2–3 days for assessment", recovery: "6–12 weeks, depending on the fracture", setting: "In person",
    prepare: ["Original injury imaging, follow-up images and written reports.", "The injury date and details of any splint, cast or clinic review."],
    questions: ["What is included in the initial assessment and subsequent checks?", "Which reviews need new imaging or an in-person examination?"],
    followUp: "Confirm who will arrange local imaging and how those images will reach the reviewing specialist.",
  },
  "sports-injury": {
    summary: "Organise a review of a sports injury and compare rehabilitation and procedure estimates.",
    overview: "A sports injury assessment can cover clinic-based rehabilitation or further surgical review. Ask the team to specify the injured structure and the scope of the proposed treatment before making plans.",
    referencePrice: published(4000, 10000, "unspecified"), stayInChina: "2–4 weeks if surgical", recovery: "8–24 weeks to sport-specific activity", setting: "In person",
    prepare: ["Existing imaging and notes from your clinician or physiotherapist.", "A timeline of the injury, training demands and rehabilitation already tried."],
    questions: ["Does the proposed fee cover an operation, a rehabilitation program or both?", "How will your local therapist receive the return-to-sport criteria?"],
    followUp: "Ask how the team will assess readiness for training and where later functional reviews can take place.",
  },
  "mens-health": {
    summary: "Ask about the consultation format, appointment schedule and total cost of a men's health program.",
    overview: "This category covers traditional Chinese medicine consultations focused on men's health. Before enrolling, ask who will conduct the assessment and which visits, products and follow-up are part of the program.",
    referencePrice: published(800, 2800, "program"), stayInChina: "Remote option", recovery: "8–12 week program", setting: "Clinic or remote",
    prepare: ["Your main questions and a list of medicines and supplements you take.", "Your location, time zone and preference for online or in-clinic appointments."],
    questions: ["What does one program cycle include?", "Which sessions require an in-person assessment?"],
    followUp: "Ask when progress will be reviewed and how to share the plan with your usual clinician.",
  },
  "gastrointestinal-therapy": {
    summary: "Plan a traditional Chinese medicine consultation for digestive concerns and review its scope and fees.",
    overview: "A digestive health enquiry can cover clinic appointments, remote follow-up and the cost of any products. The team should explain how it will work alongside existing gastrointestinal care.",
    referencePrice: published(600, 1800, "program"), stayInChina: "Remote option", recovery: "6–10 week program", setting: "Clinic or remote",
    prepare: ["A summary of your digestive concerns and investigations already completed.", "A list of current prescriptions, supplements and relevant dietary needs."],
    questions: ["How many reviews are included in one cycle?", "Which products, tests or sessions would be billed separately?"],
    followUp: "Confirm how proposed changes will be documented for the clinician already managing your care.",
  },
  "remote-consultation": {
    summary: "Plan a video consultation across time zones and confirm the fee for one appointment.",
    overview: "A remote enquiry starts by confirming that the clinician can offer a consultation in your location. Ask how records are shared and when a written summary or follow-up is available.",
    referencePrice: published(80, 180, "session"), stayInChina: "Stay at home", recovery: "45–60 minute session", setting: "Remote",
    prepare: ["Your time zone, preferred language and available appointment times.", "A brief list of questions and the documents available for a private review."],
    questions: ["Who conducts the call and how is the appointment fee charged?", "How will you receive a summary and arrange another review?"],
    followUp: "Confirm how to contact the clinic if you need clarification after the scheduled call.",
  },
  "herbal-medicine-delivery": {
    summary: "Check destination availability, shipping arrangements and the cost of a monthly supply.",
    overview: "Before arranging any delivery, ask the provider to confirm the ingredients, prescription review, destination rules and written shipping estimate. Include any medicines or supplements already in use when discussing suitability with your clinician.",
    referencePrice: published(120, 380, "month"), stayInChina: "Stay at home", recovery: "Monthly supply", setting: "Remote",
    prepare: ["Your destination country and questions about permitted imports.", "A medication and supplement list to discuss privately with the clinician."],
    questions: ["Which ingredients, shipping charges and destination fees are included?", "How can a future shipment be changed or cancelled?"],
    followUp: "Ask for a written ingredients list, the provider's contact details and the next review date.",
  },
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const compactUnits: Record<ServicePrice["unit"], string> = {
  procedure: "/procedure", eye: "/eye", session: "/visit", month: "/mo", program: "/program", unspecified: " · unit to confirm",
};

export function formatServicePrice(price: ServicePrice): string {
  const minimum = usd.format(price.minimum);
  const suffix = price.unit === "unspecified" ? " (unit to confirm)" : ` per ${price.unit}`;
  if (price.maximum === undefined) return `From ${minimum}${suffix}`;
  if (price.maximum === price.minimum) return `${minimum}${suffix}`;
  return `${minimum}–${usd.format(price.maximum)}${suffix}`;
}

export function getServicePricing(slug: ServiceSlug, details: ServiceDetails = serviceDetails[slug]) {
  const price = details.price ?? details.referencePrice;
  if (!price) {
    return { text: "Request a quote", shortText: "Request a quote", label: "Quote on request", source: undefined };
  }
  const prefix = price.minimum === price.maximum ? "" : "From ";
  return {
    text: formatServicePrice(price),
    shortText: `${prefix}${usd.format(price.minimum)}${compactUnits[price.unit]}`,
    label: details.price ? "Provider estimate" : "Published reference",
    source: details.price ? undefined : `https://cndocteam.com/services/${slug}`,
  };
}
