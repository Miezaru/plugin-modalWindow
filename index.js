let pizzas = [
    {id: 1, title: 'Домашняя пицца (на тонком тесте)', price: 20, img: 'https://tishka.org/master%20class/Homemade%20pizza/picca-domashnyaya.jpg'},
    {id: 2, title: 'Пицца "Молния', price: 30, img: 'https://www.povarenok.ru/data/cache/2016feb/18/29/1456050_80600-710x550x.jpg'},
    {id: 3, title: 'Картофельная пицца без теста', price: 25, img: 'https://www.povarenok.ru/data/cache/2013jul/11/36/469849_34345-710x550x.jpg'}
]

const toHTML = pizza => `
<div class="col">
    <div class="card" style="width: 300px;">
        <img class="card-img-top" style="height: 300px;" src="${pizza.img}" alt="${pizza.title}">
        <div class="card-body">
            <h5 class="card-title">"${pizza.title}"</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${pizza.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${pizza.id}">Удалить</a>
        </div>
    </div>
</div>
`;

function renderPizzas() {
    // const cards = pizzas.map(pizza => toHTML(pizza))
    const cards = pizzas.map(toHTML).join('') // Одно и тоже
    // console.log(cards.join(''))
    document.querySelector('#pizzas').innerHTML = cards
}

renderPizzas()

const modalOptions = {
    title: 'Hello Bros',
    closable: true,
    content: `
        <p>Hello brothers</p>
        <p>How are you all?</p>
    `,
    width: 500,
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            modal.close()
        }}
    ]
}

const priceModalOptions = {
    title: 'Цена на товар',
    closable: true,
    width: 400,
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
        }}
    ]
}

const modal = $.modal(modalOptions)
const priceModal = $.modal(priceModalOptions)
// modal.open()

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const pizza = pizzas.find(p => p.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${pizza.title}: <strong>${pizza.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете пиццу: <strong>${pizza.title}</strong></p>`,
        }).then(() => {
            pizzas = pizzas.filter(p => p.id !== id)
            renderPizzas()
        }).catch(() => {
            console.log('Cancel')
        })

        // confirmModal.setContent(`
        //     <p>Вы удаляете фрукт: <strong>${pizza.title}</strong></p>
        // `)
        // confirmModal.open()
    }
})