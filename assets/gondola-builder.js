document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-block').forEach(section => {
    const minus = section.querySelector('.qty-minus');
    const plus = section.querySelector('.qty-plus');
    const input = section.querySelector('.qty-input');
    const addToCartBtn = section.querySelector('.add-to-cart-btn');

    minus.addEventListener('click', () => {
      input.value = Math.max(0, parseInt(input.value) - 1);
    });

    plus.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });

    addToCartBtn.addEventListener('click', async () => {
      const quantity = parseInt(input.value);
      if (quantity <= 0) return alert('Please select quantity');

      const productId = addToCartBtn.dataset.productId;
      const optionSelectors = section.querySelectorAll('select');
      const selectedOptions = Array.from(optionSelectors).map(s => s.value);

      const product = window.meta.productCache?.[productId];
      const variant = product?.variants.find(v =>
        v.options.every((opt, i) => opt === selectedOptions[i])
      );

      if (!variant) return alert('Please select all options');

      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity,
          id: variant.id,
        })
      });

      if (res.ok) {
        alert('Added to cart!');
      } else {
        alert('Failed to add to cart');
      }
    });
  });
});
