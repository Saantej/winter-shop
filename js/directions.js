// const from = window.directionsPageInfo.from;
// const to = window.directionsPageInfo.to;

const csrfTokenElems = document.querySelector('input[name="csrfmiddlewaretoken"]');
const csrfTokens = csrfTokenElems.value;

const apiGet = (path, data) =>
  fetch(path, {
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrfTokens }
  });

const directionsMain = () => {
  let disabled = false;
  const getDir = (el) => {
    const from = $(el.target).parents('form.directions').find('input[name=gofrom]').val();
    const to = $(el.target).parents('form.directions').find('input[name=goto]').val();
    if (from && to && !disabled) {
      disabled = true
      apiGet(`/get-direction-slug/${from}/${to}`).then(res => {
        const { url } = res;
        window.location.replace(url);
        disabled = false
      });
    }
  };
  $(".btn.check-direction").click(function(el) {
    if ($(el.target).parents('form.directions').find('input.error').length==0) {
        getDir(el);
    }
  });
};

$(document).ready(directionsMain);