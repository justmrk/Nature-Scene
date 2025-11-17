let modelMesh = null; // فقط یک بار تعریف می‌کنیم
let materialState = 0;
let scaleState = 0;

AFRAME.registerComponent('column-interaction', {
  init: function () {
    const wrapper = this.el; 
    const modelEl = wrapper.querySelector('#columnModelEntity');
    const infoText = document.querySelector('#infoText');
    let toggled = false;

    // وقتی مدل لود شد، مرجع سه‌جی‌اس را ذخیره کن
    modelEl.addEventListener('model-loaded', () => {
      modelMesh = modelEl.getObject3D('mesh');
      console.log(">> modelMesh آماده شد");
    });

    // یک نسخه مشترک از تغییر رنگ
    function setModelColor(colorHex) {
      if (!modelMesh) return;

      modelMesh.traverse(node => {
        if (node.isMesh && node.material) {

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

    // کلیک روی مدل
    wrapper.addEventListener('click', () => {
      toggled = !toggled;

      setModelColor(toggled ? "#2ecc71" : "#9b9b9b");

      infoText.setAttribute('value',
        toggled ? "ستون 30x30\nمیلگرد Φ16\nبتن C30" : ""
      );

      infoText.setAttribute('visible', toggled);
    });

    // برای touchPlane
    const touchPlane = wrapper.parentEl.querySelector('#touchPlane');
    if (touchPlane) {
      touchPlane.addEventListener('click', () => wrapper.click());
    }

    // 🔽 دکمه‌ها (به همان setModelColor و modelMesh وصل می‌شوند) 🔽

    document.querySelector('#btnMaterial').addEventListener('click', () => {
      materialState++;

      if (materialState % 3 === 1) setModelColor("#9b9b9b");
      else if (materialState % 3 === 2) setModelColor("#c0c0c0");
      else setModelColor("#2ecc71");
    });

    document.querySelector('#btnScale').addEventListener('click', () => {
      scaleState++;

      if (scaleState % 3 === 1)
        wrapper.setAttribute('scale', '1.2 1.2 1.2');
      else if (scaleState % 3 === 2)
        wrapper.setAttribute('scale', '1.5 1.5 1.5');
      else
        wrapper.setAttribute('scale', '1 1 1');
    });

    document.querySelector('#btnInfo').addEventListener('click', () => {
      const v = infoText.getAttribute('visible');
      infoText.setAttribute('visible', !v);
    });
  }
});
