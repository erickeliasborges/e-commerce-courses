const OPERATIONS_MATH = {
    ADDITION: 'ADDITION',
    SUBTRACTION: 'SUBTRACTION',
    MULTIPLICATION: 'MULTIPLICATION',
    DIVISION: 'DIVISION'
};

let cart = document.getElementById('cart');
let courseslist = document.querySelector('#cart-list tbody');
let btncleancart = document.getElementById('clean-cart');
let priceTotalCart = 0;
let formSendContact = document.getElementById('form-send-contact');

loadEventListeners();

function loadEventListeners() {

    cart.addEventListener('click', removeCourse);

    btncleancart.addEventListener('click', cleanCart);

    //mostra os cursos ao carregar documento
    document.addEventListener('DOMContentLoaded', readLocalStorage);

};

function loadCourse(courseId) {
    readCourseData(document.getElementById(courseId.replace("-add-cart", "")));
};

function readCourseData(course) {
    if (course.getAttribute('added-to-cart') === 'false') {
        course.setAttribute('added-to-cart', 'true');

        let courseInformation = {
            image: course.querySelector('img').src,
            title: course.querySelector('h6').textContent,
            price: course.querySelector('h6 b').textContent,
            id: course.id
        };

        if (courseInformation.price == undefined) return false;

        insertCourseCart(courseInformation);
    } else {
        return false;
    }
};

function insertCourseCart(course) {
    let row = document.createElement('tr');
    row.innerHTML = getHTMLCourseCart(course);

    courseslist.appendChild(row);

    saveCourseLocalStorage(course);
};

function removeCourse(event) {
    event.preventDefault();

    let
        courseId,
        course;

    if (event.target.classList.contains('delete-course')) {
        course = event.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
        document.getElementById(courseId).setAttribute('added-to-cart', 'false');
        event.target.parentElement.parentElement.remove();
    };

    removeCourseLocalStorage(courseId);
};

function cleanCart() {
    while (courseslist.firstChild) {
        let courseCartId = courseslist.firstChild.querySelector('a').getAttribute('data-id');
        document.getElementById(courseCartId).setAttribute('added-to-cart', 'false');
        courseslist.removeChild(courseslist.firstChild);
    };

    cleanLocalStorage();

    priceTotalCart = 0;
    setTotalCart(priceTotalCart);

    return false;
};

function saveCourseLocalStorage(course) {
    let courses = getCoursesLocalStorage();

    if (courses.find(searchCourse => searchCourse.id == course.id) != undefined) {
        return false;
    } else {
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        setTotalCart(course.price);
    };
};

function getCoursesLocalStorage() {
    let courses;

    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    };

    return courses;
};

function readLocalStorage() {
    let courses = getCoursesLocalStorage();

    if (courses.length === 0) {
        setTotalCart(0);
        showEmptyCart(true);
        return;
    };

    courses.forEach((course) => {
        let row = document.createElement('tr');
        row.innerHTML = getHTMLCourseCart(course);
        courseslist.appendChild(row);
        setTotalCart(course.price);
    });
};

function showEmptyCart(show) {
    document.querySelector('.empty-cart').style.display = ((show) ? 'block' : 'none');
};

function setTotalCart(price, operationsMath) {
    if (operationsMath === undefined) operationsMath = OPERATIONS_MATH.ADDITION;

    let totalCart = document.querySelector('.total-cart');

    switch (operationsMath) {
        case OPERATIONS_MATH.ADDITION:
            priceTotalCart = (parseFloat(priceTotalCart) + parseFloat(convertPriceToNumber(price))).toFixed(2);
            break;
        case OPERATIONS_MATH.SUBTRACTION:
            priceTotalCart = (parseFloat(priceTotalCart) - parseFloat(convertPriceToNumber(price))).toFixed(2);
            break;
        case OPERATIONS_MATH.MULTIPLICATION:
            priceTotalCart = (parseFloat(priceTotalCart) * parseFloat(convertPriceToNumber(price))).toFixed(2);
            break;
        case OPERATIONS_MATH.DIVISION:
            priceTotalCart = (parseFloat(priceTotalCart) / parseFloat(convertPriceToNumber(price))).toFixed(2);
            break;
        default:
            priceTotalCart = (parseFloat(priceTotalCart) + parseFloat(convertPriceToNumber(price))).toFixed(2);
    };

    totalCart.textContent = 'R$' + priceTotalCart.replace('.', ',');
    showEmptyCart(priceTotalCart == 0);
};

function convertPriceToNumber(price) {
    if (price === 0)
        return 0;
    return price.replace('R$', '').replace(',', '.');
};

function getHTMLCourseCart(course) {
    let html =
        `
            <td class="p-1">
                <img src="${course.image}" width=100>
            </td>
            <td class="p-1">
                ${course.title}
            </td>
            <td class="p-1 fw-bold">
                ${course.price}
            </td>
            <td class="p-2">
                <a href="#" class="delete-course" 
                data-id = "${course.id}">X</a>
            </td>
    `;
    return html;
};

function removeCourseLocalStorage(courseId) {
    let courses = getCoursesLocalStorage();

    courses.forEach((course, index) => {
        if (course.id === courseId) {
            courses.splice(index, 1);
            setTotalCart(course.price, OPERATIONS_MATH.SUBTRACTION);
        };
    });

    localStorage.setItem('courses', JSON.stringify(courses));
};

function cleanLocalStorage() {
    localStorage.clear();
};

function sendContact() {
    if (formSendContact.checkValidity())
        alert("Recebemos suas informações, aguarde e entraremos em contato pelo seu E-mail.");
}