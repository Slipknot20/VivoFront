'use client'
import React from 'react';
import Shipping from '@/components/checkout/Shipping';
import Payment from '@/components/checkout/Payment';

const CheckoutPaymentPage: React.FC = () => {

    return (
        <div className="container mx-auto p-4 mt-40">
            <Payment />
        </div>
    );
};

export default CheckoutPaymentPage;
