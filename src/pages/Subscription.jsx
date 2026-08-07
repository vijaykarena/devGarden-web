import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Subscription = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const buyHandler = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );

      // with order, we have to open razorpay dialog box
      const { keyId, amount, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, 
        amount, 
        currency,
        name: "Dev Garden",
        description: "Connect to other developers",
        order_id: orderId, 
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return isUserPremium ? (
    <div className="flex justify-center m-16">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font-bold text-3xl">You are a premium user!</h1>
      </div>
    </div>
  ) : (
    <div className="flex justify-center m-16">
      <div className="flex w-1/2 flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver membership</h1>
          <ul>
            <li> - Rs. 100</li>
            <li> - Chat with other people</li>
            <li> - 100 connection Request per day</li>
            <li> - Blue Tick</li>
            <li> - 4 month</li>
          </ul>
          <button
            onClick={() => buyHandler("silver")}
            className="btn btn-primary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold membership</h1>
          <ul>
            <li> - Rs. 200</li>
            <li> - Chat with other people</li>
            <li> - infinite connection Request per day</li>
            <li> - Blue Tick</li>
            <li> - 6 month</li>
          </ul>
          <button
            onClick={() => buyHandler("gold")}
            className="btn btn-secondary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
