import $ from 'jquery';
import notice from 'libraries-frontend-framelunch/js/notice';
import getPosition from '../position';
import MovingTitle from '../titleBg';

const section = $('#sec7');
const select = $('.contact_select');
const selectOption = $('.contact_select_option');
const contactInput = $('.contact_box input, .contact_box textarea');
const title = $('.title-7');
const titleBg = $('.title_bg-7');
let begin = 0;
const moveTitle = new MovingTitle(titleBg);
// contact values
const company = $('#contactCompany');
const name = $('#contactName');
const mail = $('#contactMail');
const phone = $('#contactPhone');
const msg = $('#contactMsg');
const companyConfirm = $('#confirmCompany');
const nameConfirm = $('#confirmName');
const mailConfirm = $('#confirmMail');
const phoneConfirm = $('#confirmPhone');
const msgConfirm = $('#confirmMsg');
const contactSubmit = $('#contactSubmit');
const contactSend = $('#confirmSend');
const contactAlert = $('#contactAlert');
const contactAlertContent = $('#contactAlertContent');
let forumData;
let option = '';
let canSend = false;
const makeData = () => {
  forumData = {
    ct: '',
    company: company.val(),
    name: name.val(),
    mail: mail.val(),
    phone: phone.val(),
    select: option,
    msg: msg.val(),
  };
};
const checkForm = () => {
  canSend = true;
  if (company.val() === '') {
    company.addClass('alert');
    canSend = false;
  }
  if (name.val() === '') {
    name.addClass('alert');
    canSend = false;
  }
  if (mail.val() === '') {
    mail.addClass('alert');
    canSend = false;
  }
  if (phone.val() === '') {
    phone.addClass('alert');
    canSend = false;
  }
  if (msg.val() === '') {
    msg.addClass('alert');
    canSend = false;
  }
};
notice.listen('init', () => {
  selectOption.on('click', (i) => {
    select.find('span').html(i.currentTarget.innerText);
    option = i.currentTarget.innerText;
    select.removeClass('show');
  });
  select.on('click', (e) => {
    const current = $(e.target);
    if (current.hasClass('contact_input')) {
      if (current.hasClass('show')) {
        select.removeClass('show');
      } else {
        select.addClass('show');
      }
    }
  });
  contactInput.change((i) => {
    $(i.currentTarget).removeClass('alert');
  });
  contactSubmit.on('click', () => {
    checkForm();
    if (canSend) {
      makeData();
      companyConfirm.text(forumData.company);
      nameConfirm.text(forumData.name);
      mailConfirm.text(forumData.mail);
      phoneConfirm.text(forumData.phone);
      msgConfirm.text(forumData.msg);
      notice.publish('showModal', ['#contactConfirm']);
    }
  });
  contactSend.on('click', () => {
    if (canSend) {
      notice.publish('hideModal', []);
      $.ajax({
        type: 'POST',
        url: 'sendmail.php',
        data: forumData,
        success: () => {
          setTimeout(() => {
            notice.publish('showModal', ['#contactAlertDone']);
          }, 1000);
        },
        error: () => {
          setTimeout(() => {
            notice.publish('showModal', ['#contactAlertError']);
          }, 1000);
        },
      });
    }
  });
});
notice.listen('scroll', (scrollTop) => {
  const pos = getPosition(section);
  const currentPosition = section.offset().top;
  const wHeight = $(window).height();
  if (pos.pos === 0 && begin === 0) {
    moveTitle.move();
    moveTitle.start();
    begin = 1;
  }
  if (pos.pos !== 0) {
    moveTitle.stop();
    begin = 0;
  }
  if (scrollTop > currentPosition - (wHeight * 0.5)) {
    title.removeClass('hide');
  }
});
