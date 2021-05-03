/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51IlGJALwpUr6ODJeX1hQO5kLU2UPvAeiuaTCJYiM12FPzXuA0RwpDlJyPEPKoFxF72DcKXhMPO9Ee2U2x23wSJ9500ccqMHq8Q'
);

export const bookCourse = async (courseId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/subscriptions/checkout-session/${courseId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
