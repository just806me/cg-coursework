$(function () {
  $('.header .item').on('click', function () {
    var $this = $(this), page = $this.data('page');

    window.location.hash = page;

    $.get('pages/' + page + '.html', function (data) { $('#container').html(data); });

    $('.header .item').removeClass('selected');

    $this.addClass('selected');
  });

  $('.header .item[data-page=' + (window.location.hash.slice(1) || "main") + ']').click();
});
