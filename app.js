AFRAME.registerComponent('column-interaction', {
  init: function () {
    const wrapper = this.el; // a-entity با id=columnWrapper
    const modelEl = wrapper.querySelector('#columnModelEntity');
    const infoText = document.querySelector('#infoText');
    let toggled = false;
    let modelMesh = null; // نگهدارنده‌ی سه‌جی‌اس آبجکت

    // وقتی مدل لود شد، مرجع سه‌جی‌اس آن را بگیر
    modelEl.addEventListener('model-loaded', () => {
      // modelEl.getObject3D('mesh') برای glTF ها معمولاً mesh برمی‌گرداند
      modelMesh = modelEl.getObject3D('mesh');
    });

    // utility برای تغییر رنگ تمام متریال‌های داخل مدل
    function setModelColor(colorHex) {
      if (!modelMesh) return;
      modelMesh.traverse(function (node) {
        if (node.isMesh && node.material) {
          // اگر material آرایه‌ای است (multi-material) handle کن
          if (Array.isArray(node.material)) {
            node.material.forEach(m => {
              if (m && m.color) m.color.set(colorHex);
            });
          } else {
            if (node.material.color) node.material.color.set(colorHex);
            // برای PBR ممکنه نیاز باشه metalness/roughness هم تنظیم بشه (اختیاری)
            // node.material.metalness = 0.0;
            // node.material.roughness = 1.0;
            node.material.needsUpdate = true;
          }
        }
      });
    }

    // handler کلیک روی wrapper یا touchPlane
    wrapper.addEventListener('click', function (evt) {
      toggled = !toggled;

      // تغییر رنگ مدل (شش رقمی یا نام رنگ)
      if (toggled) {
        setModelColor('#2ecc71'); // سبز ملایم
      } else {
        setModelColor('#9b9b9b'); // خاکستری
      }

      // نمایش/پنهان کردن متن با JS (این روش \n را درست تفسیر می‌کند)
      infoText.setAttribute('value', toggled ? "ستون 30x30\nمیلگرد Φ16\nبتن C30" : "");
      infoText.setAttribute('visible', toggled);
    });

    // برای اطمینان: اگر روی touchPlane کلیک شد هم event به wrapper نمی‌رسد، یک شنونده جدا اضافه کن
    const touchPlane = wrapper.parentEl.querySelector('#touchPlane');
    if (touchPlane) {
      touchPlane.addEventListener('click', () => {
        // همان کار بالا را اجرا کن
        wrapper.dispatchEvent(new Event('click'));
      });
    }
  }
});


window.addEventListener('DOMContentLoaded', () => {

  const wrapper = document.querySelector('#columnWrapper');
  const infoText = document.querySelector('#infoText');
  let scaleState = 0;
  let materialState = 0;
  let modelEl = document.querySelector('#columnModelEntity');
  let modelMesh = null;

// وقتی مدل glb لود شد، آبجکت three.js آن را بگیر
modelEl.addEventListener('model-loaded', () => {
  modelMesh = modelEl.getObject3D('mesh');
});

  function setModelColor(colorHex) {
  if (!modelMesh) return;

  modelMesh.traverse(node => {
    if (node.isMesh && node.material) {

      // اگر مدل چند material داشت
      if (Array.isArray(node.material)) {
        node.material.forEach(m => {
          if (m.color) m.color.set(colorHex);
          m.needsUpdate = true;
        });
      } else {
        if (node.material.color) node.material.color.set(colorHex);
        node.material.needsUpdate = true;
      }
    }
  });
}


  // تغییر متریال
 let materialState = 0;

document.querySelector('#btnMaterial').addEventListener('click', () => {
  materialState++;

  if (materialState % 3 === 1) {
    setModelColor("#9b9b9b");   // بتن خاکستری
  }
  else if (materialState % 3 === 2) {
    setModelColor("#c0c0c0");   // فولادی/نقره‌ای
  }
  else {
    setModelColor("#2ecc71");   // سبز رنگی
  }
});


  // تغییر اندازه
  document.querySelector('#btnScale').addEventListener('click', () => {
    scaleState++;

    if (scaleState % 3 === 1) wrapper.setAttribute('scale', '1.2 1.2 1.2');
    else if (scaleState % 3 === 2) wrapper.setAttribute('scale', '1.5 1.5 1.5');
    else wrapper.setAttribute('scale', '1 1 1');
  });

  // نمایش/مخفی‌سازی متن
  document.querySelector('#btnInfo').addEventListener('click', () => {
    const v = infoText.getAttribute('visible');
    infoText.setAttribute('visible', !v);
  });

});

