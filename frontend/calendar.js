let selectedType = "";
let selectedStatus = "";
let selectedRating = "";

const panel = document.querySelector(".calendar-panel");

const calendarUserId = localStorage.getItem("userId");

let allEntries = [];

let searchQuery = "";

async function loadEntries(){

   const response = await fetch(
    `${API_URL}/entries/${calendarUserId}`
);

    allEntries = await response.json();

    renderCalendar();
}

loadEntries();

const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectedDate =
    localStorage.getItem("selectedDate") ||
    `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

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
    const header = document.createElement("div");
    header.className = "calendar-header";

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "❮";
    prevBtn.className = "month-btn";

    const title = document.createElement("h2");
    title.innerText = `${monthNames[currentMonth]} ${currentYear}`;

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "❯";
    nextBtn.className = "month-btn";

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);

    card.appendChild(header);

        prevBtn.addEventListener("click", () => {

        currentMonth--;

        selectedDate =
            `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-01`;

        localStorage.setItem("selectedDate", selectedDate);

        if(currentMonth < 0){

            currentMonth = 11;
            currentYear--;

        }

        renderCalendar();

    });

    nextBtn.addEventListener("click", () => {

        currentMonth++;

        if(currentMonth > 11){

            currentMonth = 0;
            currentYear++;

        }

        renderCalendar();

    });

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

       const entriesForDay = allEntries.filter(entry =>
    entry.start_date.slice(0,10) === fullDate
);

if(entriesForDay.length > 0){

    const dots = document.createElement("div");
    dots.className = "entry-dots";

    entriesForDay.slice(0,3).forEach(entry=>{

        const dot = document.createElement("span");

        dot.classList.add("dot");

  switch(entry.media_type){

        case "Movie":
            dot.classList.add("dot-movie");
            break;

        case "Series":
            dot.classList.add("dot-series");
            break;

        case "Anime":
            dot.classList.add("dot-anime");
            break;

        case "Book":
            dot.classList.add("dot-book");
            break;

        case "Game":
            dot.classList.add("dot-game");
            break;

        default:
            dot.classList.add("dot-default");
            break;

}

        dots.appendChild(dot);

    });

    cell.appendChild(dots);

}

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

    const entriesBox=document.createElement("div");

    entriesBox.id="calendar-entries";

    card.appendChild(entriesBox);

    displayEntries();

}

function displayEntries(){

    const container = document.getElementById("calendar-entries");

    if(!container) return;

    container.innerHTML = "";

    container.scrollTop = 0;

    if(!selectedDate){

        container.innerHTML = "<p>Select a date.</p>";

        return;

    }

let filtered = allEntries.filter(entry => {

    const matchesSearch =
        !searchQuery ||

        entry.title.toLowerCase().includes(searchQuery) ||

        entry.media_type.toLowerCase().includes(searchQuery) ||

        entry.status.toLowerCase().includes(searchQuery);

    const matchesType =
        !selectedType ||
        entry.media_type === selectedType;

    const matchesStatus =
        !selectedStatus ||
        entry.status === selectedStatus;

    const matchesRating =
        !selectedRating ||
        entry.rating >= Number(selectedRating);

    const matchesDate =
        searchQuery ||
        entry.start_date.slice(0,10) === selectedDate;

    return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesRating &&
        matchesDate
    );

});

console.log(filtered);
console.log(searchQuery);

if(filtered.length === 0){

    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.overflowY = "hidden";

    container.innerHTML = `
        <div class="empty-search">
            🔎
            <p>No matching entries found.</p>
        </div>
    `;

    return;
}

container.style.display = "grid";
container.style.overflowY = "auto";

    filtered.forEach(entry=>{

        const div=document.createElement("div");

        div.className = "calendar-entry";

      div.innerHTML=`
        <h4>${entry.title}</h4>

        <p>${entry.media_type}</p>

        <p>${entry.status}</p>

        <p class="entry-rating">
            ${"⭐".repeat(Math.min(entry.rating,5))}
        </p>

        <div class="entry-actions">

            <button class="edit-btn">
                <img src="images/edit.svg" alt="Edit">
            </button>

            <button class="delete-btn">
                <img src="images/delete.svg" alt="Delete">
            </button>

        </div>
       `;

        container.appendChild(div);

        div.querySelector(".edit-btn").addEventListener("click", () => {

            localStorage.setItem("editEntryId", entry.id);

            window.location.href = "entry.html";

        });

div.querySelector(".delete-btn").addEventListener("click", async () => {

    if(!confirm("Delete this entry?")) return;

    await fetch(
        `${API_URL}/entries/${entry.id}`,
        {
            method: "DELETE"
        }
    );

    loadEntries();

});   

});   

}      

const calendarSearchInput = document.getElementById("search-input");

if (calendarSearchInput) {

    calendarSearchInput.addEventListener("input", (e) => {

        searchQuery = e.target.value.toLowerCase().trim();

        displayEntries();

    });

}

const typeFilter = document.getElementById("type-filter");
const statusFilter = document.getElementById("status-filter");
const ratingFilter = document.getElementById("rating-filter");

typeFilter.addEventListener("change", () => {

    selectedType = typeFilter.value;
    displayEntries();

});

statusFilter.addEventListener("change", () => {

    selectedStatus = statusFilter.value;
    displayEntries();

});

ratingFilter.addEventListener("change", () => {

    selectedRating = ratingFilter.value;
    displayEntries();

});

clearFilters.addEventListener("click", () => {

    selectedType = "";
    selectedStatus = "";
    selectedRating = "";

    typeFilter.value = "";
    statusFilter.value = "";
    ratingFilter.value = "";

    displayEntries();

});