import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  /* Para o frontend acessar variáveis de ambiente deve adicionar
    na frente NEXT_PUBLIC */
  return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
}
