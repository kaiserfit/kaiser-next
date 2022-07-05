import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../features/uiSlice";
import countries from "../../lib/checkout/countries";
import priceInformation from "../../lib/fathacksPage/priceInformation";
import { PriceInformation } from "../../lib/types";

function CheckoutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(false));
  }, [dispatch]);
  return (
    <section className="py-16 container mx-auto">
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-y-8 md:gap-y-0">
        <OrderForm />
        <OrderSummary />
      </div>
    </section>
  );
}

function OrderForm() {
  const handleSubmit = (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};
  return (
    <>
      <form
        className="bg-gray-200 dark:bg-transparent w-full md:w-2/3"
        onSubmit={handleSubmit}
      >
        <div className="bg-white dark:bg-slate-600 rounded-lg shadow-xl p-4 space-y-8 ">
          <div className="">
            {/* LOGO HERE */}
            <div className="flex justify-center w-full h-20 relative">
              <Image
                src="/images/kaiser.webp"
                alt="kaiserfit logo"
                className="absolute"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            {/* END LOGO  */}

            <div className="flex justify-center">
              <div className="flex">
                <h1 className="font-bold md:text-2xl text-xl">
                  Billing information
                </h1>
              </div>
            </div>
          </div>

          {/* INPUTS HERE */}
          <div className="space-y-6">
            <div className="flex flex-col md:pr-32">
              <label className="label-style">Full name *</label>
              <input
                className="billing-input"
                type="text"
                placeholder="Full name"
                name="full name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8  md:pr-32">
              <div className="flex flex-col">
                <label className="label-style">Phone number *</label>
                <input
                  className="billing-input"
                  type="text"
                  placeholder="Phone number"
                  name="phoneNumber"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="label-style">Email address</label>
                <input
                  className="billing-input"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                />
              </div>
            </div>

            <h4 className="text-xl md:text-2xl font-semibold">
              Shipping address
            </h4>

            <div className="flex flex-col md:pr-32">
              <label className="label-style">Country *</label>
              <select
                name="country"
                id="country"
                className="billing-input"
                required
              >
                {countries.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:pr-32">
              <label className="label-style">City/town *</label>
              <input
                className="billing-input"
                type="text"
                placeholder="Street name"
                name="address"
                required
              />
            </div>

            <div className="flex flex-col md:pr-32">
              <label className="label-style">Postal code *</label>
              <input
                className="billing-input"
                type="number"
                placeholder="Street name"
                name="address"
                maxLength={10}
                required
              />
            </div>

            <div className="flex flex-col md:pr-32">
              <label className="label-style">Street name *</label>
              <input
                className="billing-input"
                type="text"
                placeholder="Street name"
                name="address"
                required
              />
            </div>

            <h4 className="text-xl md:text-2xl font-semibold">Payment</h4>
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 ">
            <Link passHref href={"/cart"}>
              <a className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                Back to cart
              </a>
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Submit order
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function OrderSummary() {
  const router = useRouter();
  const [chosenBundle, setChosenBundle] = useState<PriceInformation>();

  useEffect(() => {
    const storedItem: { bundle: string } = JSON.parse(
      localStorage.getItem("bundle")!
    );
    console.log(storedItem);
    if (!storedItem || !Object.values(storedItem).length) {
      alert("pls choose a bundle before proceeding");
      router.push("/fathacks");
      return;
    }
    const itemBundle = priceInformation.find(
      (item) => item.title === storedItem.bundle
    );
    setChosenBundle(itemBundle);
    // console.log(itemBundle);
  }, [router]);
  return (
    <div className="md:w-1/4 bg-gray-100 dark:bg-slate-600 p-4">
      {chosenBundle && (
        <div className="space-y-4">
          <div className="pb-6 border-b-2">
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>

          <div className="space-y-4 border-b-2 pb-6">
            <OrderSummaryItem chosenBundle={chosenBundle} />
          </div>

          <OrderSummaryTotals chosenBundle={chosenBundle} />
        </div>
      )}
    </div>
  );
}

function OrderSummaryItem({
  chosenBundle,
}: {
  chosenBundle: PriceInformation;
}) {
  return (
    <div className="flex px-2 h-full space-x-2">
      <div className="relative h-20 w-1/2">
        <Image
          src={chosenBundle.photo}
          className="rounded absolute"
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className="h-20 p-1 py-2 flex flex-col justify-between w-1/2">
        <h3 className="capitalize">{chosenBundle.title} bundle </h3>
        <div>
          ${chosenBundle.discountedPrice} x {chosenBundle.quantity} bottles
        </div>
      </div>
    </div>
  );
}

function OrderSummaryTotals({
  chosenBundle,
}: {
  chosenBundle: PriceInformation;
}) {
  // const { totalAmount } = useSelector((state) => state.cart);

  return (
    <>
      <div className="pb-4 border-b px-2">
        <div className="w-full flex justify-between">
          <p>Subtotal</p>
          <span>${chosenBundle.discountedPrice * chosenBundle.quantity}</span>
        </div>
        <div className="w-full flex justify-between">
          <p>{chosenBundle.shipping ? `$${chosenBundle.shipping}` : "free"}</p>
          <span>free</span>
        </div>
      </div>
      <div className="px-2">
        <div className="w-full flex justify-between items-center text-2xl font-medium">
          <p>Total</p>
          <span>${chosenBundle.discountedPrice * chosenBundle.quantity}</span>
        </div>
      </div>
    </>
  );
}

function ProtectionLabel() {
  return <div></div>;
}

function ModalOfConfirmation() {
  return (
    <>
      <div></div>
    </>
  );
}

export default CheckoutPage;
