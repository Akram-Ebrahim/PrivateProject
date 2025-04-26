window.onload = function() {

  function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    const arrow = document.getElementById("arrow");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    arrow.style.transform = (menu.style.display === "block") ? "rotate(180deg)" : "rotate(0deg)";
  }
  document.querySelector('#dropdownButton').addEventListener('click',toggleDropdown)

  window.addEventListener("click", function (e) {
    const button = document.getElementById("dropdownButton");
    const menu = document.getElementById("dropdownMenu");
    const arrow = document.getElementById("arrow");
    if (!button.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    }
  });

  function openSidebar() {
    document.getElementById("sidebar").style.right = "0";
    document.getElementById("overlay").style.display = "block";
  }
  function closeSidebar() {
    document.getElementById("sidebar").style.right = "-100%";
    document.getElementById("overlay").style.display = "none";
  }
  document.querySelector(".menu").addEventListener("click", openSidebar);
  document.querySelector('.close-btn').addEventListener('click',closeSidebar)



  // drop menu (city select)
  let dropMenuBtn = document.querySelectorAll('.drop-menu');
  let lis = document.querySelectorAll('.citySelect li');
  dropMenuBtn.forEach((el) => {
    el.addEventListener('click', e =>  {
      e.target.nextElementSibling.classList.toggle('hide');
  })})
  lis.forEach(li => {
    li.addEventListener('click', e => {
      let locationInput = li.parentElement.parentElement.nextElementSibling;
      locationInput.value = e.target.textContent;
      e.target.parentElement.classList.add('hide');
    })
  })



  // gas meter
  let msgQuest = document.querySelectorAll('.msg-quest');
  msgQuest.forEach(el => {
    el.addEventListener('click',e => {
      el.classList.toggle('hide')
      el.nextElementSibling.classList.toggle('hide')
    })
  })

  // radio Changing
  let radios = document.querySelectorAll('input[name="gasmeter"]');
  let mySpanPrice = document.querySelector('.form-group .price');
  let myInputPrice = document.querySelector('.form-group .price + input[name="refundable-gas-deposite"]');
  let g = "";
  radios.forEach(radio => {
    radio.addEventListener('change',e => {
      const formatted = String(e.target.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      parseInt(e.target.value) === 8000 ?  g="G4": parseInt(e.target.value) === 10000 ? g="G6" : g="G10";
      mySpanPrice.innerHTML = `${g} - <span>${formatted} AED</span>`
      myInputPrice.value = `${g}-${e.target.value}` // real input
      
    })
  })

  // rights Updating
  let rights = document.querySelector('.rights');
  //         <span class="rights">All Rights Reserved, Sergas 2025</span>
  let currentYear = new Date().getFullYear();
  rights.textContent = `All Rights Reserved, Sergas ${currentYear}`

  // Flat Pickr
  const flatpickrInstance = flatpickr("input[type='date']", {
    dateFormat: "Y-m-d",
    disableMobile: true,
    onReady: function(selectedDates, dateStr, instance) {
      const footer = document.createElement("div");
      footer.className = "flatpickr-footer";

      // Cancel Button
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "flatpickr-cancel";
      cancelBtn.addEventListener("click", () => {
        instance.clear();
        instance.close();
      });

      // Confirm Button
      const confirmBtn = document.createElement("button");
      confirmBtn.textContent = "Choose Date";
      confirmBtn.className = "flatpickr-confirm";
      confirmBtn.addEventListener("click", () => {
        instance.close();
      });

      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      instance.calendarContainer.appendChild(footer);
    }
  });
  // Calendar Btn
  let dateIcon = document.querySelector('.date');
  dateIcon.addEventListener("click", () => {
    flatpickrInstance.open();
  });


  // show/hide form
  const subBtns = document.querySelectorAll('.sub-btns button');
  let formWrapper = document.querySelector('.form-wrapper');
  let SubForm = document.querySelector('.subscription-form');
  let systemNo = document.querySelector('.system-no');
  let systemNoInput = document.querySelector('.system-no input');

  function showForm(hideSystemNo = false) {
    formWrapper.classList.add('show');
    SubForm.classList.add('show')
    formWrapper.style.height = '0px';

    requestAnimationFrame(() => {
      formWrapper.style.height = 'max-content'
    });

    if (hideSystemNo && systemNo) {
      systemNo.style.display = 'none';
      systemNoInput.style.display = 'none';
    } else if (systemNo) {
      systemNo.style.display = 'block';
      systemNoInput.style.display = 'block';
    }
  }
  // loop over buttons
  subBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('new')) {
        showForm(true); // إخفاء system no مع New Subscription
      } else if (btn.classList.contains('exist')) {
        showForm(false); // بدون إخفاء system no مع Existing Subscription
      }

    // Firstly remove active class from all
      subBtns.forEach(button => button.classList.remove('active'));
      // Secondly add active class to current
      btn.classList.add('active');
    });
  });


  // Validation
  // [1] check required
  // [2] check empty
  // [3] check type [number => make RE -- text]
  const inputs = SubForm.querySelectorAll('input');
  SubForm.addEventListener('submit',(e) => {
    e.preventDefault();
    let isValid = true;
    
    inputs.forEach(input => {
      let value = input.value.trim()
      if (input.dataset.required && !(input.style.display === 'none')) {
        if (!(value === "")) {
          if (input.type === 'text') {
            if (input.dataset.number === 'number') {
              if (!/^\d+$/.test(value)) {
                isValid = false;
                // console.log(input.name , ": Number Does not Match RE [numbers]");
                input.parentElement.setAttribute('error-msg',`Number is Not Valid`)
                input.parentElement.classList.add('show-error')
              }
            }
          } else if (input.type === 'email') {
            if (!/^\S+@\S+\.\S+$/.test(value)) {
              isValid = false;
              // console.log(input.name , ": Email not Match RE");
              input.parentElement.setAttribute('error-msg',`Email is Not Valid`)
              input.parentElement.classList.add('show-error')
            }
          } else if (input.type === 'checkbox') {
            if (!input.checked) {
              isValid = false;
              // console.log(input.name , ": Please Read Terms & Conditions Then Apply On This Check");
              input.parentElement.setAttribute('error-msg',`Please Read Terms & Conditions Then Apply On This Check`)
              input.parentElement.classList.add('show-error')
            }
          }
        } else {
          isValid = false;
          // console.log(input.name , ": is empty")
          // error msg
          input.parentElement.setAttribute('error-msg',`Empty Field`)
          input.parentElement.classList.add('show-error')
        }
      }
    })

    if (isValid) {
      SubForm.submit();
    }
  })
}