import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import InfoStats from "../../components/InfoStats";
import { uiActions } from "../../features/uiSlice";
import priceInformation, { freeBonuses } from "../../lib/priceInformation";
import { PriceInformation, UserData } from "../../lib/types";
import video from "../../lib/vidalytics";
import { RootState } from "../../store";

function FathacksPage() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userAnswers")!);
    if (Object.keys(userData).length < 6) {
      alert("pls answer the quiz before proceeding.");
      router.push("/quiz");
      return;
    }
    setUserData(userData);
  }, []);

  // console.log(userData);

  if (userData?.age) {
    Object.values(userData).forEach((item) => console.log(item));
  }

  useEffect(() => {
    setTimeout(() => {
      // SCROLL TO PRICING SECTION
    }, 400000);
  }, []);

  return (
    <section className="pt-20 relative space-y-8 md:space-y-16">
      {userData?.age && <Headline userData={userData} />}

      <div className="relative w-full h-[600px]">
        <Video />
      </div>
      <CTA />

      {/* <h2 className="relative max-h-max">COCK COKC OKC232</h2> */}
      <Pricing />

      <BuyerProtection />
    </section>
  );
}

function Headline({ userData }: { userData: UserData }) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(inView));
  }, [inView]);
  return (
    <div className="flex flex-col items-center space-y-2">
      <h2 className="text-2xl font-bold" ref={ref}>
        Your results
      </h2>
      <div className="flex space-x-4">
        {userData.age && (
          <InfoStats
            gender={userData.gender}
            age={userData.age}
            metabolism={userData.metabolism}
            weight={userData.weight}
            weightGoal={userData.weightGoal}
            challenge={userData.challenge}
          />
        )}
        {/* {Object.entries(userData).map((item) => (
      <InfoStat key={Math.random() * 232} arr={item} />
    ))} */}
      </div>
    </div>
  );
}

// function InfoStat({ arr }: { arr: [string, "string"] }) {
//   return (
//     <div>
//       <span>
//         {arr[0]}: {arr[1]}
//       </span>
//     </div>
//   );
// }

function Video() {
  const { isWindowAtTop } = useSelector((state: RootState) => state.UI);

  useEffect(() => {
    video(
      globalThis,
      document,
      "Vidalytics",
      "vidalytics_embed_VGqpMgAid6usjq3x",
      "https://fast.vidalytics.com/embeds/YFVwMsqn/VGqpMgAid6usjq3x/"
    );
  }, []);
  return (
    <div className={`flex flex-col items-center w-full space-y-4`}>
      <h2 className="max-w-md text-center">
        In this video Coach Shane, Celebrity Trainer and Head Transformation
        Coach shares your FREE Custom Transformation Plan that you can start
        using today
      </h2>
      <div
        className="max-w-[300px]"
        id="vidalytics_embed_VGqpMgAid6usjq3x"
      ></div>
    </div>
  );
}

function CTA() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateToday = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return (
    <div>
      <section className="bg-transparent">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto lg:flex-row">
          <div className="flex justify-center xl:w-1/2">
            <img
              className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
              src="/images/fathacks/Shane-Enhanced.jpg"
              alt=""
            />
          </div>

          <div className="flex flex-col items-center xl:items-start xl:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl dark:text-white">
              Claim your bundle now
            </h2>

            <p className="block max-w-2xl text-xl text-gray-500 dark:text-gray-300">
              Warning: Due to unexpected demand, we cannot guarantee a spot In
              The Dream Body In 90 Challenge after {}
              {`${dateToday} ${monthNames[month]}`}, {year}. Sign up immediately
              to secure your spot before Membership is FULL.
            </p>

            <div className="flex space-x-4">
              <p>queen formula stock: LOW</p>
              <p>sell out risk: HIGH</p>
              <p>kaiser coach FREE passes remaining - 13</p>
            </div>

            {/* <div className="flex space-x-4">
              <a
                href=""
                className="inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Get started today
              </a>

              <a
                href=""
                className="inline-block px-5 py-3 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Learn more
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

function Pricing() {
  return (
    <div
      id="pricing"
      className="space-y-8 md:space-y-20 container mx-auto px-4"
    >
      <div className="flex w-full justify-center text-center">
        <h1 className="text-2xl md:text-5xl max-w-md">
          Claim Your Saving Bundle While Stocks Last
        </h1>
      </div>
      <Prices />
    </div>
  );
}

function Prices() {
  return (
    <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-10">
      {priceInformation.map((item) => (
        <Price key={Math.random() * 123} info={item} />
      ))}
    </div>
  );
}

function Price({ info }: { info: PriceInformation }) {
  return (
    <div
      className={`w-full flex flex-col justify-between md:w-1/3 outline rounded-lg space-y-4 shadow-xl pt-8 ${
        info.title === "ultimate"
          ? "relative bg-gradient-to-b from-blue-700 to-blue-900 md:scale-110"
          : ""
      }`}
    >
      <div className="space-y-4 px-4">
        <h3
          className={`${
            info.title === "ultimate"
              ? "absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-2xl outline bg-blue-600 px-2 py-1"
              : " font-semibold text-xl"
          } capitalize traciking-wide`}
        >
          {info.title}
        </h3>
        <div className="relative w-full h-40">
          <Image
            src={info.photo}
            alt={info.title}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
        <div>
          <h3 className="text-3xl">
            ${info.discountedPrice} <span className="text-sm">per bottle</span>
          </h3>
        </div>
        {info.shipping > 0 && <p>with a shipping fee of ${info.shipping}</p>}
        <div>
          <p>Includes:</p>
          <ul>
            {info.bonus && (
              <li className="flex space-x-4 items-center ">
                <span>
                  <FcCheckmark />
                </span>
                <span>free bonuses</span>
              </li>
            )}
            {!info.shipping && (
              <li className="flex space-x-4 items-center ">
                <span>
                  <FcCheckmark />
                </span>
                <span>free shipping</span>
              </li>
            )}
            {freeBonuses.map((item) => (
              <li
                className="flex space-x-4 items-center "
                key={Math.random() * 456}
              >
                <span>
                  <FcCheckmark />
                </span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="px-4 py-2 outline rounded-lg w-full">
        Add to cart
      </button>
    </div>
  );
}

function BuyerProtection() {
  return (
    <div className="w-full relative h-60 md:h-96">
      <Image
        src="/images/fathacks/mb-guarantee.jpg"
        alt=""
        layout="fill"
        // objectFit="contain"
        className="absolute object-contain top-0 md:-translate-y-0"
      />
    </div>
  );
}

export default FathacksPage;
