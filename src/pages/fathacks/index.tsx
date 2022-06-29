import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { UserData } from "../../lib/types";
import video from "../../lib/vidalytics";
function FathacksPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userAnswers")!);
    if (!Object.keys(userData).length) {
      alert("pls answer the quiz before proceeding.");
      router.push("/quiz");
      return;
    }
    setUserData(userData);
  }, []);

  return (
    <section className="pt-24 relative">
      {userData?.age}
      <Video />
      <h2 className="z-20 relative">COCK COKC OKC</h2>
    </section>
  );
}

function Video() {
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
    <div className="absolute left-4 md:left-1/4">
      <div
        id="vidalytics_embed_VGqpMgAid6usjq3x"
        // style={{ width: "100%", height: "50vh", paddingTop: "56.25%" }}
        className="min-h-[1rem] w-40 relative"
      >
        {/* VIDEO HERE */}
      </div>
    </div>
  );
}

export default FathacksPage;
