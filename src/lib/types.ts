export type Children = {
  children: JSX.Element | JSX.Element[];
};

export type UserData = {
  gender: "string";
  age: "string";
  metabolism: "string";
  weight: "string";
  weightGoal: "string";
  challenge: "string";
};

export type QuestionData = {
  question: string;
  choices: string[];
};

export type PriceInformation = {
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  shipping: number;
  bonus: boolean;
  photo: string;
};

export type FreeBonus = {
  title: string;
  // description: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  paragraph6?: string;
  photo: string;
};

export type Member = {
  name: string;
  role?: string;
  photo: string;
};

export type Faq = {
  question: string;
  answer1: string;
  answer2?: string;
  answer3?: string;
  answer4?: string;
  answer5?: string;
};

export type CustomerReview = {
  name: string;
  title: string;
  rating?: number;
  opinion?: string;
};
