gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
const sections = document.querySelectorAll(".page-content__section");
const marquees = document.querySelectorAll(".marquee div");
let marqueeText = "";

const updateMarqueeText = () => {
  [...marquees].forEach((marquee) => {
    marquee.classList.add("active");
    marquee.addEventListener("transitionend", () => {
      marquee.classList.remove("active");
      marquee.innerText = `NO Frogs were harmed in the making of this app  🐸  Make something happen™ 🐸 `.repeat(20);
    });
  });
};

const updateBgColor = (color) =>
  document.documentElement.style.setProperty("--color-background", color);

const setActiveSection = (section) => {
  marqueeText = section.querySelector("h2").textContent;
  [...sections].forEach((section) => section.classList.remove("active"));
  section.classList.add("active");
  !prefersReducedMotion.matches && updateBgColor(section.dataset.bgColor);
  updateMarqueeText();
};

if (!prefersReducedMotion.matches) {
  gsap.to(".marquee div", {
    scrollTrigger: {
      trigger: ".page-content",
      scrub: 0.25,
      start: "top bottom",
      end: "bottom top",
      ease: "power2"
    },
    xPercent: -50
  });
}

gsap.utils.toArray(".page-content__section h2").forEach((heading) => {
  ScrollTrigger.create({
    trigger: heading,
    start: "top center",
    end: "bottom 200px",
    toggleActions: "play reset play reset",
    ease: "power2",
    onEnter: () =>
      marqueeText !== heading.textContent &&
      setActiveSection(heading.parentElement),
    onEnterBack: () =>
      marqueeText !== heading.textContent &&
      setActiveSection(heading.parentElement)
  });
});



// TO DO LOGIC

// Initialize the to-do list
let toDoList = [
    {
        title: 'Buy Oatmilk from ONF',
        description: 'Jan 05 2023',
        priority: 'Low',
        struckThrough: false
    },
    {
        title: 'Change Mercedes Breaks',
        description: 'Jan 09 2023',
        priority: 'High',
        struckThrough: false
    },
    {
      title: 'Pick up Tacos from XUMA’S',
      description: 'Jan 05 2023',
      priority: 'Med',
      struckThrough: false
    },
    {
      title: 'Run Cash to Bank',
      description: 'Jan 15 2023',
      priority: 'Low',
      struckThrough: false
    },
    {
      title: 'PAY STATE FRANCHISE TAXES',
      description: 'Feb 02 2023',
      priority: 'High',
      struckThrough: false
    },
    {
        title: 'Run Cash to Bank',
        description: 'Jan 15 2023',
        priority: 'Low',
        struckThrough: false
    },
    {
        title: 'SHOP Draco MALFOY Costume',
        description: 'Oct 15 2023',
        priority: 'High',
        struckThrough: false
    },
    {
        title: 'Invoice ALL Clients',
        description: 'Nov 31 2023',
        priority: 'Low',
        struckThrough: false
    }
  ];
  displayToDoList();
  
  // A function to add a new to-do item
  function addToDo(title, description, priority) {
    let newToDo = {
      title: title,
      description: description,
      priority: priority,
      struckThrough: false
    };
    toDoList.push(newToDo);
  }
  
  // Update the displayToDoList function to add the "strike-through" class
  // to the to-do item if its "struckThrough" property is true
  function displayToDoList() {
    let toDoListContainer = document.getElementById('to-do-list');
    toDoListContainer.innerHTML = ''; // Clear the previous to-do list
  
    for (let i = 0; i < toDoList.length; i++) {
      let toDo = toDoList[i];
      let className = 'to-do-item';
      if (toDo.struckThrough) {
        className += ' strike-through';
      }
      toDoListContainer.innerHTML += `
        <div class="${className}">
          <h3>${toDo.title}</h3>
          <p>${toDo.description}</p>
          <p class="priority-${toDo.priority}">${toDo.priority}</p>
        </div>
      `;
    }
  }
  
  // Add an event listener for the form submission
  let form = document.getElementById('add-to-do-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from being submitted
  
  // Get the values of the input fields
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let priority = document.getElementById('priority').value;
  
    // Add the new to-do item to the list
    addToDo(title, description, priority);
  
    // Display the updated to-do list
    displayToDoList();
  });
  
  
  // Add an event listener to each to-do item to toggle its "struckThrough" property
  let toDoItems = document.querySelectorAll('.to-do-item');
  for (let i = 0; i < toDoItems.length; i++) {
    let toDoItem = toDoItems[i];
    toDoItem.addEventListener('click', function(event) {
      let index = i;
      toDoList[index].struckThrough = !toDoList[index].struckThrough;
      displayToDoList();
    });
  }


// Typing quote

const text = document.getElementById("text");
let i = 0;
let interval = setInterval(function() {
  text.innerHTML += "If it's your job to eat a frog, it's best to do it first thing in the morning... And if it's your job to eat two frogs, it's best to eat the biggest one first.".charAt(i);
  i++;
  if (i >= "If it's your job to eat a frog, it's best to do it first thing in the morning... And if it's your job to eat two frogs, it's best to eat the biggest one first.".length) {
    clearInterval(interval);
  }
}, 65);

