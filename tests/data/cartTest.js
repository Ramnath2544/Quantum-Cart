import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() =>
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryoptionId: '1'
            }]));
        loadFromStorage();
        // Create a dummy element for quantity selector in the test DOM
        const dummyInput = document.createElement('input');
        dummyInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        dummyInput.value = '1'; // Set desired quantity
        document.body.appendChild(dummyInput);

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        document.body.removeChild(dummyInput);
    });

    it('adds a new product to the cart', () => {
        // Set up the localStorage spy to return an empty array
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
        loadFromStorage();

        // Create a dummy element for quantity selector in the test DOM
        const dummyInput = document.createElement('input');
        dummyInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        dummyInput.value = '1'; // Set desired quantity
        document.body.appendChild(dummyInput);

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

        // Optionally, clean up the dummy element after the test
        document.body.removeChild(dummyInput);
    });

});


