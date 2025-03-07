<template>
    <div>
        <h1>Paiement pour l'événement</h1>
        <form id="payment-form" @submit.prevent="handleSubmit">
            <!-- Adresse de facturation -->
            <div class="form-group">
                <label for="name">Nom complet</label>
                <input type="text" id="name" v-model="billingDetails.name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="billingDetails.email" required />
            </div>
            <div class="form-group">
                <label for="address">Adresse</label>
                <input type="text" id="address" v-model="billingDetails.address.line1" required />
            </div>
            <div class="form-group">
                <label for="city">Ville</label>
                <input type="text" id="city" v-model="billingDetails.address.city" required />
            </div>
            <div class="form-group">
                <label for="postal_code">Code postal</label>
                <input type="text" id="postal_code" v-model="billingDetails.address.postal_code" required />
            </div>
            <div class="form-group">
                <label for="country">Pays</label>
                <input type="text" id="country" v-model="billingDetails.address.country" required />
            </div>

            <!-- Stripe Card Element -->
            <div class="form-group">
                <label for="card-element">Informations de la carte</label>
                <div id="card-element"></div>
            </div>

            <!-- Bouton de soumission -->
            <button type="submit">Payer</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getStripe } from '../../stripe/stripe';

const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);

// Données de facturation
const billingDetails = ref({
    name: '',
    email: '',
    address: {
        line1: '',
        city: '',
        postal_code: '',
        country: '',
    },
});

onMounted(async () => {
    stripe.value = await getStripe();
    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create('card');
    cardElement.value.mount('#card-element');
});

const handleSubmit = async () => {
    if (!stripe.value || !elements.value) return;

    // Créer un PaymentMethod avec les informations de la carte et l'adresse de facturation
    const { error, paymentMethod } = await stripe.value.createPaymentMethod({
        type: 'card',
        card: cardElement.value,
        billing_details: billingDetails.value,
    });

    if (error) {
        console.error(error);
        alert('Erreur lors du paiement');
    } else {
        // Envoyer le paymentMethod.id et l'adresse de facturation au backend
        const response = await fetch('http://localhost:3000/paiement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                amount: 1000, // Montant en cents (10.00 EUR)
                billingDetails: billingDetails.value,
            }),
        });

        const result = await response.json();
        if (result.status === 'succeeded') {
            alert('Paiement réussi !');
        } else {
            alert('Paiement échoué');
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
}

#card-element {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
}
</style>