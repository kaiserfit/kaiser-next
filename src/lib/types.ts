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
  description: string;
}
