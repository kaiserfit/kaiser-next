import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
// import { useQuery } from "react-query";
import { questionData } from "../../lib/types";
import { BsDashLg, BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { GiDna2, GiWeight, GiStairsGoal, GiBarrier } from "react-icons/gi";

const firstQuestion = {
  question: "what is your gender?",
  choices: ["male", "female"],
};

function Quiz() {
  const router = useRouter();

  const [question, setQuestion] = useState(firstQuestion);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  // user input states
  const [pickedChoice, setPickedChoice] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<string>();
  const [metabolism, setMetabolism] = useState<string>();
  const [weight, setWeight] = useState<string>();
  const [weightGoal, setWeightGoal] = useState<string>();
  const [challenge, setChallenge] = useState<string>();

  const fetchQuestion = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch("https://kaizerfit.com/questions.php", {
        method: "POST",
        body: JSON.stringify({ id: indexQuestion }),
      });
      const { data }: { data: questionData } = await response.json();
      if (indexQuestion) {
        setQuestion(data);
      } else {
        console.log("back to first question");
        setQuestion(firstQuestion);
      }

      setLoading(false);
    } catch (error) {
      console.log("error");
    }
    setPickedChoice("");
  };

  // const { data, isLoading } = useQuery(
  //   ["question", indexQuestion],
  // );

  const handleClick = (category: string, choice: string) => {
    if (pickedChoice) {
      return;
    }

    setPickedChoice(choice);

    if (category === "gender") {
      setGender(choice);
    }
    if (category === "age") {
      setAge(choice);
    }
    if (category === "metabolism") {
      setMetabolism(choice);
    }
    if (category === "weight") {
      console.log(choice, "weight");
      setWeight(choice);
    }
    if (category === "weightGoal") {
      setWeightGoal(choice);
    }
    if (category === "challenge") {
      setChallenge(choice);
    }

    if (indexQuestion === 5) {
      const userAnswers = {
        gender,
        age,
        metabolism,
        weight,
        weightGoal,
        challenge: choice,
      };
      // const sendData = async () => {
      //   const response = await fetch("");
      // };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      router.push("https://kaizerfit.com/fathacks-vsl.html");
      return;
    }

    setTimeout(() => setIndexQuestion((prev) => prev + 1), 1000);
  };

  const handlePreviousQuestion = () => {
    if (indexQuestion === 1) {
      setGender("");
    }
    if (indexQuestion === 2) {
      setAge("");
    }
    if (indexQuestion === 3) {
      setMetabolism("");
    }
    if (indexQuestion === 4) {
      setWeight("");
    }
    if (indexQuestion === 5) {
      setWeightGoal("");
    }
    setIndexQuestion((prev) => prev - 1);
  };

  useEffect(() => {
    // if (indexQuestion) {
    fetchQuestion(indexQuestion);
    // }
  }, [indexQuestion]);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify({}));
  }, []);

  return (
    <section className="pt-32 pb-16 min-h-screen bg-gradient-to-br from-blue-300 to-blue-600 dark:from-blue-600 dark:to-blue-800">
      {/* <h2 className="text-3xl font-bold">Kaiserfit assessment quiz</h2> */}

      {/* <Image
        src={"/images/quiz/quiz-bg.png"}
        alt="quiz-bg"
        layout="fill"
        objectFit="cover"
        className="absolute brightness-[0.6]"
      /> */}

      <SVGBackground />

      <div className="container mx-auto flex flex-col items-center space-y-4 relative px-4 sm:px-6 lg:px-8">
        <InfoStats
          gender={gender}
          age={age}
          weight={weight}
          weightGoal={weightGoal}
          metabolism={metabolism}
          challenge={challenge}
          indexQuestion={indexQuestion}
        />

        <ProgressBar indexQuestion={indexQuestion} />

        {/* {question.question === "what is your gender?" && !loading && (
        <div className="relative w-full h-80 outline">
          <Image
            src={"/images/quiz/Genetic_Code.webp"}
            alt="image quiz"
            layout="fill"
            className="absolute"
          />
        </div>
      )} */}

        <Choices
          question={question}
          loading={loading}
          indexQuestion={indexQuestion}
          pickedChoice={pickedChoice}
          handleClick={handleClick}
          handlePreviousQuestion={handlePreviousQuestion}
        />
      </div>
    </section>
  );
}

function InfoStats({
  gender,
  age,
  metabolism,
  weight,
  weightGoal,
  challenge,
  indexQuestion,
}: {
  gender: string;
  age?: string;
  metabolism?: string;
  weight?: string;
  weightGoal?: string;
  challenge?: string;
  indexQuestion: number;
}) {
  return (
    <div className="flex flex-wrap sm:justify-center w-full">
      {gender && (
        <div
          className={`flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3 ${
            indexQuestion < 2 ? "w-full" : ""
          }`}
        >
          <BsPersonFill className="text-2xl" />
          <p className="font-light">
            Gender: <span className="font-bold text-2xl">{gender}</span>
          </p>
        </div>
      )}
      {age && (
        <div className="flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3">
          <BsPeopleFill className="text-2xl" />
          <p className="font-light">
            Age: <span className="font-bold text-2xl">{age}</span>
          </p>
        </div>
      )}
      {metabolism && (
        <div className="flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3">
          <GiDna2 className="text-2xl" />
          <p className="font-light">
            Metabolism: <span className="font-bold text-2xl">{metabolism}</span>
          </p>
        </div>
      )}
      {weight && (
        <div className="flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3">
          <GiWeight className="text-2xl" />
          <p className="font-light">
            Weight: <span className="font-bold text-2xl">{weight} lbs</span>
          </p>
        </div>
      )}
      {weightGoal && (
        <div className="flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3">
          <GiStairsGoal className="text-2xl" />
          <p className="font-light">
            Weight Goal:{" "}
            <span className="font-bold text-2xl">{weightGoal}</span>
          </p>
        </div>
      )}
      {challenge && (
        <div className="flex sm:justify-center items-end space-x-2 w-full sm:w-1/2 lg:w-1/3">
          <GiBarrier className="text-2xl" />
          <p className="font-light">
            Challenge: <span className="font-bold text-2xl">{challenge}</span>
          </p>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ indexQuestion }: { indexQuestion: number }) {
  return (
    <div className="flex space-x-4 ">
      {Array.apply(null, Array(6)).map((item, i) => (
        <span
          className={`${i === indexQuestion && "text-red-400"} ${
            i < indexQuestion && "text-green-400"
          } ${i > indexQuestion && "text-amber-500"} text-3xl font-medium`}
          key={Math.random() * 123}
        >
          <BsDashLg />
        </span>
      ))}
    </div>
  );
}

function Choices({
  indexQuestion,
  loading,
  question,
  pickedChoice,
  handleClick,
  handlePreviousQuestion,
}: {
  indexQuestion: number;
  loading: boolean;
  question: questionData;
  pickedChoice?: string;
  handleClick: (category: string, choice: string) => void;
  handlePreviousQuestion: () => void;
}) {
  return (
    <div
      className={`${
        loading ? "animate-slideToLeft" : "relative animate-teleportToRight"
      } pt-4 p-8 rounded-2xl space-y-4 backdrop-blur-sm bg-white/20 relative w-full max-w-6xl shadow-2xl`}
    >
      {indexQuestion >= 1 && (
        <button
          className="absolute top-3 left-4 text-2xl hover:-translate-x-2 transition-transform duration-300 ease-in-out hover:brightness-75"
          onClick={handlePreviousQuestion}
        >
          <FaArrowLeft />
        </button>
      )}

      <div className="text-center">
        <h3 className="text-lg font-light tracking-wider">
          Question{" "}
          <span className="text-2xl font-semibold text-amber-300">
            {indexQuestion + 1}
          </span>{" "}
          / 6
        </h3>

        <h3
          className={`text-2xl font-semibold capitalize transition-all duration-1000 ease-in-out`}
        >
          {question?.question}
        </h3>
      </div>

      <div
        className={`flex flex-col md:flex-row md:flex-wrap items-center pt-4 gap-y-4 transition-all duration-300 ease-in-out justify-center`}
      >
        {question.choices &&
          question.choices.map((choice, i) => (
            <Choice
              pickedChoice={pickedChoice}
              key={Math.random() * 123}
              choice={choice}
              handleClick={handleClick}
              indexQuestion={indexQuestion}
            />
          ))}
        {!question.choices && <Choice choice={""} handleClick={handleClick} />}
      </div>
    </div>
  );
}

function Choice({
  choice,
  handleClick,
  indexQuestion,
  pickedChoice,
}: {
  choice: string;
  handleClick: (category: string, choice: string) => void;
  indexQuestion?: number;
  pickedChoice?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [hasInputWeight, setHasInputWeight] = useState(false);

  const category =
    indexQuestion === 0
      ? "gender"
      : indexQuestion === 1
      ? "age"
      : indexQuestion === 2
      ? "metabolism"
      : indexQuestion === 3
      ? "weight"
      : indexQuestion === 4
      ? "weightGoal"
      : indexQuestion === 5
      ? "challenge"
      : "";

  if (!choice) {
    const handleSubmit = (e: FormEvent<HTMLFormElement> | any) => {
      e.preventDefault();

      if (+!inputRef.current!.value || +inputRef.current!.value < 30) {
        alert(
          "pls enter a valid option. (dev: to be replaced by toaster notifcation)"
        );
        return;
      }

      if (+inputRef.current!.value > 400) {
        alert(
          "you have the impossible weight. pls enter below or equal to 400 (placeholder: can either exceed or discuss what is to be the max)"
        );
        return;
      }
      setHasInputWeight(true);
      handleClick("weight", parseInt(inputRef.current!.value).toString());
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-full max-w-xs px-4"
      >
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="number"
            name="lbs"
            id="lbs"
            className="p-2 outline-none bg-transparent border-b-2 text-xl placeholder-transparent peer w-full"
            placeholder="In lbs"
            // min={20}
            // max={400}
          />
          <label
            htmlFor="lbs"
            className="absolute left-0 -top-3.5 peer-placeholder-shown:left-2 peer-placeholder-shown:top-2 peer-focus:left-0 peer-focus:-top-3.5 peer-focus:opacity-75 transition-all ease-in-out duration-300"
          >
            lbs
          </label>
        </div>
        <button
          disabled={hasInputWeight}
          className={`relative px-4 py-2 rounded-lg bg-gradient-to-b w-full ${
            hasInputWeight
              ? "cursor-not-allowed dark:from-lime-300 dark:to-lime-700"
              : "dark:from-amber-300 dark:to-amber-700 dark:hover:from-amber-400 dark:hover:to-amber-700 "
          }`}
          onClick={handleSubmit}
        >
          {hasInputWeight ? "Subbmitted" : "Submit"}{" "}
          {hasInputWeight && (
            <span className="absolute top-1/2 right-4 -translate-y-1/2">
              <FaCheckCircle />
            </span>
          )}
        </button>
      </form>
    );
  }

  return (
    <div className="w-full sm:w-3/4 sm:px-4 md:w-1/2 md:flex md:justify-center">
      <button
        disabled={pickedChoice ? true : false}
        onClick={() => handleClick(category, choice)}
        className={`${
          choice === pickedChoice
            ? "from-lime-300 to-lime-700  md:-translate-y-2"
            : pickedChoice
            ? "from-gray-600 to-gray-800 opacity-40 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 dark:from-red-500 dark:to-red-800  dark:hover:from-red-600  dark:hover:to-red-900 md:hover:-translate-y-2"
        } bg-gradient-to-b rounded-lg px-4 py-2  font-medium text-lg relative transition-all duration-300 ease-in-out w-full md:w-2/3 shadow-2xl`}
      >
        {choice}
        {choice === pickedChoice && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 ">
            <FaCheckCircle />
          </span>
        )}
      </button>
    </div>
  );
}

function SVGBackground() {
  return (
    <>
      <svg
        width="978"
        height="978"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-96 -left-80 scale-50"
      >
        <defs>
          <linearGradient x1="50%" y1=".779%" x2="50%" y2="100%" id="a">
            <stop stopColor="#0989B4" stopOpacity="0" offset="0%" />
            <stop stopColor="#53FFEE" offset="99.94%" />
          </linearGradient>
        </defs>
        <ellipse
          fill="url(#a)"
          transform="rotate(-135 489 489)"
          cx="489"
          cy="489"
          rx="489"
          ry="488"
          fillRule="evenodd"
          opacity=".5"
        />
      </svg>

      <svg
        className="absolute -bottom-80 -right-80 scale-50"
        width="978"
        height="978"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient x1="50%" y1=".779%" x2="50%" y2="100%" id="a">
            <stop stopColor="#0989B4" stopOpacity="0" offset="0%" />
            <stop stopColor="#53FFEE" offset="99.94%" />
          </linearGradient>
        </defs>
        <ellipse
          fill="url(#a)"
          transform="scale(1 -1) rotate(45 1669.55 0)"
          cx="489"
          cy="489"
          rx="489"
          ry="488"
          fillRule="evenodd"
          opacity=".25"
        />
      </svg>
    </>
  );
}

export default Quiz;
