import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../features/uiSlice";
import checkOut from "../../lib/checkout";
import countries from "../../lib/checkout/countries";
import priceInformation from "../../lib/fathacksPage/priceInformation";
import { PriceInformation } from "../../lib/types";

function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [chosenBundle, setChosenBundle] = useState<PriceInformation>();
  const [limitedOffer, setLimitedOffer] = useState(true);

  useEffect(() => {
    const storedItem: { bundle: string } = JSON.parse(
      localStorage.getItem("bundle")!
    );
    if (!storedItem || !Object.values(storedItem).length) {
      alert("pls choose a bundle before proceeding");
      router.push("/fathacks");
      return;
    }
    const itemBundle: PriceInformation | undefined = priceInformation.find(
      (item) => item.title === storedItem.bundle
    );
    setChosenBundle(itemBundle);
  }, [router]);

  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(false));
  }, [dispatch]);

  return (
    <section className="py-20 container mx-auto px-4">
      {chosenBundle && (
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-y-8 md:gap-y-0 md:gap-x-8">
          <OrderForm chosenBundle={chosenBundle} limitedOffer={limitedOffer} />
          <div className="md:w-1/3 space-y-8">
            <OrderSummary chosenBundle={chosenBundle} />
            <ProtectionLabel />
            <LimitedOffer setLimitedOffer={setLimitedOffer} />
          </div>
        </div>
      )}
    </section>
  );
}

function OrderForm({
  chosenBundle,
  limitedOffer,
}: {
  chosenBundle: PriceInformation;
  limitedOffer: boolean;
}) {
  // const router = useRouter();
  // const dispatch = useDispatch();

  const [facebookCookie, setFacebookCookie] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string | number>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();
  const [streetName, setStreetName] = useState<string>();

  useEffect(() => {
    // const setCookie = (cname: any, cvalue: any, exdays: any) => {
    //   const d = new Date();
    //   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    //   let expires = "expires=" + d.toUTCString();
    //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // };

    const getCookie = (cname: string) => {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    // getCookie("_fbc");
    const checkCookie = () => {
      const user: any = getCookie("_fbc");
      if (user) {
        setFacebookCookie(user);
        return;
      }
      const user2: any = getCookie("_fbp");
      if (user2) {
        setFacebookCookie(user);
        return;
      }
      // else {
      //   user = prompt("Please enter your name:", "");
      //   if (user != "" && user != null) {
      //     setCookie("_fbc", user, 365);
      //   }
      // }
    };
    checkCookie();
  }, []);

  const handleSubmit = (
    e:
      | FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !country ||
      !city ||
      !streetName
    ) {
      alert("pls fill out all inputs");
      return;
    }
    const userInfo = {
      name: fullName,
      email,
      phoneNumber,
      limitedOffer,
      uniqueEventId: uuidv4(),
      facebookCookie,
    };
    localStorage.setItem("customerInfo", JSON.stringify(userInfo));
    const checkoutOptions = {
      lineItems: [
        {
          price: chosenBundle.id,
          quantity: 1,
        },
      ],
      email,
    };
    checkOut(checkoutOptions);
    // router.push("/checkout/success");
  };

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
                value={fullName}
                onChange={(e) => setFullName(e.currentTarget.value)}
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
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="label-style">Email address *</label>
                <input
                  className="billing-input"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.currentTarget.value)}
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
                onChange={(e) => setCountry(e.currentTarget.value)}
              >
                {countries.map((country) => (
                  <option value={country.code} key={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:gap-8  md:pr-32">
              <div className="flex flex-col w-full md:w-2/3">
                <label className="label-style">City/town *</label>
                <input
                  className="billing-input"
                  type="text"
                  placeholder="City/town"
                  name="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/3">
                <label className="label-style">Postal code *</label>
                <input
                  className="billing-input"
                  type="text"
                  placeholder="Postal code"
                  name="postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.currentTarget.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:pr-32">
              <label className="label-style">Street name *</label>
              <input
                className="billing-input"
                type="text"
                placeholder="Street name"
                name="address"
                required
                value={streetName}
                onChange={(e) => setStreetName(e.currentTarget.value)}
              />
            </div>

            {/* <h4 className="text-xl md:text-2xl font-semibold">Payment</h4> */}

            {/* <div className="border-b-2 border-blue-400 pb-2 flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between">
              <p className="label-style">Credit card</p>
              <div className="flex gap-x-4">
                {["amex", "jcb", "mastercard", "visa"].map((card) => (
                  <Image
                    key={Math.random() * 644}
                    src={`/images/checkout/${card}.png`}
                    alt={card}
                    width={30}
                    height={20}
                  />
                ))}
              </div>
            </div> */}

            {/* <div className="flex flex-col md:pr-32">
              <label className="label-style">Card number *</label>
              <input
                className="billing-input"
                type="tel"
                pattern="[\d| ]{16,22}"
                placeholder="Card number"
                name="cardNumber"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8  md:pr-32">
              <div className="flex flex-col">
                <label className="label-style">Expiration date (MM / YY)</label>
                <input
                  className="billing-input"
                  type="tel"
                  placeholder="Expiration date (MM / YY)"
                  pattern="\d\d/\d\d"
                  name="expiration"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="label-style">CVC</label>
                <input
                  className="billing-input"
                  type="number"
                  placeholder="CVC"
                  name="cvc"
                  pattern="\d{3,4}"
                  required
                />
              </div>
            </div> */}
            {/* END OF INPUTS */}
          </div>

          <div className="flex items-center justify-center  md:gap-8 gap-4 ">
            {/* <Link passHref href={"/fathacks"}>
              <a className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                Go back
              </a>
            </Link> */}

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-auto outline-none bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Go to payments
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function OrderSummary({ chosenBundle }: { chosenBundle: PriceInformation }) {
  return (
    <div className="bg-gray-100 dark:bg-slate-600 p-4">
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
    <div className="flex px-2 h-full justify-between space-x-2">
      <div className="relative w-1/3 h-20">
        <Image
          src={chosenBundle.photo}
          className="rounded absolute"
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className="h-20 p-1 py-2 flex flex-col justify-between ">
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
          <span>Shipping</span>
          <p>{chosenBundle.shipping ? `$${chosenBundle.shipping}` : "free"}</p>
        </div>
      </div>
      <div className="px-2">
        <div className="w-full flex justify-between items-center text-2xl font-medium">
          <p>Total</p>
          <span>
            $
            {chosenBundle.discountedPrice * chosenBundle.quantity +
              chosenBundle.shipping}
          </span>
        </div>
      </div>
    </>
  );
}

function ProtectionLabel() {
  return (
    <div className="bg-gray-100 dark:bg-slate-600 p-4 space-y-4">
      <div className="flex space-x-2 border-b-4 pb-4">
        <div className="relative w-full md:w-1/4 h-24 md:h-40">
          <Image
            src="/images/checkout/padlock.png"
            alt="secure"
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
        <div className="space-y-2 md:w-2/3">
          <h4 className="font-semibold">100% Secure and guaranteed payment</h4>
          <p>
            This website has advanced safeguards in place to protect information
            and personal data. All your personal information is encrypted and
            secure.
          </p>
        </div>
      </div>
      <div className="relative h-60 md:h-72 w-full">
        <Image
          src="/images/fathacks/mb-guarantee.jpg"
          alt=""
          layout="fill"
          objectFit="contain"
          className="absolute top-0 md:-translate-y-0"
        />
      </div>
    </div>
  );
}

function LimitedOffer({
  setLimitedOffer,
}: {
  setLimitedOffer: Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-gray-100 dark:bg-slate-600 space-y-4">
      <div className="relative h-40 bg-gray-200 dark:bg-slate-700">
        <Image
          src="/images/checkout/limited-offer.png"
          alt="limited offer"
          layout="fill"
          objectFit="contain"
          className="absolute"
        />
      </div>
      <div className="text-center p-4 space-y-3">
        <div className="space-y-2">
          <div>
            <h4 className="text-4xl font-bold">
              $0 <span className="line-through text-sm">$79</span>
            </h4>
          </div>
          <h4 className="text-xl md:text-2xl font-semibold">
            Grab this one time offer
          </h4>
          <p>
            <span className="font-semibold">One time Offer:</span> Join our most
            successful members who lose the most weight EFFORTLESSLY in the
            Kaiser Coach Platinum absolutely FREE and Supercharge Your Fat Loss.
            Get Monthly cooking videos, workout videos, cook books, weight loss
            secrets & MUCH MORE!{" "}
            <span className="font-semibold">
              Get all of this for the first 30 days 100% FREE!
            </span>{" "}
            After that, you will be billed $79/Month and you can cancel anytime.{" "}
            <span className="font-semibold">
              Plus, get the Divine Desserts Cookbook absolutely FREE (normally
              $29.95)
            </span>
          </p>
        </div>
        <div className="flex justify-center gap-x-4 items-center">
          <input
            onChange={(e) => setLimitedOffer(e.target.checked)}
            type="checkbox"
            name="limited"
            id="limited"
            className="cursor-pointer scale-150"
            defaultChecked={true}
          />
          <label
            htmlFor="limited"
            className="text-2xl font-medium cursor-pointer"
          >
            Sign me up
          </label>
        </div>
      </div>
    </div>
  );
}

function ModalOfConfirmation() {
  return (
    <>
      <div></div>
    </>
  );
}

export default CheckoutPage;
