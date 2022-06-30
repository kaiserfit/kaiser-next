import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import InfoStats from "../../components/InfoStats";
import { uiActions } from "../../features/uiSlice";
import { UserData } from "../../lib/types";
import video from "../../lib/vidalytics";
import { RootState } from "../../store";
function FathacksPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 1,
  });

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

  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(inView));
  }, [inView]);

  // console.log(userData);

  if (userData?.age) {
    Object.values(userData).forEach((item) => console.log(item));
  }

  return (
    <section className="pt-20 relative space-y-4">
      {userData?.age && (
        <div className="flex flex-col items-center">
          <h2 ref={ref}>your results</h2>
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
      )}

      <div className="relative w-full h-[550px]">
        <Video />
      </div>
      <p className="z-50">ok</p>

      {/* <h2 className="relative max-h-max">COCK COKC OKC232</h2> */}
    </section>
  );
}

function InfoStat({ arr }: { arr: [string, "string"] }) {
  return (
    <div>
      <span>
        {arr[0]}: {arr[1]}
      </span>
    </div>
  );
}

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
    <div className={`flex justify-center w-full outline`}>
      {/* <h2>yes</h2> */}
      <div
        className="max-w-[300px] opacity-20"
        id="vidalytics_embed_VGqpMgAid6usjq3x"
      ></div>
    </div>
  );
}

export default FathacksPage;
