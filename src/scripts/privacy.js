import $ from 'jquery';

$('.top_arrow').on('click', (e) => {
  e.preventDefault();
  $('html,body').animate({ scrollTop: 0 }, 500);
});
$('.footer_list a').on('click', (e) => {
  e.preventDefault();
  const current = $(e.currentTarget);
  location.href = `/${current.attr('href')}`
});
