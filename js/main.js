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



  let dropMenuBtn = document.querySelectorAll('.drop-menu');
  let dropMenu = document.querySelector('#citySelect')
  let lis = document.querySelectorAll('#citySelect li')
  
  let overlay = document.getElementById("overlay");
  // let overlayStyle = window.getComputedStyle(overlay);
  
  // drop menubtn
  dropMenuBtn.forEach((el) => {
    el.addEventListener('click', e =>  {      
      dropMenu.classList.toggle('hide');
  })})
  lis.forEach(li => {
    li.addEventListener('click', e => {
      let locationInput = li.parentElement.parentElement.nextElementSibling;
      locationInput.value = e.target.textContent;
      dropMenu.classList.add('hide');
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
  let myInputPrice = document.querySelector('.form-group .price');
  let g = "";
  radios.forEach(radio => {
    radio.addEventListener('change',e => {
      const formatted = String(e.target.value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      parseInt(e.target.value) === 8000 ?  g="G4": parseInt(e.target.value) === 10000 ? g="G6" : g="G10";
      myInputPrice.innerHTML = `${g} - <span>${formatted} AED</span>`
      // console.log(e.target.value)
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

}