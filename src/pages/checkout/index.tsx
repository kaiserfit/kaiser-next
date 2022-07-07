import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../features/uiSlice";
import { userActions } from "../../features/userSlice";
import checkOut from "../../lib/checkout";
import countries from "../../lib/checkout/countries";
import priceInformation from "../../lib/fathacksPage/priceInformation";
import { PriceInformation } from "../../lib/types";

function CheckoutPage() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(uiActions.toggleIsWindowAtTop(false));
  }, [dispatch]);
  return (
    <section className="py-20 container mx-auto px-4">
      {chosenBundle && (
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-y-8 md:gap-y-0 md:gap-x-8">
          <OrderForm chosenBundle={chosenBundle} />
          <div className="md:w-1/3 space-y-8">
            <OrderSummary chosenBundle={chosenBundle} />
            <ProtectionLabel />
          </div>
        </div>
      )}
    </section>
  );
}

function OrderForm({ chosenBundle }: { chosenBundle: PriceInformation }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [uniqueEventId, setUniqueEventId] = useState(uuidv4());
  const [facebookCookie, setFacebookCookie] = useState<string>();
  const [fullName, setFullName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();
  const [streetName, setStreetName] = useState<string>();

  // REFERENCE FOR COOKIE : https://stackoverflow.com/questions/10730362/get-cookie-by-name
  useEffect(() => {
    const cookie = ("; " + document.cookie)
      .split(`; COOKIE_NAME=_fbc`)
      .pop()!
      .split(";")[0];
    setFacebookCookie(cookie);
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
      uniqueEventId,
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
                  type="tel"
                  placeholder="Phone number"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(+e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="label-style">Email address</label>
                <input
                  className="billing-input"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
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
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
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

function ModalOfConfirmation() {
  return (
    <>
      <div></div>
    </>
  );
}

export default CheckoutPage;
