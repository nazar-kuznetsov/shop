$(function () {

  var massage = $('#js-massage'); // div в котором храниться текст с которого нужно переводить 
  massage.addClass('hide');

  $.getJSON("https://ip.nf/me.json", function (data) {
    console.log(data);
    var ip = data.ip.ip; //узнаем ip пользователя
    var country = data.ip.country; // узнаем с какой страны пользователь
    var lang = data.ip.country_code; // язык внутри страны пример ru, en, uk 

    $('#country').text("Ваша страна " + country); // показывает название страны на экране
    $('#ip').text("Ваш IP " + ip); // показывает ip на экране


    // настройки 
    var settings = {
      text: massage.html(),
      c: country,
      langCode: lang,
      language: massage.attr('data-language') // язык с которого нужно переводить по умолчанию русский
    };

    // отправляем на сервер текст который нужно перевести
    $.ajax({
      type: "POST",
      url: "/",
      data: JSON.stringify(settings),
      dataType: "json",
      contentType: "application/json",
      success: function (data) { // data хранит текст уже переведеный на нужный язык
        massage.html(data);
        massage.removeClass('hide');
      },
    });

  });

  //==============Custom JS===============================




});
