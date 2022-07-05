import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import priceInformation from "../../lib/fathacksPage/priceInformation";
import { PriceInformation } from "../../lib/types";

function CheckoutPage() {
  const router = useRouter();
  const [chosenBundle, setChosenBundle] = useState<PriceInformation>();

  useEffect(() => {
    const storedItem: { bundle: string } = JSON.parse(
      localStorage.getItem("bundle")!
    );
    if (!storedItem || !Object.values(storedItem).length) {
      alert("pls choose a bundle before proceeding");
      router.push("/fathacks");
      return;
    }
    const itemBundle = priceInformation.find(
      (item) => item.title === storedItem.bundle
    );
    setChosenBundle(itemBundle);
  }, []);
  return <div className="pt-16">{chosenBundle?.title}</div>;
}

export default CheckoutPage;
