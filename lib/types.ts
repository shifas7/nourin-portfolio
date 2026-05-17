export interface Stat {
  num: string;
  label: string;
}

export interface Metric {
  num: string;
  label: string;
}

export interface Service {
  num: string;
  title: string;
  tag: string;
  description: string;
  tools: string[];
  tall?: boolean;
  gradientClass: string;
}

export interface CaseStudy {
  num: string;
  name: string;
  category: string;
  channel: string;
  result: string;
  resultLabel: string;
}

export interface Skill {
  name: string;
  pct: number;
  tools: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
}
