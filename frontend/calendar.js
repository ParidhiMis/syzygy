const panel = document.querySelector(".calendar-panel");

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectedDate = localStorage.getItem("selectedDate");

const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

function renderCalendar(){

    panel.innerHTML = "";

    const card = document.createElement("div");
    card.className = "calendar-card";

    panel.appendChild(card);

    // ---------- Month ----------
    const title = document.createElement("h2");
    title.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    card.appendChild(title);

    // ---------- Weekdays ----------
    const daysHeader = document.createElement("div");
    daysHeader.className = "days-header";

    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day=>{

        const d = document.createElement("div");
        d.innerText = day;
        daysHeader.appendChild(d);

    });

    card.appendChild(daysHeader);

    // ---------- Grid ----------
    const grid = document.createElement("div");
    grid.className = "calendar-grid";

    const firstDay = new Date(currentYear,currentMonth,1).getDay();
    const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();

    // Empty cells
    for(let i=0;i<firstDay;i++){

        const blank=document.createElement("div");
        blank.className="day";

        grid.appendChild(blank);

    }

    // Days
    for(let day=1;day<=daysInMonth;day++){

        const cell=document.createElement("div");

        cell.className="day";

        cell.innerText=day;

        const fullDate =
        `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        cell.dataset.date = fullDate;

        // Today
        if(
            day===today.getDate() &&
            currentMonth===today.getMonth() &&
            currentYear===today.getFullYear()
        ){

            cell.classList.add("today");

        }

        // Selected
        if(fullDate===selectedDate){

            cell.classList.add("selected");

        }

        cell.addEventListener("click",()=>{

            selectedDate = fullDate;

            localStorage.setItem("selectedDate",selectedDate);

            renderCalendar();

            displayEntries();

        });

        grid.appendChild(cell);

    }

    card.appendChild(grid);

}

renderCalendar();