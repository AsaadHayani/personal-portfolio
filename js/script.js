// Check If There's Local Storage Color Optino
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main--color", mainColor);

  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With "data-color" === Local Storage Item
    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backOption = true,
  // Variable To Controle The Backgound Iterval
  backInterval,
  // Check If There's Local Storage Random Background Item
  backLocalItem = localStorage.getItem("back_option");

// Check If Random Background Local Storage Is Not Empty
if (backLocalItem !== null) {
  if (backLocalItem === "true") {
    backOption = true;
  } else {
    backOption = false;
  }

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-back span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backLocalItem === "true") {
    document.querySelector(".random-back .yes").classList.add("active");
  } else {
    document.querySelector(".random-back .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-cog").onclick = function() {
  // Toggle Class fa-spin For Rotation On Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsList = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsList.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random Backgrounds Option
const randBackEl = document.querySelectorAll(".random-back span");

// Loop On All Spans
randBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.back === "yes") {
      backOption = true;
      randomizeImgs();

      localStorage.setItem("back_option", true);
    } else {
      backOption = false;
      clearInterval(backInterval);

      localStorage.setItem("back_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page"),
  // Get Array Of Imgs
  imgsArray = [
    "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backOption === true) {
    backInterval = setInterval(() => {
      // Get Random Number
      let randomNumbers = Math.floor(Math.random() * imgsArray.length);
      // Change Backgroundimg Url
      landingPage.style.backgroundImage =
        'url("' + imgsArray[randomNumbers] + '")';
    }, 5000);
  }
}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop,
    // Skills Outer Height
    skillsOuterHeight = ourSkills.offsetHeight, //طول السيكشن
    // Window Height
    windowHeight = this.innerHeight,
    // Window Scroll Top
    windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills .skill .progress span");

    allSkills.forEach((skill) => {
      skill.innerHTML = skill.dataset.progress;
      skill.style.width = skill.dataset.progress;
    });
  }
};

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet"),
  //Select All Links
  allLinks = document.querySelectorAll(".landing-page a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span"),
  bulletsContainer = document.querySelector(".nav-bullets"),
  bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset").onclick = () => {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("back_option");
  localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu"),
  theLinks = document.querySelector(".links");

toggleBtn.onclick = function(e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  theLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== theLinks) {
    // Check If Menu Is Open
    if (theLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      theLinks.classList.toggle("open");
    }
  }
});

theLinks.onclick = function(e) {
  e.stopPropagation();
};