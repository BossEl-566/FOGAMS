import { errorHandler } from "../utils/error.js";
import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';



dotenv.config(); // Load environment variables from .env file

// Environment Variables
const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;
const apiUserId = process.env.MOMO_API_USER_ID;
const apiKey = process.env.MOMO_API_KEY;
const momoBaseUrl = 'https://sandbox.momodeveloper.mtn.com';

// Helper: Get MoMo access token
const getAccessToken = async () => {
  const auth = Buffer.from(`${apiUserId}:${apiKey}`).toString('base64');

  const res = await fetch(`${momoBaseUrl}/collection/token/`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  });

  const data = await res.json();
  return data.access_token;
};

// Controller: Create MoMo payment request
export const createMomo = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const referenceId = uuidv4();
    const token = await getAccessToken();

    const momoResponse = await fetch(`${momoBaseUrl}/collection/v1_0/requesttopay/${referenceId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Reference-Id': referenceId,
        'X-Target-Environment': 'sandbox',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'EUR',
        externalId: '123456',
        payer: {
          partyIdType: 'MSISDN',
          partyId: phone,
        },
        payerMessage: 'Payment initiated',
        payeeNote: 'Thank you!',
      }),
    });

    if (momoResponse.status === 202) {
      res.status(200).json({
        success: true,
        message: 'Payment request sent successfully',
        referenceId,
      });
    } else {
      const errorData = await momoResponse.json();
      res.status(400).json({
        success: false,
        message: 'Failed to initiate payment',
        error: errorData,
      });
    }
  } catch (err) {
    console.error('MoMo Error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


