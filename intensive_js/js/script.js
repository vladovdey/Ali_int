window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title')

    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function (btn, i) {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                empty = cartWrapper.querySelector('.empty'),
                items_btn = item.querySelector('button'),
                removeBtn = document.createElement('div');


            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);
            items_btn.remove();
            if (empty) {
                empty.style.display='none';
            }
            cartWrapper.appendChild(item);
            calcItems();
            calcSum();
            removeItem();
        });
    })

    function sliceTitle() {
        titles.forEach(function (title) {
            if (title.textContent.length > 80) {
                title.textContent = `${title.textContent.slice(0,71)}...`;
            } else {
                return;
            }

        });
    }
    sliceTitle();

    function calcItems() {
        const countItems = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = countItems.length;
    }

    function calcSum() {
        const itemPrice = cartWrapper.querySelectorAll('.goods__item > .goods__price > span');
        let total = 0

        itemPrice.forEach(function (item) {
            total += +item.textContent;
        });

        totalCost.textContent = total;
    }

    function removeItem() {
        let remBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            
        remBtn.forEach(function (btn) {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                calcItems();
                calcSum();
                if(cartWrapper.querySelectorAll(".goods__item").length==0){
                    cartWrapper.querySelector(".empty").style.display='block';
                }
            });
        });
    }


});