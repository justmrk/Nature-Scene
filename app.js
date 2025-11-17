
  AFRAME.registerComponent('column-interaction', {
    init: function () {

      const el = this.el;  
      let toggled = false;

      el.addEventListener('click', function () {
        toggled = !toggled;

        // تغییر رنگ مدل
        el.setAttribute('material', 'color', toggled ? 'green' : 'gray');

        // نمایش یا مخفی کردن متن
        const info = document.querySelector('#infoText');
        info.setAttribute('visible', toggled);
      });
    }
  });

