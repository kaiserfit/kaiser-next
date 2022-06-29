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
      <div className="flex">
        <Video />
        <h2 className="outline w-3/4 z-10">yes</h2>
      </div>

      <h2 className="z-20 relative">COCK COKC OKC232</h2>
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
    <div className="relative w-full max-h-40">
      <div style={{ paddingTop: "50%" }} id="vidalytics_embed_VGqpMgAid6usjq3x">
        {/* VIDEO HERE */}
      </div>
    </div>
  );
}

export default FathacksPage;
