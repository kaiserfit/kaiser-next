import React from "react";
import { BsPersonFill, BsPeopleFill } from "react-icons/bs";
import { GiDna2, GiWeight, GiStairsGoal, GiBarrier } from "react-icons/gi";

function InfoStats({
  gender,
  age,
  metabolism,
  weight,
  goal,
  challenge,
  indexQuestion,
}: {
  gender?: string;
  age?: string;
  metabolism?: string;
  weight?: string;
  goal?: string;
  challenge?: string;
  indexQuestion?: number;
}) {
  return (
    <div className="flex flex-wrap sm:justify-center w-full">
      {gender && (
        <div
          className={`flex sm:justify-center items-center sm:items-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3 ${
            indexQuestion! < 2 ? "w-full" : ""
          }`}
        >
          <BsPersonFill className="sm:text-2xl" />
          <p className="font-light sm:text-base">
            Gender: <span className="font-bold sm:text-2xl">{gender}</span>
          </p>
        </div>
      )}
      {age && (
        <div className="flex items-center sm:items-end sm:justify-center justify-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3">
          <BsPeopleFill className="sm:text-2xl" />
          <p className="font-light">
            Age: <span className="font-bold sm:text-2xl">{age}</span>
          </p>
        </div>
      )}
      {metabolism && (
        <div className="flex sm:justify-center items-center sm:items-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3">
          <GiDna2 className="sm:text-2xl" />
          <p className="font-light">
            Metabolism:{" "}
            <span className="font-bold sm:text-2xl">{metabolism}</span>
          </p>
        </div>
      )}
      {weight && (
        <div className="flex items-center sm:items-end sm:justify-center justify-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3">
          <GiWeight className="sm:text-2xl" />
          <p className="font-light">
            Weight: <span className="font-bold sm:text-2xl">{weight} lbs</span>
          </p>
        </div>
      )}
      {goal && (
        <div className="flex sm:justify-center items-center sm:items-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3">
          <GiStairsGoal className="sm:text-2xl" />
          <p className="font-light flex flex-col sm:block">
            Goal: <span className="font-bold sm:text-2xl">{goal}</span>
          </p>
        </div>
      )}
      {challenge && (
        <div className="flex items-center sm:items-end sm:justify-center justify-end space-x-1 md:space-x-2 w-1/2 sm:w-1/2 lg:w-1/3">
          <GiBarrier className="sm:text-2xl" />
          <p className="font-light flex flex-col sm:block">
            Challenge:{" "}
            <span className="font-bold sm:text-2xl">{challenge}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default InfoStats;
