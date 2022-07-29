import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import priceInformation from "../../../lib/fathacksPage/priceInformation";
import { CustomerInfo, PriceInformation } from "../../../lib/types";
import { RootState } from "../../../store";
import Stripe from "stripe";
import generateId from "../../../lib/randomString";
import { uiActions } from "../../../features/uiSlice";

function SuccessPage({ sessionId, paymentItent, userPassword }: any) {
  // console.log(sessionId);
  const router = useRouter();
  const dispatch = useDispatch();
  const [chosenBundle, setChosenBundle] = useState<PriceInformation>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    const storedItem: { bundle: string } = JSON.parse(
      localStorage.getItem("bundle")!
    );
    const customerInfo: CustomerInfo = JSON.parse(
      localStorage.getItem("customerInfo")!
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
    setName(customerInfo.name);

    // SENDING OF DATA
    const customerName = customerInfo.name;
    const customerEmail = customerInfo.email;
    const customerPhone = customerInfo.phoneNumber;
    const customerId = sessionId.customer;
    const limitedOffer = customerInfo.limitedOffer;
    const paymentIntentId = sessionId.payment_intent;
    const paymentChargesId = paymentItent.charges.data[0].id;
    const { uniqueEventId } = customerInfo;
    const { facebookCookie } = customerInfo;
    const productId = itemBundle?.productId;
    const productPrice =
      itemBundle?.discountedPrice! * itemBundle?.quantity! +
      itemBundle?.shipping!;

    const dataToBeSent = {
      customerName,
      customerEmail,
      customerPhone,
      customerId,
      userPassword,
      limitedOffer,
      paymentIntentId,
      paymentChargesId,
      uniqueEventId,
      facebookCookie,
      productId,
      productPrice,
    };

    console.log(dataToBeSent);

    const sendData = async () => {
      const resp = await fetch(
        "https://pay.kaiserfitapp.com/webpoint/post.php",
        {
          method: "POST",
          body: JSON.stringify(dataToBeSent),
        }
      );
      const data = await resp.json();
      console.log(data);
    };

    sendData();

    const updateData = async () => {
      const resp = await fetch("/api/stripeUpdate", {
        method: "POST",
        body: JSON.stringify({ itemBundle, paymentIntentId }),
      });
      const data = await resp.json();
      // console.log(data);
    };

    updateData();

    dispatch(uiActions.toggleIsWindowAtTop(false));

    return () => {
      // console.log("unmounting");
      // localStorage.removeItem("customerInfo");
      // localStorage.removeItem("bundle");
    };
  }, [router, dispatch]);

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
        <h3 className="text-lg font-medium">Your order has been confirmed!</h3>
      </div>

      <div>
        <h4 className="text-lg">
          Hello <span className="italic">{name}</span>{" "}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { stripe_session_id: sessionId }: any = ctx.query;
  const stripeServer = new Stripe("sk_test_NlFusDtsSTByRRBAALqwEJmJ", {
    apiVersion: "2020-08-27",
  });
  const session = await stripeServer.checkout.sessions.retrieve(
    sessionId?.toString()!
  );
  const paymentItent = await stripeServer.paymentIntents.retrieve(
    session.payment_intent?.toString()!
  );

  const userPassword = generateId(8);
  const customer = await stripeServer.customers.update(
    session.customer?.toString()!,
    {
      metadata: { userPassword },
    }
  );

  return {
    props: { sessionId: session, paymentItent, userPassword },
  };
};

export default SuccessPage;
