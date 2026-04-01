import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createCheckoutSession = async (planId: string) => {
  const response = await axios.post(
    `${API_URL}/payment/create-checkout-session`,
    { planId },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
