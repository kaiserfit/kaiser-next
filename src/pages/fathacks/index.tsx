import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcCheckmark } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import InfoStats from "../../components/InfoStats";
import { uiActions } from "../../features/uiSlice";
import priceInformation from "../../lib/fathacksPage/priceInformation";
import freeBonuses from "../../lib/fathacksPage/features";
import {
  FreeBonus,
  PriceInformation,
  UserData,
  Member,
  Faq,
  CustomerReview,
} from "../../lib/types";
import video from "../../lib/vidalytics";
import { RootState } from "../../store";
import team from "../../lib/fathacksPage/team";
import faqData from "../../lib/fathacksPage/faq";
import ReactPaginate from "react-paginate";
import usePaginate from "../../hooks/usePaginate";
import customerReviews from "../../lib/fathacksPage/reviews";

function FathacksPage() {
  useEffect(() => {
    setTimeout(() => {
      // SCROLL TO PRICING SECTION
    }, 400000);
  }, []);

  return (
    <section className="pt-20">
      <HeroBanner />

      <div className="container mx-auto space-y-8 md:space-y-16 px-4">
        <CTA />
        <Pricing />
        <BuyerProtection />
        <BonusDescriptions />
        <TeamsSection />
        <FAQSection />
        <ReviewsSection />
        <CoachTestimonial />
      </div>
    </section>
  );
}

function HeroBanner() {
  // const { isWindowAtTop } = useSelector((state: RootState) => state.UI);

  const router = useRouter();

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userAnswers")!);
    if (!userData) {
      alert("pls answer the quiz before proceeding.");
      router.push("/quiz");
      return;
    }

    if (Object.keys(userData).length < 6) {
      alert("pls answer the quiz before proceeding.");
      router.push("/quiz");
      return;
    }
    setUserData(userData);
    video(
      globalThis,
      document,
      "Vidalytics",
      "vidalytics_embed_VGqpMgAid6usjq3x",
      "https://fast.vidalytics.com/embeds/YFVwMsqn/VGqpMgAid6usjq3x/"
    );
  }, [router]);

  return (
    <div className="space-y-8">
      {userData?.age && <Headline userData={userData} />}

      <div className="relative h-[825px] sm:h-[700px] md:h-[550px] border-b bg-gradient-to-t from-blue-600/50 to-transparent">
        <div className="relative w-full container mx-auto px-4">
          <div className={`flex flex-col items-center w-full space-y-4`}>
            <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-start md:gap-x-8 items-center gap-y-8 md:gap-y-0 w-full">
              <div
                className="max-w-[300px]"
                id="vidalytics_embed_VGqpMgAid6usjq3x"
              >
                {/* VIDEO HERE */}
              </div>
              <div className="space-y-6 md:pt-16">
                <h2 className="text-6xl font-bold max-w-2xl">
                  We want <br /> to help you
                </h2>
                <p className="font-light max-w-xl">
                  In this video Coach Shane, Celebrity Trainer and Head
                  Transformation Coach shares your FREE Custom Transformation
                  Plan that you can start using today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Headline({ userData }: { userData: UserData }) {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1,
  });
  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(inView));
  }, [inView, dispatch]);
  return (
    <div className="flex flex-col items-center space-y-2 px-4">
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
      className="space-y-8 md:space-y-20 container mx-auto px-4 scroll-pt-8"
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

function BonusDescriptions() {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <h3>
        You also get these 7 <span>free bonus gifts</span> when you order today
      </h3>

      <Features />
    </div>
  );
}

function Features() {
  return (
    <div className="container mx-auto space-y-12">
      {freeBonuses.map((feature, i) => (
        <Feature key={Math.random() * 364} index={i} feature={feature} />
      ))}
    </div>
  );
}

function Feature({ feature, index }: { feature: FreeBonus; index: number }) {
  // const [readMore, setReadMore] = useState(false);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-md shadow-sm  ${
        index % 2 == 0 ? "md:flex-row" : "md:flex-row-reverse"
      } `}
    >
      <div className="relative w-full md:w-1/3 h-80">
        <Image
          src={feature.photo}
          alt={feature.title}
          layout="fill"
          objectFit="contain"
          className="absolute aspect-video "
        />
      </div>
      <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-900 space-y-4">
        <span className="text-xs uppercase dark:text-gray-400">
          Bonus #{index + 1}
        </span>
        <h3 className="text-3xl font-bold">{feature.title}</h3>
        <div className="space-y-1">
          <p>{feature.paragraph1}</p>
          <p>{feature.paragraph2}</p>
          <p>{feature.paragraph3}</p>
          <p>{feature.paragraph4}</p>
          <p>{feature.paragraph5}</p>
          <p>{feature.paragraph6}</p>
          {/* <p className="my-6 dark:text-gray-400">
            {feature.description.length > 200 && !readMore
              ? feature.description.substring(0, 200).concat("...")
              : feature.description}{" "}
            <span
              className="hover:underline hover:text-blue-400 cursor-pointer"
              onClick={() => setReadMore((prev) => !prev)}
            >
              {readMore ? "Read less" : "Read more"}
            </span>
          </p> */}
          {/* <button type="button" className="self-start">
          Action
        </button> */}
        </div>
      </div>
    </div>
  );
}

function TeamsSection() {
  return (
    <div className="container mx-auto flex flex-col items-center space-y-8">
      <div className="space-y-8 text-center max-w-xl">
        <h2 className="text-2xl font-bold">Our team</h2>
        <p className=" text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, in
          quisquam. Molestiae cupiditate iure quaerat illum enim aspernatur
          omnis, autem natus corrupti.
        </p>
      </div>

      <Team />

      <Link passHref href="#pricing">
        <a className="px-4 py-2 rounded-lg outline hover:scale-110 transition-all duration-300 ease-in-out">
          Sign up now
        </a>
      </Link>
    </div>
  );
}

function Team() {
  return (
    <div className="flex flex-col sm:flex-wrap sm:flex-row gap-y-4 sm:gap-y-6">
      {team.map((person) => (
        <Member key={Math.random() * 353} person={person} />
      ))}
    </div>
  );
}

function Member({ person }: { person: Member }) {
  return (
    <div className="w-full sm:w-1/3 md:w-1/4 sm:px-4 flex justify-center">
      <div className="space-y-1">
        <div className="relative h-40 w-40">
          <Image
            src={person.photo}
            alt={person.name}
            className="rounded-full absolute"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          {person.role && <span className="font-semibold">{person.role}</span>}
          <h4 className="capitalize">{person.name}</h4>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <div>
      <h2>FAQ</h2>
      <div className="outline p-8 container mx-auto">
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <FAQ key={Math.random() * 353} index={i} info={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQ({ info, index }: { info: Faq; index: number }) {
  return (
    <details
      className="p-6 border-l-4 border-green-500 bg-gray-100 dark:bg-slate-600 group"
      open={index === 0 ? true : false}
    >
      <summary className="flex items-center justify-between cursor-pointer">
        <h5 className="text-lg font-medium ">{info.question}</h5>

        <span className="flex-shrink-0 ml-1.5 p-1.5 bg-white dark:bg-slate-500 rounded-full sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </summary>

      <p className="mt-4 leading-relaxed pt-4 border-t-[1px]">{info.answer1}</p>
      {info.answer2 && <p className="mt-4 leading-relaxed ">{info.answer2}</p>}
      {info.answer3 && <p className="mt-4 leading-relaxed ">{info.answer3}</p>}
      {info.answer4 && <p className="mt-4 leading-relaxed ">{info.answer4}</p>}
      {info.answer5 && <p className="mt-4 leading-relaxed ">{info.answer5}</p>}
    </details>
  );
}

function ReviewsSection() {
  return (
    <div>
      <h3>Customer reviews</h3>

      <Reviews />
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews] = useState<CustomerReview[]>();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchLocalData = (page: number) => {
    const startIndex = page * itemsPerPage;
    const lastIndex = startIndex + itemsPerPage;
    const fetchedData = customerReviews.filter((_, i: number) => {
      return i >= startIndex && lastIndex > i;
    });
    // console.log(fetchedData);
    setReviews(fetchedData);
  };

  const handlePageClick = (e: { selected: number }) => {
    // console.log(e.selected);

    fetchLocalData(e.selected);
  };

  useEffect(() => {
    fetchLocalData(currentPage);
  }, []);

  return (
    <div>
      {reviews?.map((review, i) => (
        <Review key={Math.random() * 987} index={i} review={review} />
      ))}

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={3}
        previousLabel="<"
        className="flex justify-center space-x-4 w-full"
        activeClassName=" text-red-400"
      />
    </div>
  );
}

function Review({ review, index }: { review: CustomerReview; index: number }) {
  return (
    <div
      id={`${index === 0 ? "top" : ""}`}
      className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100"
    >
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          {/* <div>
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
            />
          </div> */}
          <div>
            <h4 className="font-bold">{review.name}</h4>
            {/* <span className="text-xs dark:text-gray-400">2 days ago</span> */}
          </div>
        </div>
        <div className="flex items-center space-x-2 dark:text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 fill-current"
          >
            <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
          </svg>
          <span className="text-xl font-bold">
            {Math.random() * 1 > 0.5 ? 4 : 5}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm dark:text-gray-400">
        <p>{review.title}</p>
        <p>{review.opinion}</p>
      </div>
    </div>
  );
}

function CoachTestimonial() {
  return (
    <div className="space-y-4 relative">
      <h2>
        Coach Shane has been helping women transform for the last 14 years.
      </h2>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="space-y-16 w-full md:w-2/3">
          <div className="space-y-4 z-[5]">
            <p>
              Coach Shane is the best selling author of the book Fat Loss Super
              System and founder of the company KaiserFit. He is the creator of
              Kaiser Coach and has used his years of knowledge coaching women to
              create a Personal 1 on 1 Coach ANY WOMAN CAN USE.
            </p>
            <p>
              Coach Shane&apos;s life mission is to help millions of women
              discover the TRUTH about weight loss and help them achieve the
              easiest transformation of their life.
            </p>
          </div>
          <div>
            <Link passHref href="#pricing">
              <a className="px-4 py-2 rounded-lg outline hover:scale-110 transition-all duration-300 ease-in-out">
                Sign up now
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-40 md:-bottom-52 md:right-0 md:block w-full md:w-1/3 h-[650px] ">
          <Image
            src="/images/fathacks/Shane-noBG.png"
            alt="Shane"
            layout="fill"
            objectFit="cover"
            className="scale-90"
          />
        </div>
      </div>
    </div>
  );
}
export default FathacksPage;
