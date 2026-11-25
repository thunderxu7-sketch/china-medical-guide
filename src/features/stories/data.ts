export interface PatientStory {
  title: string;
  patientDisplayName: string;
  visitLabel?: string;
  account: string;
  source: { label: string; publicUrl?: string };
  approvedForPublication: boolean;
}

export const patientStories: PatientStory[] = [];
