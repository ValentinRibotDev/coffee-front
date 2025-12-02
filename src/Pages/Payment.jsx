import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Navigation } from '../Components/NavBar';

// Charger votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51SUB6EGgiRbq04N0ZwerHhrld64uBNrlLGZ2PVtQaFYM0KtsLrxu9pqrb0mrYPrI1tDnu6Dm9dVevr9i1xGTLybP00m5v1QL2i');

function CheckoutForm({ userId, totalAmount }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            // Confirmer le paiement avec Stripe
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + '/payment-success',
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message);
                setIsProcessing(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Archiver le panier après paiement réussi
                const archiveRes = await fetch(`http://localhost:8080/api/cart/${userId}/archive`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        payment_intent_id: paymentIntent.id
                    })
                });

                if (archiveRes.ok) {
                    // Redirection vers la page d'accueil
                    navigate('/', { state: { paymentSuccess: true } });
                } else {
                    setErrorMessage('Payment succeeded but failed to archive cart');
                    setIsProcessing(false);
                }
            }
        } catch (err) {
            console.error('Payment error:', err);
            setErrorMessage('An unexpected error occurred');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
            <PaymentElement />

            {errorMessage && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="rounded-md border-2 border-amber-50 w-full h-[50px] relative group overflow-hidden transition-transform duration-300 ease-out hover:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="cardBackground rounded text-white uppercase w-full h-full flex flex-col justify-center items-center font-semibold">
                    {isProcessing ? 'Processing...' : `Pay ${totalAmount.toFixed(2)}€`}
                </div>
            </button>

            <button
                type="button"
                onClick={() => navigate('/cart')}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900 underline"
            >
                Return to cart
            </button>
        </form>
    );
}

export function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    const totalAmount = location.state?.totalAmount || 0;
    const cart = location.state?.cart || [];

    useEffect(() => {
        const initPayment = async () => {
            // Vérifier si on a un montant et un panier
            if (!totalAmount || cart.length === 0) {
                navigate('/cart');
                return;
            }

            try {
                // Récupérer l'utilisateur connecté
                const userRes = await fetch('http://localhost:8080/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!userRes.ok) {
                    navigate('/login');
                    return;
                }

                const userData = await userRes.json();
                setUserId(userData.id);

                // Créer un payment intent avec le montant en centimes
                const amountInCents = Math.round(totalAmount * 100);
                const paymentRes = await fetch('http://localhost:8080/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ amount: amountInCents })
                });

                if (!paymentRes.ok) {
                    throw new Error('Failed to create payment intent');
                }

                const paymentData = await paymentRes.json();
                setClientSecret(paymentData.clientSecret);
                setLoading(false);
            } catch (err) {
                console.error('Payment initialization error:', err);
                setError('Failed to initialize payment');
                setLoading(false);
            }
        };

        initPayment();
    }, [navigate, totalAmount, cart]);

    if (loading) {
        return (
            <>
                <Navigation />
                <div className="container mx-auto p-4">
                    <div className="text-center p-4">Loading payment...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navigation />
                <div className="container mx-auto p-4">
                    <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/cart')}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Return to cart
                    </button>
                </div>
            </>
        );
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        },
    };

    return (
        <>
            <Navigation />
            <div className="container mx-auto p-4 min-h-screen flex flex-col justify-center">
                <div className="max-w-2xl mx-auto w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Complete your payment</h1>
                        <p className="text-gray-600">Total amount: {totalAmount.toFixed(2)}€</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order summary</h2>
                        <div className="space-y-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{item.productName} × {item.quantite}</span>
                                    <span>{item.subtotal.toFixed(2)}€</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{totalAmount.toFixed(2)}€</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm userId={userId} totalAmount={totalAmount} />
                            </Elements>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
