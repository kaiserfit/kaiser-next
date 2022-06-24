import { useRouter } from "next/router";
import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
// import { useQuery } from "react-query";
import { questionData } from "../../lib/types";
import { BsDashLg, BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { GiDna2, GiWeight, GiStairsGoal, GiBarrier } from "react-icons/gi";
import Image from "next/image";

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
      setQuestion(data);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  // const { data, isLoading } = useQuery(
  //   ["question", indexQuestion],
  // );

  const handleClick = (category: string, choice: string) => {
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

  useEffect(() => {
    if (indexQuestion) {
      fetchQuestion(indexQuestion);
    }
  }, [indexQuestion]);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify({}));
  }, []);

  return (
    <section className="container mx-auto flex flex-col items-center space-y-4">
      {/* <h2 className="text-3xl font-bold">Kaiserfit assessment quiz</h2> */}

      <InfoStats
        gender={gender}
        age={age}
        weight={weight}
        weightGoal={weightGoal}
        metabolism={metabolism}
        challenge={challenge}
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
      />
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
}: {
  gender: string;
  age?: string;
  metabolism?: string;
  weight?: string;
  weightGoal?: string;
  challenge?: string;
}) {
  return (
    <div className="flex space-x-4">
      {gender && (
        <div className="flex items-end space-x-2">
          <BsPersonFill className="text-2xl" />
          <p className="font-light">
            Gender: <span className="font-bold text-2xl">{gender}</span>
          </p>
        </div>
      )}
      {age && (
        <div className="flex items-end space-x-2">
          <BsPeopleFill className="text-2xl" />
          <p className="font-light">
            Age: <span className="font-bold text-2xl">{age}</span>
          </p>
        </div>
      )}
      {metabolism && (
        <div className="flex items-end space-x-2">
          <GiDna2 className="text-2xl" />
          <p className="font-light">
            Metabolism: <span className="font-bold text-2xl">{metabolism}</span>
          </p>
        </div>
      )}
      {weight && (
        <div className="flex items-end space-x-2">
          <GiWeight className="text-2xl" />
          <p className="font-light">
            Weight: <span className="font-bold text-2xl">{weight}</span>
          </p>
        </div>
      )}
      {weightGoal && (
        <div className="flex items-end space-x-2">
          <GiStairsGoal className="text-2xl" />
          <p className="font-light">
            Weight Goal:{" "}
            <span className="font-bold text-2xl">{weightGoal}</span>
          </p>
        </div>
      )}
      {challenge && (
        <div className="flex items-end space-x-2">
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
          } ${i > indexQuestion && "text-purple-500"} text-3xl font-medium`}
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
}: {
  indexQuestion: number;
  loading: boolean;
  question: questionData;
  pickedChoice?: string;
  handleClick: (category: string, choice: string) => void;
}) {
  return (
    <div className="space-y-4 max-w-xs ">
      <div className="text-center">
        <h3 className="text-lg font-light tracking-wider">
          Question{" "}
          <span className="text-2xl font-medium">{indexQuestion + 1}</span> / 6
        </h3>

        <h3
          className={`${
            loading ? "animate-slideToLeft" : "relative animate-teleportToRight"
          } text-2xl font-semibold capitalize transition-all duration-1000 ease-in-out`}
        >
          {question.question}
        </h3>
      </div>

      <div
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } flex flex-col items-center pt-4 space-y-4 transition-all duration-300 ease-in-out`}
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
      if (+inputRef.current!.value > 400) {
        alert(
          "you have the impossible weight. pls enter below or equal to 400"
        );
        return;
      }
      handleClick("weight", inputRef.current!.value);
    };
    return (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* <input ref={inputRef} type="range" min={0} max={400} name="" id="" /> */}
        <div className="relative">
          <input
            ref={inputRef}
            type="number"
            name="lbs"
            id="lbs"
            className="p-2 outline-none bg-transparent border-b-2 text-xl placeholder-transparent peer"
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
          className="px-4 py-2 rounded-lg bg-gradient-to-b dark:from-amber-300 dark:to-amber-700 dark:hover:from-amber-400 dark:hover:to-amber-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }

  return (
    <button
      onClick={() => handleClick(category, choice)}
      className={`${
        choice === pickedChoice
          ? "bg-green-600 dark:from-lime-300 dark:to-lime-700 dar bg-gradient-to-b"
          : "bg-gray-100 dark:bg-slate-500 hover:bg-gray-200 dark:hover:bg-slate-600"
      }  rounded-lg px-4 py-2 w-3/4 font-light relative`}
    >
      {choice}
      {choice === pickedChoice && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 ">
          <FaCheckCircle />
        </span>
      )}
    </button>
  );
}

export default Quiz;
