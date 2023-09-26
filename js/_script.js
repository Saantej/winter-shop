$(document).ready(function() {
    maskField()
    checkSize()
})
$(window).resize(function() {

})

$(window).scroll(function () {

});

// href
$("body").on('click', '[href*="#"]', function (e) {
	var fixed_offset = 0;
	$('html,body').stop().animate({
		scrollTop: $(this.hash).offset().top - fixed_offset
	}, 1000);
	e.preventDefault();
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
                        $(field[i]).removeClass('error')
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
                        $(field[i]).removeClass('error')
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
                $(field[i]).removeClass('error')
            }
        }
    }
    if ($(rating).find('span.active').length == 0) {
        $(rating).addClass('error')
    } else {
        $(rating).removeClass('error')
    }
    if ($(el.target).parents('form').find('.error').length == 0) {
        if (!$(el.target).hasClass('checkDirections')) {
            sendAjax(field, el)
            clearFields()
        } else if ($(el.target).hasClass('checkDirections')) {
            sendAjaxDirections(field, el)
        }
    }
}

function clearFields() {
    $('input:not([type=checkbox]):not([name=csrfmiddlewaretoken]:not([name=color_product]):not([name=upholstery_product]))').val('')
    $('textarea').val('')
    $('.__select__title').removeClass('error')
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
        if (obj[name] !== undefined) {
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
            if (type == 'success') {
                window.location.href = '/success/'
            } else if (type == 'reviews') {
                window.location.href = '/success-review/'
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function sendAjaxDirections(dataForm, el) {
    let obj = {},
        type = $(el.target).attr('data-request'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body'),
        link = $(el.target).attr('data-create')

    $.each(dataForm, function (i, el) {
        let name = $(el).attr('name'),
            value = $(el).val();
        if (obj[name] !== undefined) {
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
        url: `/search-directions/`,
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            if ('direction_url' in response) {
                let directionUrl = response.direction_url;
                window.location.href = directionUrl;
            } else {
                console.log('Direction not found');
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
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Обратный звонок</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <form class="application-block container-2">
                <input type="text" placeholder="Имя" name="first_name">
                <input type="text" placeholder="Фамилия" name="last_name" class="no-r">
                <input type="phone" class="mask-phone" placeholder="Номер телефона" name="phone">
                <input type="email" placeholder="E-mail" name="email" class="no-r">
                <div class="desc">Нажимая кнопку “Отправить” вы даете согласие на обработку персональных данных</div>
                <div class="btn-block">
                    <div class="btn btnBlack checkField" data-create="feedback_request" data-request="success">Отправить</div>
                </div>
            </form>
        `)
    } else if (type == 'type-2') {
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Оформить заявку</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <form class="application-block container-2">
                <input type="text" placeholder="Имя" name="first_name">
                <input type="text" placeholder="Фамилия" name="last_name" class="no-r">
                <input type="phone" class="mask-phone" placeholder="Номер телефона" name="phone">
                <input type="email" placeholder="E-mail" name="email" class="no-r">
                <div class="desc">Нажимая кнопку “Отправить” вы даете согласие на обработку персональных данных</div>
                <div class="btn-block">
                    <div class="btn btnBlack checkField" data-create="feedback_request" data-request="success">Отправить</div>
                </div>
            </form>
        `)
    } else if (type == 'type-3') {
        titleText.html(`
            <div class="h1 _title36 modal-title" id="exampleModalLabel">Оставить отзыв</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
            <form class="application-block container-2">
                <input type="text" placeholder="Имя" name="first_name">
                <input type="text" placeholder="Фамилия" name="last_name" class="no-r">
                <input type="text" placeholder="Ссылка на соц.сеть (Например: ВК)" name="social" class="no-r">
                <input type="email" placeholder="E-mail" name="email" class="no-r">
                <textarea placeholder="Текст отзыва" name="review" class="span-2" rows="3"></textarea>
                <div class="desc">Нажимая кнопку “Отправить” вы даете согласие на обработку персональных данных</div>
                <div class="btn-block">
                    <div class="btn btnBlack checkField" data-create="reviews_request" data-request="reviews">Отправить</div>
                </div>
            </form>
        `)
    }
    maskField()
    $('#infoModal').modal('show')
}

let delayTimer;

$(document).ready(function() {
    // Получаем значение параметра 'search' из URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');
    $('input.input-directions').val(searchValue)
});
$(document).on('click', '.list.list-directions ul li', function (el) {
  $(this).parents('label').find('input.input-directions').val($(this).text())
})
$('input.input-directions').on('click input', function (el) {
    clearTimeout(delayTimer);
    if ($(this).val() != 0) {
        $(this).parents('label').find('.list.list-directions').removeClass('first_open').addClass('open')
        let $results = $(this).parents('label').find('.list.list-directions ul');
        let temp = $(this).val()
        if (temp) {
            $(this).parents('label').find('.list.list-directions ul li').each(function () {
                if ($(this).text().toLowerCase().indexOf(temp.toLowerCase()) > -1) {
                    $(this).removeClass('d-none')
                } else {
                    $(this).addClass('d-none')
                }
            })
        } else {
            $(this).parents('label').find('.list.list-directions ul li').each(function () {
                $(this).removeClass('d-none')
            })
        }
    } else if ($('input.input-directions[name=goto]').val()==0 && $('input.input-directions[name=gofrom]').val()==0 && $(this).parents('label').find('.list').hasClass('first_open')) {
        $(this).parents('label').find('.list.list-directions ul').empty()
        let cities_list_add = localStorage.getItem('cities'),
            cities_list = JSON.parse(cities_list_add);
        for (let j=0; j<cities_list.length; j++) {
            $('input.input-directions').parents('label').find('.list.list-directions ul').append(`
                <li>${cities_list[j]}</li>
            `);
        }
        $(this).parents('label').find('.list').removeClass('first_open')
        $(this).parents('label').find('.list').addClass('open')
    } else if ($(this).val() == 0 && $(this).parents('label').find('.list').hasClass('first_open')) {
        $(this).parents('label').find('.list').removeClass('first_open')
        $(this).parents('label').find('.list').addClass('open')
    } else if (($(this).val() == 0 && $(this).attr('name') == 'gofrom' && $('input.input-directions[name=goto]').val() == 0) || ($(this).val() == 0 && $(this).attr('name') == 'goto' && $('input.input-directions[name=gofrom]').val() == 0)) {
        $(this).parents('label').find('.list').removeClass('first_open').addClass('open');
        $(this).parents('label').find('.list.list-directions ul li').removeClass('d-none')
        $(this).parents('label').find('.list.list-directions ul').empty()
        let cities_list_add = localStorage.getItem('cities'),
            cities_list = JSON.parse(cities_list_add);
        for (let j=0; j<cities_list.length; j++) {
            $(this).parents('label').find('.list.list-directions ul').append(`
                <li>${cities_list[j]}</li>
            `);
        }
    } else {
        $(this).parents('label').find('.list').removeClass('first_open').addClass('open');
        $(this).parents('label').find('.list.list-directions ul li').removeClass('d-none')
    }

    delayTimer = setTimeout(function() {
        if ($(el.target).val() != 0) {
            checkCity(el, $(el.target).val());
        }
    }, 300);
});

$('input.input-directions').on('blur', function(event) {
    setTimeout(function() {
        $(event.target).parents('label').find('.list.list-directions').removeClass('open').addClass('first_open')
    }, 200)
});

let city_from_to = []

function checkCity(el, text) {
    let addedResults = [],
        csrftoken = $("input[name='csrfmiddlewaretoken']").val();
    $.ajax({
        url: `/api/cities/?name=${text}`,
        type: 'get',
        dataType: 'json',
        async: false,
        headers: {
            'X-CSRFToken': csrftoken,
        },
        success: function(response) {
            if (response.count != 0) {
                if ($(el.target).attr('name') == 'gofrom') {
                    city_from_to['from'] = response.results[0].name
                    let id = response.results[0].id
                    $.ajax({
                        url: `/api/directions/?gofrom=${id}`,
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        headers: {
                            'X-CSRFToken': csrftoken,
                        },
                        success: function(response) {
                            const $list = $('input.input-directions[name=goto]').parents('label').find('.list.list-directions ul');
                            // Очищаем предыдущие результаты
                            $list.empty();
                            for (let i=0; i< response.count; i++) {
                                $.ajax({
                                    url: `/api/cities/${response.results[i].goto}/`,
                                    type: 'get',
                                    dataType: 'json',
                                    async: false,
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    success: function(response) {
                                        if (!addedResults.includes(response.name)) {
                                            addedResults.push(response.name); // Добавляем результат в массив
                                            // Добавляем новый результат
                                            $list.append(`
                                                <li>${response.name}</li>
                                            `);
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else if ($(el.target).attr('name') == 'goto') {
                    city_from_to['to'] = response.results[0].name
                    let id = response.results[0].id
                    $.ajax({
                        url: `/api/directions/?goto=${id}`,
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        headers: {
                            'X-CSRFToken': csrftoken,
                        },
                        success: function(response) {
                            const $list = $('input.input-directions[name=gofrom]').parents('label').find('.list.list-directions ul');
                            // Очищаем предыдущие результаты
                            $list.empty();
                            for (let i=0; i< response.count; i++) {
                                $.ajax({
                                    url: `/api/cities/${response.results[i].gofrom}/`,
                                    type: 'get',
                                    dataType: 'json',
                                    async: false,
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    success: function(response) {
                                        if (!addedResults.includes(response.name)) {
                                            addedResults.push(response.name); // Добавляем результат в массив
                                            // Добавляем новый результат
                                            $list.append(`
                                                <li>${response.name}</li>
                                            `);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            } else if (response.count == 0 && $(el.target).attr('name') == 'gofrom') {
                city_from_to['from'] = ''
            } else if (response.count == 0 && $(el.target).attr('name') == 'goto') {
                city_from_to['to'] = ''
            }
            city_from_to.from == '' || !city_from_to.from ? $('input.input-directions[name=gofrom]').addClass('error') : $('input.input-directions[name=gofrom]').removeClass('error')
            city_from_to.to == '' || !city_from_to.to ? $('input.input-directions[name=goto]').addClass('error') : $('input.input-directions[name=goto]').removeClass('error')
        }
    });
}