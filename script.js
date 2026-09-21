const eventsContainer =
    document.getElementById(
        "eventsContainer"
    );

const emptyState =
    document.getElementById(
        "emptyState"
    );

const addEventButton =
    document.getElementById(
        "addEventButton"
    );

const emptyAddButton =
    document.getElementById(
        "emptyAddButton"
    );


const eventModal =
    document.getElementById(
        "eventModal"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const closeModalButton =
    document.getElementById(
        "closeModalButton"
    );

const cancelButton =
    document.getElementById(
        "cancelButton"
    );

const saveEventButton =
    document.getElementById(
        "saveEventButton"
    );


const eventNameInput =
    document.getElementById(
        "eventNameInput"
    );

const eventDateInput =
    document.getElementById(
        "eventDateInput"
    );

const eventTimeInput =
    document.getElementById(
        "eventTimeInput"
    );


let events = [];

let editingEventId = null;


/* =========================
   LOAD EVENTS
========================= */

function loadEvents() {

    const savedEvents =
        localStorage.getItem(
            "countdownEvents"
        );


    if (!savedEvents) {

        events = [];

        renderEvents();

        return;

    }


    try {

        events =
            JSON.parse(
                savedEvents
            );

    } catch (error) {

        console.error(
            error
        );

        events = [];

    }


    renderEvents();

}


/* =========================
   SAVE EVENTS
========================= */

function saveEvents() {

    localStorage.setItem(
        "countdownEvents",
        JSON.stringify(events)
    );

}


/* =========================
   CREATE ID
========================= */

function createId() {

    return (
        Date.now().toString() +
        "_" +
        Math.random()
            .toString(16)
            .slice(2)
    );

}


/* =========================
   ADD EVENT WINDOW
========================= */

function openAddEvent() {

    editingEventId = null;


    modalTitle.textContent =
        "Add Event";


    saveEventButton.textContent =
        "Add Event";


    eventNameInput.value =
        "";


    eventDateInput.value =
        "";


    eventTimeInput.value =
        "00:00";


    eventModal.classList.add(
        "show"
    );


    setTimeout(
        () => {

            eventNameInput.focus();

        },
        100
    );

}


/* =========================
   EDIT EVENT WINDOW
========================= */

function openEditEvent(id) {

    const event =
        events.find(
            item =>
                item.id === id
        );


    if (!event) {
        return;
    }


    editingEventId =
        id;


    modalTitle.textContent =
        "Edit Event";


    saveEventButton.textContent =
        "Save Changes";


    eventNameInput.value =
        event.name;


    eventDateInput.value =
        event.date;


    eventTimeInput.value =
        event.time;


    eventModal.classList.add(
        "show"
    );

}


/* =========================
   CLOSE WINDOW
========================= */

function closeEventModal() {

    eventModal.classList.remove(
        "show"
    );


    editingEventId =
        null;

}


/* =========================
   SAVE CURRENT EVENT
========================= */

function saveCurrentEvent() {

    const name =
        eventNameInput
            .value
            .trim();


    const date =
        eventDateInput.value;


    const time =
        eventTimeInput.value ||
        "00:00";


    if (!name) {

        alert(
            "Please enter an event name."
        );

        return;

    }


    if (!date) {

        alert(
            "Please choose an event date."
        );

        return;

    }


    const targetDate =
        new Date(
            `${date}T${time}`
        );


    if (
        isNaN(
            targetDate.getTime()
        )
    ) {

        alert(
            "Please enter a valid date."
        );

        return;

    }


    if (editingEventId) {

        const event =
            events.find(
                item =>
                    item.id ===
                    editingEventId
            );


        if (event) {

            event.name =
                name;

            event.date =
                date;

            event.time =
                time;

        }

    } else {

        events.push({

            id:
                createId(),

            name:
                name,

            date:
                date,

            time:
                time,

            createdAt:
                Date.now()

        });

    }


    saveEvents();

    renderEvents();

    closeEventModal();

}


/* =========================
   DELETE EVENT
========================= */

function deleteEvent(id) {

    const event =
        events.find(
            item =>
                item.id === id
        );


    if (!event) {
        return;
    }


    const shouldDelete =
        confirm(
            `Delete "${event.name}"?`
        );


    if (!shouldDelete) {
        return;
    }


    events =
        events.filter(
            item =>
                item.id !== id
        );


    saveEvents();

    renderEvents();

}


/* =========================
   ESCAPE TEXT
========================= */

function escapeHtml(text) {

    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        text;


    return element.innerHTML;

}


/* =========================
   FORMAT DATE
========================= */

function formatEventDate(
    date,
    time
) {

    const value =
        new Date(
            `${date}T${time}`
        );


    return value.toLocaleString(
        undefined,
        {
            weekday:
                "long",

            year:
                "numeric",

            month:
                "long",

            day:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"
        }
    );

}


/* =========================
   CREATE EVENT CARD
========================= */

function createEventCard(event) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "event-card";


    card.dataset.id =
        event.id;


    card.innerHTML = `

        <div class="event-top">

            <div>

                <h2 class="event-name">
                    ${escapeHtml(event.name)}
                </h2>

                <p class="event-date">
                    ${formatEventDate(
                        event.date,
                        event.time
                    )}
                </p>

            </div>


            <div class="event-actions">

                <button
                    class="icon-button edit-button"
                    title="Edit event"
                >
                    ✏️
                </button>

                <button
                    class="icon-button delete-button"
                    title="Delete event"
                >
                    🗑️
                </button>

            </div>

        </div>


        <div class="countdown countdown-area">

            <div class="time-box">

                <span class="time-value days">
                    00
                </span>

                <span class="time-label">
                    DAYS
                </span>

            </div>


            <div class="time-box">

                <span class="time-value hours">
                    00
                </span>

                <span class="time-label">
                    HOURS
                </span>

            </div>


            <div class="time-box">

                <span class="time-value minutes">
                    00
                </span>

                <span class="time-label">
                    MINUTES
                </span>

            </div>


            <div class="time-box">

                <span class="time-value seconds">
                    00
                </span>

                <span class="time-label">
                    SECONDS
                </span>

            </div>

        </div>


        <div class="finished-message">
            🎉 The event has started!
        </div>


        <div class="progress-wrapper">

            <div class="progress-info">

                <span>
                    Progress
                </span>

                <span class="progress-percent">
                    0%
                </span>

            </div>


            <div class="progress-background">

                <div class="progress-bar">
                </div>

            </div>

        </div>

    `;


    const editButton =
        card.querySelector(
            ".edit-button"
        );


    const deleteButton =
        card.querySelector(
            ".delete-button"
        );


    editButton.addEventListener(
        "click",
        () => {

            openEditEvent(
                event.id
            );

        }
    );


    deleteButton.addEventListener(
        "click",
        () => {

            deleteEvent(
                event.id
            );

        }
    );


    return card;

}


/* =========================
   RENDER EVENTS
========================= */

function renderEvents() {

    eventsContainer.innerHTML =
        "";


    if (
        events.length === 0
    ) {

        emptyState.classList.add(
            "show"
        );

        return;

    }


    emptyState.classList.remove(
        "show"
    );


    events.forEach(
        event => {

            const card =
                createEventCard(
                    event
                );


            eventsContainer.appendChild(
                card
            );

        }
    );


    updateAllCountdowns();

}


/* =========================
   PAD NUMBER
========================= */

function pad(value) {

    return String(
        value
    ).padStart(
        2,
        "0"
    );

}


/* =========================
   COUNTDOWNS
========================= */

function updateAllCountdowns() {

    const now =
        Date.now();


    events.forEach(
        event => {

            const card =
                eventsContainer
                    .querySelector(
                        `[data-id="${event.id}"]`
                    );


            if (!card) {
                return;
            }


            const target =
                new Date(
                    `${event.date}T${event.time}`
                ).getTime();


            let difference =
                target - now;


            const countdownArea =
                card.querySelector(
                    ".countdown-area"
                );


            const finishedMessage =
                card.querySelector(
                    ".finished-message"
                );


            const progressBar =
                card.querySelector(
                    ".progress-bar"
                );


            const progressPercent =
                card.querySelector(
                    ".progress-percent"
                );


            if (
                difference <= 0
            ) {

                countdownArea.style.display =
                    "none";


                finishedMessage.style.display =
                    "block";


                progressBar.style.width =
                    "100%";


                progressPercent.textContent =
                    "100%";


                return;

            }


            countdownArea.style.display =
                "grid";


            finishedMessage.style.display =
                "none";


            const days =
                Math.floor(
                    difference /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );


            difference %=
                (
                    1000 *
                    60 *
                    60 *
                    24
                );


            const hours =
                Math.floor(
                    difference /
                    (
                        1000 *
                        60 *
                        60
                    )
                );


            difference %=
                (
                    1000 *
                    60 *
                    60
                );


            const minutes =
                Math.floor(
                    difference /
                    (
                        1000 *
                        60
                    )
                );


            difference %=
                (
                    1000 *
                    60
                );


            const seconds =
                Math.floor(
                    difference /
                    1000
                );


            card.querySelector(
                ".days"
            ).textContent =
                pad(days);


            card.querySelector(
                ".hours"
            ).textContent =
                pad(hours);


            card.querySelector(
                ".minutes"
            ).textContent =
                pad(minutes);


            card.querySelector(
                ".seconds"
            ).textContent =
                pad(seconds);



            const createdAt =
                event.createdAt ||
                now;


            const totalTime =
                target -
                createdAt;


            const elapsedTime =
                now -
                createdAt;


            let percentage =
                totalTime > 0
                    ?
                    (
                        elapsedTime /
                        totalTime
                    ) * 100
                    :
                    100;


            percentage =
                Math.max(
                    0,
                    Math.min(
                        100,
                        percentage
                    )
                );


            progressBar.style.width =
                `${percentage}%`;


            progressPercent.textContent =
                `${Math.floor(
                    percentage
                )}%`;

        }
    );

}


/* =========================
   CLOCK
========================= */

const digitalClock =
    document.getElementById(
        "digitalClock"
    );


const dayName =
    document.getElementById(
        "dayName"
    );


const fullDate =
    document.getElementById(
        "fullDate"
    );


const hourHand =
    document.getElementById(
        "hourHand"
    );


const minuteHand =
    document.getElementById(
        "minuteHand"
    );


const secondHand =
    document.getElementById(
        "secondHand"
    );


function updateClock() {

    const now =
        new Date();


    const hours =
        now.getHours();


    const minutes =
        now.getMinutes();


    const seconds =
        now.getSeconds();


    digitalClock.textContent =
        `${pad(hours)}:` +
        `${pad(minutes)}:` +
        `${pad(seconds)}`;


    dayName.textContent =
        now.toLocaleDateString(
            undefined,
            {
                weekday:
                    "long"
            }
        );


    fullDate.textContent =
        now.toLocaleDateString(
            undefined,
            {
                year:
                    "numeric",

                month:
                    "long",

                day:
                    "numeric"
            }
        );


    const secondsDegree =
        seconds * 6;


    const minutesDegree =
        (
            minutes +
            seconds / 60
        ) * 6;


    const hoursDegree =
        (
            (
                hours % 12
            ) +
            minutes / 60
        ) * 30;


    secondHand.style.transform =
        `rotate(${secondsDegree}deg)`;


    minuteHand.style.transform =
        `rotate(${minutesDegree}deg)`;


    hourHand.style.transform =
        `rotate(${hoursDegree}deg)`;

}


/* =========================
   FOOTER YEAR
========================= */

const footerYear =
    document.getElementById(
        "footerYear"
    );


if (footerYear) {

    footerYear.textContent =
        new Date()
            .getFullYear();

}


/* =========================
   BUTTON EVENTS
========================= */

addEventButton.addEventListener(
    "click",
    openAddEvent
);


emptyAddButton.addEventListener(
    "click",
    openAddEvent
);


closeModalButton.addEventListener(
    "click",
    closeEventModal
);


cancelButton.addEventListener(
    "click",
    closeEventModal
);


saveEventButton.addEventListener(
    "click",
    saveCurrentEvent
);


eventModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            eventModal
        ) {

            closeEventModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeEventModal();

        }

    }
);


/* =========================
   START
========================= */

loadEvents();

updateClock();

updateAllCountdowns();


setInterval(
    updateClock,
    1000
);


setInterval(
    updateAllCountdowns,
    1000
);
