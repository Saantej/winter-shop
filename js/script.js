$(document).ready(function() {
    maskField()
    checkSize()
    ymaps.ready(function(){
        ymaps.geolocation.get({
            provider: 'yandex'
        }).then(function (result) {
            $(".header-add .header-add-block .location .city").text(result.geoObjects.get(0).getLocalities()[0])
        });
    });
})
$(window).resize(function() {
    checkSize()
})
// href
$("body").on('click', '[href*="#"]', function (e) {
	var fixed_offset = 0;
	$('html,body').stop().animate({
		scrollTop: $(this.hash).offset().top - fixed_offset
	}, 1000);
	e.preventDefault();
});

new Swiper(".servicesSlider", {
    slidesPerView: 1.25,
    spaceBetween: 20,
    grabCursor: true,
    grid: false,
    keyboard: {
        enabled: true,
    },
    scrollbar: {
        el: ".servicesSlider .swiper-scrollbar",
        draggable: true,
    },
    navigation: {
        nextEl: ".servicesSection .swiper-btn-next",
        prevEl: ".servicesSection .swiper-btn-prev",
    },
    breakpoints: {
        481: {
            slidesPerView: 2,
            grid: {
                rows: 2
            }
        },
    }
});

new Swiper(".reviewsSlider", {
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 20,
    keyboard: {
        enabled: true,
    },
    scrollbar: {
        el: ".reviewsSection .swiper-scrollbar",
        draggable: true,
    },
    navigation: {
        nextEl: ".reviewsSection .swiper-btn-next",
        prevEl: ".reviewsSection .swiper-btn-prev",
    },
});

new Swiper(".blogSlider", {
    slidesPerView: 1.25,
    grabCursor: true,
    spaceBetween: 20,
    keyboard: {
        enabled: true,
    },
    scrollbar: {
        el: ".blogSection .swiper-scrollbar",
        draggable: true,
    },
    navigation: {
        nextEl: ".blogSection .swiper-btn-next",
        prevEl: ".blogSection .swiper-btn-prev",
    },
    breakpoints: {
        991: {
            slidesPerView: 4,
        },
        769: {
            slidesPerView: 3,
        },
        481: {
            slidesPerView: 2,
        }
    }
});

$(document).on('click', '.checkField', function (el) {
  el.preventDefault();
  checkField(el)
})
function checkField(el) {
    let field = $(el.target).parents('form').find('input, textarea, select'),
        rating = $(el.target).parents('form').find('.rating-mini')

    for (let i = 0; i < field.length; i++) {
        if (!$(field[i]).hasClass('no-r')) {
            if ($(field[i]).val() != null) {
                if ($(field[i]).val() != '') {
                    if ($(field[i]).attr('type') == 'phone' || $(field[i]).hasClass('phone') || $(field[i]).attr('id') == 'phone' || $(field[i]).attr('name') == 'phone') {
                        if ($(field[i]).val().length < 17) {
                            $(field[i]).addClass('error')
                        } else {
                            $(field[i]).removeClass('error')
                        }
                    } else {
                        $(field[i]).removeClass('error')
                    }
                    if ($(field[i]).attr('type') == 'radio') {
                        if (!$(field[i]).hasClass('secondary')) {
                            let inputName = $(field[i]).attr('name'),
                                inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                                inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                            if (inputChecked.length == 0) {
                                inputCheckedAll.addClass('error')
                            } else {
                                inputCheckedAll.removeClass('error')
                            }
                        }
                    } else {
                        if (!$(field[i]).hasClass('gocity')) {
                            $(field[i]).removeClass('error')
                        } else {
                            let t=0
                            for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                                if (t=0) {
                                    if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                        $(field).eq(i).addClass('error')
                                    } else {
                                        $(field).eq(i).removeClass('error')
                                        t++
                                    }
                                }                                
                            }
                        }
                    }
                    if ($(field[i]).attr('type') == 'checkbox') {
                        if (!$(field[i]).hasClass('secondary')) {
                            let inputName = $(field[i]).attr('name'),
                                inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                                inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                            if (inputChecked.length == 0) {
                                inputCheckedAll.addClass('error')
                            } else {
                                inputCheckedAll.removeClass('error')
                            }
                        }
                    } else {
                        if (!$(field[i]).hasClass('gocity')) {
                            $(field[i]).removeClass('error')
                        } else {
                            let t=0
                            for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                                if (t=0) {
                                    if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                        $(field).eq(i).addClass('error')
                                    } else {
                                        $(field).eq(i).removeClass('error')
                                        t++
                                    }
                                }                                
                            }
                        }
                    }
                    if ($(field[i]).attr('type') == 'email') {
                        if (isValidEmail($(field[i]).val())) {
                            $(field[i]).removeClass('error')
                        } else {
                            $(field[i]).addClass('error')
                        }
                    }
                } else {
                    $(field[i]).addClass('error')
                }
            } else {
                $(field[i]).addClass('error')
            }
        } else {
            if ($(field[i]).attr('type') == 'email' && $(field[i]).val() != '') {
                if (isValidEmail($(field[i]).val())) {
                    $(field[i]).removeClass('error')
                } else {
                    $(field[i]).addClass('error')
                }
            } else {
                if (!$(field[i]).hasClass('gocity')) {
                    $(field[i]).removeClass('error')
                } else {
                    let t=0
                    for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                        if (t=0) {
                            if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                $(field).eq(i).addClass('error')
                            } else {
                                $(field).eq(i).removeClass('error')
                                t++
                            }
                        }                                
                    }
                }
            }
        }
    }
    if ($(el.target).parents('form').hasClass('form-main')) {
        for (let i=0;i<$('form.form-main .accordion .accordion-item').length;i++) {
            if ($('form.form-main .accordion .accordion-item').eq(i).find('.error').length != 0) {
                $('form.form-main .accordion .accordion-item').eq(i).addClass('error-block')
            }
            else {
                $('form.form-main .accordion .accordion-item').eq(i).removeClass('error-block')
            }
        }
    }
    if ($(rating).find('span.active').length == 0) {
        $(rating).addClass('error')
    } else {
        $(rating).removeClass('error')
    }
    if ($(el.target).parents('form').find('.error').length == 0) {
        sendAjax(field, el)
        ym(94525815,'reachGoal','send_order')
        clearFields()
    }
}

function clearFields() {
    $('input:not([type=checkbox], [type=radio], [name=csrfmiddlewaretoken])').val('')
    $('textarea').val('')
    $('.__select__title').removeClass('error')
    $('input[type=checkbox]').prop('checked', false)
    $('input[type=radio]').prop('checked', false)
    $('form.form-main .accordion-body label img').removeClass('active')
}

function isValidEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function sendAjax(dataForm, el) {
    let obj = {},
        type = $(el.target).attr('data-request'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body'),
        link = $(el.target).attr('data-create')

    $.each(dataForm, function (i, el) {
        let name = $(el).attr('name'),
            value = $(el).val();
        if (name === 'personal-data') {
            return;
        }
        if (name === 'car-count-main') {
            return;
        }
        if (name === 'gofrom' || name === 'goto') {
            let goFromValue = $('input[name=gofrom]').val();
            let goToValue = $('input[name=goto]').val();
            if (goFromValue && goToValue) {
                let goFromToValue = goFromValue + ' - ' + goToValue;
                obj['go_from_to'] = goFromToValue;
                return; // Пропустить добавление gofrom и goto в obj
            }
        }
        if (name === 'car_count' && value === 'many') {
            let carCountMainValue = $('input[name=car-count-main]').val();
            if (carCountMainValue) {
                obj[name] = carCountMainValue;
            }
        } else if (name === 'date') {
            if (value) {
                let dateString = value,
                    dateParts = dateString.split("."),
                    formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
                obj[name] = formattedDate
            }
        } else if (obj[name] !== undefined) {
            if ($(el).is(':checked')) {
                obj[name] = value;
            }
        } else {
            if (value) {
                obj[name] = value;
            }
        }
    });
    let csrftoken = $("input[name='csrfmiddlewaretoken']").val();
    $.ajax({
        url: `/api/${link}/`,
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            clearFields()
            if (type == 'success-form') {
                $(el.target).parents('form.form-main').find('.accordion .accordion-item:not(.first) .accordion-button').attr('data-bs-toggle', '');
                collapse01()
                $('form.form-main').append(`
                    <div class="thanks-block">
                        <div class="info-block">
                            <div class="title">Спасибо за заявку на сайте vozom.ru!</div>
                            <div class="desc">В течение 5 минут с Вами свяжется наш специалист и проинформирует Вас о стоимости перевозки, а также ответит на все интересующие Вас вопросы.</div>
                            <div class="btn-block">
                                <div class="btn yellow">Спасибо</div>
                            </div>
                        </div>
                    </div>
                `)
            }
            if (type == 'success-modal') {
                $('#infoModal').modal('show')
                titleText.html(`
                    <div class="h1 _title36 modal-title" id="exampleModalLabel">Спасибо за заявку!</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                `)
                bodyText.html(`
                    <div class="success-block">
                        <div class="desc">В течение 5 минут с Вами свяжется наш специалист и проинформирует Вас о стоимости перевозки, а также ответит на все интересующие Вас вопросы.</div>
                        <div class="btn-block">
                            <div class="btn" data-bs-dismiss="modal" aria-label="Закрыть">Закрыть</div>
                        </div>
                    </div>
                `)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function maskField() {
    $(".mask-phone").click(function(){
      $(this).setCursorPosition(3);
    }).mask("+7(999) 999-9999");
    // $(".mask-phone").mask("+7 (999) 999-99-99");
    $('.mask-date').mask('99.99.9999');
}
$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

function checkSize() {

}

$(document).on('click', '.open-modal', function (el) {
    el.preventDefault()
    infoOpenModal(el)
})

function infoOpenModal(elem) {
    let type = $(elem.target).attr('data-type-modal'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body')
    titleText.html('')
    bodyText.html('')
    if (type == 'type-1') {
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Заказать обратный звонок</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <form class="application-block">
                <input type="phone" class="mask-phone" placeholder="Номер телефона" name="phone">
                <div class="desc">Нажимая кнопку “Отправить” вы даете согласие на обработку персональных данных</div>
                <div class="btn-block">
                    <div class="btn btnBlack checkField" data-create="feedback_request" data-request="success-modal">Отправить</div>
                </div>
            </form>
        `)
    }
    maskField()
    $('#infoModal').modal('show')
}

$('.form-main .accordion-body.car-count .list label').on('click', function() {
    $('.form-main .accordion-body.car-count .list label img').removeClass('active')
    if ($(this).find('input').is(':checked') && !$(this).hasClass('more')) {
        $(this).find('img').addClass('active')
        $(this).parents('.list').find('label.form-car-count').remove()
        $(this).parents('.accordion-item').next('.accordion-item').find('.accordion-button').attr('data-bs-toggle', 'collapse');
        collapse1()
    } else if ($(this).find('input').is(':checked') && $(this).hasClass('more')) {
        $(this).find('img').addClass('active')
        $(this).parents('.list').append(`
            <label class="form-car-count">
                <span>Укажите нужное количество</span>
                <input type="number" name="car-count-main" placeholder="0">
                <div class="desc">Например, 5</div>
            </label>
        `);
    }
})
var timer_car_count;
$(document).on('input', '.form-main .accordion-body.car-count input[name=car-count-main]', function () {
    clearTimeout(timer_car_count);
    timer_car_count = setTimeout(function() {
        collapse1()
    }, 1000);
})
$('.form-main .accordion-body.car-body .list label').on('click', function() {
    $('.form-main .accordion-body.car-body .list label img').removeClass('active')
    if ($(this).find('input').is(':checked')) {
        $(this).find('img').addClass('active')
        $(this).parents('.accordion-item').next('.accordion-item').find('.accordion-button').attr('data-bs-toggle', 'collapse');
        collapse2()
    }
})
$('.form-main .accordion .accordion-item .accordion-body.model-brand-car .next-btn .btn').on('click', function() {
    $(this).parents('.accordion-item').next('.accordion-item').find('.accordion-button').attr('data-bs-toggle', 'collapse');
    collapse3()
})
$('.form-main .accordion .accordion-item .accordion-body.city .next-btn .btn').on('click', function() {
    // $(this).parents('.accordion-body').find('input[name=gofrom]').val()=='' ? $(this).parents('.accordion-body').find('input[name=gofrom]').addClass('error') : $(this).parents('.accordion-body').find('input[name=gofrom]').removeClass('error')
    // $(this).parents('.accordion-body').find('input[name=goto]').val()=='' ? $(this).parents('.accordion-body').find('input[name=goto]').addClass('error') : $(this).parents('.accordion-body').find('input[name=goto]').removeClass('error')
    let temp = $(this).parents('.accordion-body.city').find('.form-group-auto-row input.gocity').val(),
        field = $(this).parents('.accordion-body.city').find('.form-group-auto-row input.gocity'),
        list = $(this).parents('.accordion-body.city').find('.form-group-auto-row input.gocity .list.list-directions ul')
    for (let i = 0; i < field.length; i++) {
        let currentField = $(field[i]);
        let listItems = currentField.parents('.form-group-auto-row').find('.list.list-directions ul li');
        let hasError = true; // По умолчанию считаем, что есть ошибка
        for (let j = 0; j < listItems.length; j++) {
            if (currentField.val() === $(listItems[j]).text()) {
                currentField.removeClass('error');
                hasError = false; // Нет ошибки, так как есть совпадение
                break; // Выходим из внутреннего цикла, так как ошибка уже обработана
            }
        }
        if (hasError) {
            currentField.addClass('error');
        } else {
            // Если нет ошибки, переходим к следующему полю
            if (i < field.length - 1) {
                $(field[i + 1]).focus();
            }
        }
    }
    if ($(this).parents('.accordion-body').find('input.error').length==0) {
        $(this).parents('.accordion-item').next('.accordion-item').find('.accordion-button').attr('data-bs-toggle', 'collapse');
        collapse4()
    }
})
function collapse01() {
    const collapseElem = document.querySelector('#collapse01');
    const collapse = new bootstrap.Collapse(collapseElem, {
        toggle: false
    });
    collapse.toggle();
}
function collapse1() {
    const collapseElem = document.querySelector('#collapse1');
    const collapse = new bootstrap.Collapse(collapseElem, {
        toggle: false
    });
    collapse.toggle();
}
function collapse2() {
    const collapseElem = document.querySelector('#collapse2');
    const collapse = new bootstrap.Collapse(collapseElem, {
        toggle: false
    });
    collapse.toggle();
}
function collapse3() {
    const collapseElem = document.querySelector('#collapse3');
    const collapse = new bootstrap.Collapse(collapseElem, {
        toggle: false
    });
    collapse.toggle();
}
function collapse4() {
    const collapseElem = document.querySelector('#collapse4');
    const collapse = new bootstrap.Collapse(collapseElem, {
        toggle: false
    });
    collapse.toggle();
}

// City autocomplete
fetch("/static/other/cities.json", {method: "GET"})
.then(resp => {
    const cities = resp.json().then(cities => {
        const data = cities["cities"];
        $(".autocomplete-calc-cities").each(function () {
            $(this).autocomplete({
                source: data
            });
        });
    });
})
.catch(() => {
    console.error("failed to load cities for autocomplete");
});

$.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['ru']);

$(function() {
    $("#datepicker").datepicker({ dateFormat: 'dd.mm.yy' });
});

let delayTimer;

$('.form-main .accordion .accordion-item .accordion-body.city input.gocity, .approximatePriceSection .info-block form label input.input-directions').on('input', function() {
    clearTimeout(delayTimer);
    let temp = $(this).val(),
        field = $(this),
        $ul = $(field).parents('.form-group-auto-row').find('.list-directions ul');
    if (temp) {
        $(this).parents('.form-group-auto-row').find('.list.list-directions').removeClass('first_open').addClass('open')
        delayTimer = setTimeout(function() {
            var sense = 'getCities';
            var count = 1000;
            var need_all = 1;
            var country_id = 1;
            $ul.empty(); // Очищаем ul
            
            $.ajax({
                url: "https://api.vk.com/method/database." + sense,
                crossDomain: true,
                dataType: 'jsonp',
                type: 'GET',
                data: {
                    access_token: '2e0d84fa2e0d84fa2e0d84fad62d18c07a22e0d2e0d84fa4ade0d96bfa2d80291873734',
                    country_id: country_id,
                    count: count,
                    need_all: need_all,
                    v: 5.131,
                    q: temp
                },
                success: function(data) {
                    let items = data.response.items,
                        uniqueTitles = {};
                    items.forEach(function(item) {
                        let title = item.title;
                        // Проверяем, был ли уже такой title
                        if (!uniqueTitles[title]) {
                            let $li = $('<li>').text(title);
                            $ul.append($li); // Добавляем li в ul
                            uniqueTitles[title] = true; // Отмечаем title как уникальный
                        }
                    });
                }
            });
        }, 300);
    } else {
        $(this).parents('.form-group-auto-row').find('.list.list-directions').removeClass('open').addClass('first_open')
        $ul.empty();
    }
})

$(document).on('click', '.list.list-directions ul li', function (el) {
    $(this).parents('.form-group-auto-row').find('input.gocity').val($(this).text())
    $(this).parents('.list.list-directions').removeClass('open').addClass('first_open')
    $(this).parents('.form-group-auto-row').find('input.gocity').removeClass('error')
})

$('input.gocity').on('blur', function(event) {
    let temp = $(this).val(),
        field = $(this),
        list = $(event.target).parents('.form-group-auto-row').find('.list.list-directions ul li');
    let hasError = true; // По умолчанию считаем, что есть ошибка
    for (let i = 0; i < list.length; i++) {
        if (temp === $(list[i]).text()) {
            $(field).removeClass('error');
            hasError = false; // Нет ошибки, так как есть совпадение
            break; // Выходим из цикла, так как ошибка уже обработана
        }
    }
    if (hasError) {
        $(field).addClass('error');
    } else {
        // Если нет ошибки, переходим к следующему полю
        let nextField = field.closest('.form-group-auto-row').next().find('input.gocity');
        if (nextField.length > 0) {
            nextField.focus();
        }
    }
    
    setTimeout(function() {
        $(event.target).parents('.form-group-auto-row').find('.list.list-directions').removeClass('open').addClass('first_open');
    }, 200);
});

var show = true;
$(window).on("scroll load resize", function () {
//   if (!show) return false;

  var benefitsBlocks = $(".benefits__inner");

  benefitsBlocks.each(function () {
    var benefitsInner = $(this);
    var w_top = $(window).scrollTop();
    var e_top = benefitsInner.offset().top;
    var w_height = $(window).height();

    if (w_top + w_height - 350 >= e_top && !benefitsInner.hasClass("animated")) {
      benefitsInner.find('.benefits__number').css('opacity', '1').addClass('active-number');
      for (let i=0; i<benefitsInner.find('.benefits__number.active-number').parents('.item_a').length;i++) {
        let percent = benefitsInner.find('.benefits__number.active-number').parents('.item_a').eq(i).attr('data-percent')
        benefitsInner.find('.benefits__number.active-number').parents('.item_a').eq(i).find('.percent').css({'left': percent + '%'}).addClass('active')
        benefitsInner.find('.benefits__number.active-number').parents('.item_a').eq(i).find('.line-main .line').css({'width': percent + '%'}).addClass('active')
    }
      benefitsInner.find('.benefits__number').spincrement({
        thousandSeparator: "",
        duration: 2000
      });

      benefitsInner.addClass("animated");
    }
  });

  show = false;
});

$('.offcanvas#menu .offcanvas-body ul li.sub').on('click', function() {
    $(this).toggleClass('open')
})

$('.blogSection .functions .filter label select').on('change', function () {
    // Получаем значение data-filter
    let filterValue = $(this).val();
    // Получаем текущий URL
    let currentUrl = window.location.href;
    // Регулярное выражение для поиска параметра "sort" в URL
    let regex = /(\?|&)sort=[^&]*/g;
    // Заменяем существующие параметры "sort" в URL на новое значение
    let newUrl = currentUrl.replace(regex, '');
    // Добавляем новый параметр "sort"
    let separator = newUrl.indexOf('?') !== -1 ? '&' : '?';
    newUrl += separator + 'sort=' + filterValue;
    // Обновляем адресную строку без перезагрузки страницы
    history.pushState({}, '', newUrl);
    // Обновляем страницу (вы можете также выполнить другие действия по вашему выбору)
    window.location.reload();
});

$('form.directions .btn-block .btn.check-direction').on('click', function() {
    let temp = $(this).parents('.directions').find('.form-group-auto-row input.input-directions').val(),
        field = $(this).parents('.directions').find('.form-group-auto-row input.input-directions'),
        list = $(this).parents('.directions').find('.form-group-auto-row input.input-directions .list.list-directions ul')
    for (let i = 0; i < field.length; i++) {
        let currentField = $(field[i]);
        let listItems = currentField.parents('.form-group-auto-row').find('.list.list-directions ul li');
        let hasError = true; // По умолчанию считаем, что есть ошибка
        for (let j = 0; j < listItems.length; j++) {
            if (currentField.val() === $(listItems[j]).text()) {
                currentField.removeClass('error');
                hasError = false; // Нет ошибки, так как есть совпадение
                break; // Выходим из внутреннего цикла, так как ошибка уже обработана
            }
        }
        if (hasError) {
            currentField.addClass('error');
        } else {
            // Если нет ошибки, переходим к следующему полю
            if (i < field.length - 1) {
                $(field[i + 1]).focus();
            }
        }
    }
})

$(document).on('click', '.form-main .thanks-block .info-block .btn-block .btn', function (el) {
  $(this).parents('.thanks-block').remove()
})