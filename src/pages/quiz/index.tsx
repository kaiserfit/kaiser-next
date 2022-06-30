import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useRef, useState } from "react";
// import { useQuery } from "react-query";
import { QuestionData } from "../../lib/types";
import { BsDashLg, BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { GiDna2, GiWeight, GiStairsGoal, GiBarrier } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { uiActions } from "../../features/uiSlice";
import Image from "next/image";
import InfoStats from "../../components/InfoStats";

const firstQuestion = {
  question: "what is your gender?",
  choices: ["male", "female"],
};

function Quiz() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const initial = useRef<boolean>(false);

  const [question, setQuestion] = useState(firstQuestion);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isUserDataReady, setIsUserDataReady] = useState(false);

  // user input states
  const [pickedChoice, setPickedChoice] = useState("");
  const [gender, setGender] = useState<string>();
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
      const { data }: { data: QuestionData } = await response.json();
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
      const userAnswers = { gender: choice };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
    if (category === "age") {
      setAge(choice);
      const userAnswers = { gender, age: choice };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
    if (category === "metabolism") {
      setMetabolism(choice);
      const userAnswers = { gender, age, metabolism: choice };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
    if (category === "weight") {
      setWeight(choice);
      const userAnswers = { gender, age, metabolism, weight: choice };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
    if (category === "weightGoal") {
      setWeightGoal(choice);
      const userAnswers = {
        gender,
        age,
        metabolism,
        weight,
        weightGoal: choice,
      };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }
    if (category === "challenge") {
      setChallenge(choice);
      const userAnswers = {
        gender,
        age,
        metabolism,
        weight,
        weightGoal,
        challenge: choice,
      };
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }

    if (indexQuestion === 5) {
      // const userAnswers = {
      //   gender,
      //   age,
      //   metabolism,
      //   weight,
      //   weightGoal,
      //   challenge: choice,
      // };
      // const sendData = async () => {
      //   const response = await fetch("");
      // };
      // localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      // router.push("https://kaizerfit.com/fathacks-vsl.html");
      router.push("/fathacks");
      return;
    }

    setTimeout(() => setIndexQuestion((prev) => prev + 1), 1000);
  };

  const handlePreviousQuestion = () => {
    if (indexQuestion === 1) {
      setGender("");
      localStorage.removeItem("userAnswers");
    }
    if (indexQuestion === 2) {
      setAge("");
      const storedUserData = JSON.parse(localStorage.getItem("userAnswers")!);
      const updatedUserData = Object.entries(storedUserData).slice(
        0,
        indexQuestion - 1
      );
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(Object.fromEntries(updatedUserData))
      );
    }
    if (indexQuestion === 3) {
      setMetabolism("");
      const storedUserData = JSON.parse(localStorage.getItem("userAnswers")!);
      const updatedUserData = Object.entries(storedUserData).slice(
        0,
        indexQuestion - 1
      );
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(Object.fromEntries(updatedUserData))
      );
    }
    if (indexQuestion === 4) {
      setWeight("");
      const storedUserData = JSON.parse(localStorage.getItem("userAnswers")!);
      const updatedUserData = Object.entries(storedUserData).slice(
        0,
        indexQuestion - 1
      );
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(Object.fromEntries(updatedUserData))
      );
    }
    if (indexQuestion === 5) {
      setWeightGoal("");
      const storedUserData = JSON.parse(localStorage.getItem("userAnswers")!);
      const updatedUserData = Object.entries(storedUserData).slice(
        0,
        indexQuestion - 1
      );
      localStorage.setItem(
        "userAnswers",
        JSON.stringify(Object.fromEntries(updatedUserData))
      );
    }
    setIndexQuestion((prev) => prev - 1);
  };

  useEffect(() => {
    // if (indexQuestion) {
    if (!initial.current) {
      initial.current = true;
      return;
    }
    fetchQuestion(indexQuestion);
    // }
  }, [indexQuestion]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userAnswers")!);
    if (!storedUserData) {
      setIndexQuestion(0);
      setTimeout(() => setIsUserDataReady(true), 900);
      return;
    }

    if (!Object.keys(storedUserData).length) {
      setIndexQuestion(0);
      setTimeout(() => setIsUserDataReady(true), 900);
      return;
    }
    if (Object.keys(storedUserData).length) {
      setIndexQuestion(Object.keys(storedUserData).length);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 1) {
      setGender(Object.values<string>(storedUserData)[0]);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 2) {
      setGender(Object.values<string>(storedUserData)[0]);
      setAge(Object.values<string>(storedUserData)[1]);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 3) {
      setGender(Object.values<string>(storedUserData)[0]);
      setAge(Object.values<string>(storedUserData)[1]);
      setMetabolism(Object.values<string>(storedUserData)[2]);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 4) {
      setGender(Object.values<string>(storedUserData)[0]);
      setAge(Object.values<string>(storedUserData)[1]);
      setMetabolism(Object.values<string>(storedUserData)[2]);
      setWeight(Object.values<string>(storedUserData)[3]);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 5) {
      setGender(Object.values<string>(storedUserData)[0]);
      setAge(Object.values<string>(storedUserData)[1]);
      setMetabolism(Object.values<string>(storedUserData)[2]);
      setWeight(Object.values<string>(storedUserData)[3]);
      setWeightGoal(Object.values<string>(storedUserData)[4]);
      setTimeout(() => setIsUserDataReady(true), 900);
    }
    if (Object.keys(storedUserData).length === 6) {
      localStorage.removeItem("userAnswers");
      setTimeout(() => setIsUserDataReady(true), 900);
    }
  }, []);

  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(inView));
  }, [inView]);

  return (
    <section
      ref={ref}
      className="pt-8 md:pt-12 pb-20 min-h-screen bg-gradient-to-br from-blue-300 to-blue-600 dark:from-blue-300 dark:to-blue-800"
    >
      {/* <h2 className="text-3xl font-bold">Kaiserfit assessment quiz</h2> */}

      {/* <Image
        src={"/images/quiz/quiz-bg.png"}
        alt="quiz-bg"
        layout="fill"
        objectFit="cover"
        className="absolute brightness-[0.6]"
      /> */}

      <SVGBackground />

      {isUserDataReady && (
        <div className="container mx-auto flex flex-col items-center space-y-4 relative px-4 sm:px-6 lg:px-8">
          <TitlePage />

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
      )}
    </section>
  );
}

function TitlePage() {
  return (
    <div className="text-center max-w-xl">
      <div className="relative h-40">
        <Image
          src={"/images/quiz/genetic-code.webp"}
          alt="genetic code"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <h2 className="text-4xl font-bold">
        <span className="">Discover</span> your genetic code
      </h2>
      <h3 className="text-xl font-light tracking-wide">
        {" "}
        <span>Unlock</span> your plan
      </h3>
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
          } ${
            i > indexQuestion && "text-amber-500"
          } text-xl sm:text-3xl font-medium`}
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
  question: QuestionData;
  pickedChoice?: string;
  handleClick: (category: string, choice: string) => void;
  handlePreviousQuestion: () => void;
}) {
  const currentQuestion =
    question?.question.charAt(0).toUpperCase() +
    question?.question.slice(1, question?.question.length);
  return (
    <div
      className={`${
        loading ? "animate-slideToLeft" : "relative animate-teleportToRight"
      } pt-0 p-4 sm:pt-4 sm:p-8 rounded-2xl space-y-4 backdrop-blur-sm bg-white/20 relative w-full max-w-6xl shadow-2xl`}
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
        <h3 className="sm:text-lg font-light tracking-wider">
          Question{" "}
          <span className="text-xl sm:text-2xl font-semibold text-amber-300">
            {indexQuestion + 1}
          </span>{" "}
          / 6
        </h3>

        <h3
          className={`text-xl sm:text-2xl font-semibold transition-all duration-1000 ease-in-out`}
        >
          {currentQuestion}
        </h3>
      </div>

      <div
        className={`flex flex-col md:flex-row md:flex-wrap items-center sm:pt-4 gap-y-4 transition-all duration-300 ease-in-out justify-center`}
      >
        {question?.choices &&
          question.choices.map((choice, i) => (
            <Choice
              pickedChoice={pickedChoice}
              key={Math.random() * 123}
              choice={choice}
              handleClick={handleClick}
              indexQuestion={indexQuestion}
            />
          ))}
        {!question?.choices && <Choice handleClick={handleClick} />}
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
  choice?: string;
  handleClick: (category: string, choice: string) => void;
  indexQuestion?: number;
  pickedChoice?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputWeight, setInputWeight] = useState(0);
  const [submitWeight, setSubmitWeight] = useState(false);

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

      if (!inputWeight || inputWeight < 30) {
        alert(
          "pls enter a valid option. (dev: to be replaced by toaster notifcation)"
        );
        return;
      }

      setSubmitWeight(true);
      handleClick("weight", inputWeight.toString());
    };

    setTimeout(() => inputRef.current?.focus(), 500);

    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-6 sm:space-y-4 w-full max-w-xs px-4"
      >
        <div className="relative w-full text-center">
          <input
            // ref={inputRef}
            type="range"
            // name="lbs"
            className="w-full"
            onChange={(e) => setInputWeight(+e.currentTarget.value)}
            value={inputWeight}
            max={400}
          />

          <span className="w-full text-xl font-medium">{inputWeight} lbs</span>
        </div>
        <button
          disabled={submitWeight}
          className={`relative px-4 py-2 rounded-lg bg-gradient-to-b w-full ${
            submitWeight
              ? "dark:from-lime-300 dark:to-lime-700"
              : "dark:from-amber-300 dark:to-amber-700 dark:hover:from-amber-400 dark:hover:to-amber-700 "
          }`}
          onClick={handleSubmit}
        >
          {submitWeight ? "Subbmitted" : "Submit"}
          {submitWeight && (
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
        } bg-gradient-to-b rounded-lg px-4 py-2  font-medium sm:text-lg relative transition-all duration-300 ease-in-out w-full md:w-2/3 shadow-2xl`}
      >
        {choice.charAt(0).toUpperCase() + choice.slice(1, choice.length)}
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
