import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import priceInformation from "../../../lib/fathacksPage/priceInformation";
import { PriceInformation } from "../../../lib/types";

function SuccessPage() {
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
    console.log(itemBundle);
  }, [router]);
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 space-y-8">
      <div className="relative h-20 md:w-1/4">
        <Image
          src="/images/kaiser.webp"
          alt="kaiserfit"
          layout="fill"
          objectFit="contain"
          className="absolute "
        />
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold">
          Thank you for choosing us!
        </h2>
        <h3 className="text-lg font-medium">Your order is a confirmed!</h3>
      </div>

      <div>
        <h4 className="text-lg">
          Hello <span className="italic">(name or email of customer)</span>{" "}
        </h4>
        <p>Kindly check your order details below.</p>
      </div>

      {chosenBundle && <OrderDetails chosenBundle={chosenBundle} />}

      <div className="md:w-1/3 md:ml-auto space-y-1 border-b-2 pb-2">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${chosenBundle?.discountedPrice! * chosenBundle?.quantity!}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>{chosenBundle?.shipping ? `$${chosenBundle.shipping}` : "Free"}</p>
        </div>
        <div className="flex justify-between">
          <p>totals</p>
          <p>
            $
            {chosenBundle?.discountedPrice! * chosenBundle?.quantity! +
              chosenBundle?.shipping!}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-2xl md:text-3xl font-bold">
          Thank you for choosing us!
        </h4>
        <p className="text-lg md:text-xl font-medium">Kaiserfit team</p>
      </div>
    </section>
  );
}

function OrderDetails({ chosenBundle }: { chosenBundle: PriceInformation }) {
  return (
    <>
      <div className="border-b-2 pb-2">
        <h4 className="text-lg md:text-xl font-medium">Order details</h4>
      </div>
      <div className="flex justify-between items-center pb-2 border-b-2">
        <div className="flex items-center space-x-4 w-[90%]">
          <div className="relative w-28 h-28">
            <Image
              src={chosenBundle?.photo}
              alt={chosenBundle?.title}
              objectFit="contain"
              layout="fill"
            />
          </div>
          <div>
            <h4 className="md:text-lg font-medium capitalize">
              {chosenBundle?.title}
            </h4>
            <p className="capitalize font-light">{chosenBundle?.description}</p>
          </div>
        </div>
        <div className="">
          <p>
            ${chosenBundle?.discountedPrice} x {chosenBundle?.quantity} bottles
          </p>
        </div>
      </div>
    </>
  );
}

export default SuccessPage;
