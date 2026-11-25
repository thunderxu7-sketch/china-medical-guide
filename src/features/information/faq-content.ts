interface PriceDisplay {
  text: string;
  label: string;
  source?: string;
}
interface Answer {
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
}
interface QuestionGroup {
  id: string;
  title: string;
  questions: Answer[];
}

export function getFaqGroups(price: PriceDisplay): QuestionGroup[] {
  const priceAnswer =
    price.label === "Quote on request"
      ? "Request a quote for the eye or eyes being assessed. Ask for the lens, tests and review visits to be itemised."
      : (price.label === "Published reference"
          ? "The published reference lists "
          : "The provider estimate is ") +
        price.text +
        ". Ask for a written estimate that identifies the lens, tests and review visits.";
  const priceLinks = [{ text: "Cataract treatment details", href: "/services/cataract-treatment" }];
  if (price.label === "Quote on request")
    priceLinks.push({
      text: "Request a cataract estimate",
      href: "/consultation?service=cataract-treatment",
    });
  if (price.source) priceLinks.push({ text: "View the published reference", href: price.source });

  return [
    {
      id: "visa-travel",
      title: "Visa & travel",
      questions: [
        {
          question: "How do I check the entry requirements for my visit?",
          answer:
            "Check the guidance for your passport, place of residence and purpose of travel with the Chinese embassy or consulate responsible for your area. Ask the clinic which appointment documents it can provide.",
          links: [
            { text: "China Online Visa Application", href: "https://consular.mfa.gov.cn/VISA/" },
          ],
        },
        {
          question: "How much time should I allow in China?",
          answer:
            "Ask the receiving clinic for dates covering your initial assessment, any treatment and your last in-person review. Confirm return travel with the treating team before booking a fixed flight.",
        },
        {
          question: "Can a companion travel with me?",
          answer:
            "Ask the hospital about visitor hours, overnight access and local accommodation for a companion. Your companion should check the entry requirements for their own passport.",
        },
      ],
    },
    {
      id: "medical-treatment",
      title: "Medical & treatment",
      questions: [
        {
          question: "How can I check a hospital’s credentials?",
          answer:
            "Request the hospital’s legal name, campus and department. Confirm the appointment with the hospital directly and check any accreditation claim in the accreditor’s directory.",
          links: [
            {
              text: "JCI organisation directory",
              href: "https://www.jointcommission.org/en/about-us/recognizing-excellence/find-accredited-international-organizations",
            },
          ],
        },
        {
          question: "Who explains the expected outcome of treatment?",
          answer:
            "The treating clinician can explain the expected benefit, possible risks and alternatives after reviewing your individual case. Ask for time to discuss these before making a decision.",
        },
        {
          question: "Who can I contact if my recovery changes?",
          answer:
            "Before discharge, ask the clinic for its daytime and after-hours contacts and a written follow-up plan. Discuss with the clinician which changes need urgent local attention.",
        },
        {
          question: "Can I enquire about traditional Chinese medicine remotely?",
          answer:
            "Review the remote consultation guide and ask your provider about availability for your location, time zone and preferred language.",
          links: [{ text: "Remote consultation", href: "/services/remote-consultation" }],
        },
      ],
    },
    {
      id: "cost-payment",
      title: "Cost & payment",
      questions: [
        {
          question: "Is the cataract estimate for one eye or both?",
          answer: priceAnswer,
          links: priceLinks,
        },
        {
          question: "Which items should a written quote include?",
          answer:
            "Ask for the clinician’s fees, tests, medicines, implants where relevant, hospital stay and follow-up visits. Confirm which items are separate, along with the currency, validity period and change fees.",
        },
        {
          question: "How do I confirm the payment arrangements?",
          answer:
            "Request the legal payee, invoice details, payment schedule, accepted methods and cancellation terms from the provider before you arrange payment.",
        },
      ],
    },
    {
      id: "follow-up",
      title: "Follow-up care",
      questions: [
        {
          question: "When will I be able to return to my usual activities?",
          answer:
            "Discuss your work, travel and daily activities at the assessment. Your treating team can set individual review dates and give you written guidance before discharge.",
        },
        {
          question: "Can I arrange follow-up after travelling home?",
          answer:
            "Ask who can review you remotely and which examinations need a clinician near home. Save contact details and appointment dates before leaving the hospital.",
        },
        {
          question: "Which records should I take home?",
          answer:
            "Ask for a discharge summary, copies of available reports, a medication list and the follow-up plan, in a language your local care team can use.",
        },
      ],
    },
    {
      id: "general",
      title: "General questions",
      questions: [
        {
          question: "How do I start an enquiry?",
          answer:
            "Choose a service and open the consultation page to see the available options. Have your main questions about arrangements or costs ready for the clinic.",
          links: [{ text: "View consultation options", href: "/consultation" }],
        },
        {
          question: "How can I arrange language support?",
          answer:
            "Tell the receiving clinic which language you need and for which appointments. Ask who provides interpretation and whether its cost appears in the quote.",
        },
        {
          question: "What happens to the details I send?",
          answer:
            "The privacy policy describes the information this site handles and the contact options it offers. Ask the clinic for an appropriate channel before sharing detailed records.",
          links: [{ text: "Read the privacy policy", href: "/privacy" }],
        },
      ],
    },
  ];
}
