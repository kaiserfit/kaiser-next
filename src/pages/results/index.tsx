import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import { UserData } from "../../lib/types";

function Results() {
  const [usersInfo, setUsersInfo] = useState<UserData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAnswers = JSON.parse(localStorage.getItem("userAnswers")!);
    if (userAnswers) {
      setLoading(false);
      setUsersInfo(userAnswers);
    }
  }, []);

  if (loading) return <div>insert loading animation here</div>;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-4">
      <h2>Results</h2>
      <div className="flex space-x-4">
        <p>
          gender: <span>{usersInfo?.gender}</span>
        </p>
        <p>
          age: <span>{usersInfo?.age}</span>
        </p>
        <p>
          metabolism: <span>{usersInfo?.metabolism}</span>
        </p>
        <p>
          weight: <span>{usersInfo?.weight}</span> lbs
        </p>
        <p>
          weight goal: <span>{usersInfo?.weightGoal}</span>
        </p>
        <p>
          challenge: <span>{usersInfo?.challenge}</span>
        </p>
      </div>
    </section>
  );
}

export default Results;
