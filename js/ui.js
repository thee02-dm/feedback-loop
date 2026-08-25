/* =================================
   NAVIGATION
================================= */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(element => {

            element.classList.remove("active");

        });


    const pageElement =
        document.getElementById(
            `${page}Page`
        );


    if (pageElement) {

        pageElement.classList.add("active");

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    renderEverything();

}


/* =================================
   MODAL
================================= */

function openModal(id = null) {

    const modal =
        document.getElementById("modal");

    const form =
        document.getElementById("feedbackForm");


    modal.classList.add("show");


    if (id) {

        const item =
            feedbackData.find(
                feedback => feedback.id === id
            );


        if (!item) return;


        document.getElementById(
            "modalTitle"
        ).textContent = "Edit feedback";


        document.getElementById(
            "feedbackId"
        ).value = item.id;


        document.getElementById(
            "person"
        ).value = item.person;


        document.getElementById(
            "feedbackText"
        ).value = item.text;


        document.getElementById(
            "action"
        ).value = item.action || "";


        document.getElementById(
            "progress"
        ).value = item.progress;


        setCategory(item.category);

    } else {

        document.getElementById(
            "modalTitle"
        ).textContent = "Add feedback";


        form.reset();


        document.getElementById(
            "feedbackId"
        ).value = "";


        setCategory("Work");

    }

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");

}


/* =================================
   CATEGORY
================================= */

function setCategory(category) {

    document.getElementById(
        "category"
    ).value = category;


    document
        .querySelectorAll(".category-option")
        .forEach(option => {

            option.classList.toggle(
                "selected",
                option.dataset.category === category
            );

        });

}


function selectCategory(category) {

    setCategory(category);

}


/* =================================
   FILTER
================================= */

function filterFeedback(category) {

    currentFilter = category;


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });


    renderFeedback();

}


/* =================================
   STATS
================================= */

function renderStats() {

    const total =
        feedbackData.length;


    const active =
        feedbackData.filter(
            item =>
                item.action &&
                item.progress !== "Improved"
        ).length;


    const improved =
        feedbackData.filter(
            item =>
                item.progress === "Getting better" ||
                item.progress === "Improved"
        ).length;


    document.getElementById(
        "totalFeedback"
    ).textContent = total;


    document.getElementById(
        "activeGrowth"
    ).textContent = active;


    document.getElementById(
        "improvedCount"
    ).textContent = improved;

}


/* =================================
   AREAS
================================= */

function renderAreas() {

    const container =
        document.getElementById("areas");


    container.innerHTML =
        categories.map(category => {

            const count =
                feedbackData.filter(
                    item =>
                        item.category === category
                ).length;


            return `

                <div class="area">

                    <div class="area-name">
                        ${category}
                    </div>

                    <div class="area-count">
                        ${count}
                    </div>

                    <div class="area-label">
                        ${
                            count === 1
                                ? "piece of feedback"
                                : "pieces of feedback"
                        }
                    </div>

                </div>

            `;

        }).join("");

}


/* =================================
   GROWTH CARD
================================= */

function createGrowthCard(item) {

    const percentage =
        progressPercentages[item.progress] || 25;


    return `

        <div class="growth-card">

            <div class="growth-top">

                <div>

                    <div class="growth-title">

                        ${escapeHTML(
                            item.action ||
                            "Something to work on"
                        )}

                    </div>

                    <div class="growth-category">

                        ${escapeHTML(item.category)}
                        · from
                        ${escapeHTML(item.person)}

                    </div>

                </div>

            </div>


            <div class="progress-row">

                <div class="progress">

                    <div
                        class="progress-inner"
                        style="width:${percentage}%"
                    ></div>

                </div>


                <div class="progress-text">

                    ${escapeHTML(item.progress)}

                </div>

            </div>

        </div>

    `;

}


/* =================================
   HOME GROWTH
================================= */

function renderHomeGrowth() {

    const container =
        document.getElementById(
            "homeGrowth"
        );


    const items =
        feedbackData
            .filter(
                item =>
                    item.action &&
                    item.progress !== "Improved"
            )
            .slice(0, 3);


    if (!items.length) {

        container.innerHTML = `

            <div class="empty">

                <strong>
                    Nothing here yet.
                </strong>

                Add feedback and turn it
                into something you're
                working on.

            </div>

        `;

        return;

    }


    container.innerHTML =
        items
            .map(createGrowthCard)
            .join("");

}


/* =================================
   GROWTH PAGE
================================= */

function renderGrowth() {

    const container =
        document.getElementById(
            "growthList"
        );


    const items =
        feedbackData.filter(
            item => item.action
        );


    if (!items.length) {

        container.innerHTML = `

            <div class="empty">

                <strong>
                    Your growth starts here.
                </strong>

                Add feedback and choose
                something you'd like to
                improve.

            </div>

        `;

        return;

    }


    container.innerHTML =
        items
            .map(createGrowthCard)
            .join("");

}


/* =================================
   FEEDBACK CARD
================================= */

function createFeedbackCard(item) {

    const date =
        new Date(
            item.createdAt
        ).toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    return `

        <div class="feedback-card">

            <div class="feedback-meta">

                <span>

                    From

                    <strong>
                        ${escapeHTML(item.person)}
                    </strong>

                </span>

                <span>
                    ${date}
                </span>

            </div>


            <div
                class="feedback-meta"
                style="margin-top:8px;"
            >

                <span class="category">
                    ${escapeHTML(item.category)}
                </span>

            </div>


            <div class="feedback-quote">

                "${escapeHTML(item.text)}"

            </div>


            ${
                item.action
                    ? `

                    <div class="feedback-action">

                        <div class="action-label">
                            I'm working on
                        </div>

                        <div class="action-text">
                            ${escapeHTML(item.action)}
                        </div>

                    </div>

                    `
                    : ""
            }


            <div class="feedback-footer">

                <select
                    class="progress-select"
                    data-progress-id="${item.id}"
                >

                    <option
                        value="Just started"
                        ${
                            item.progress === "Just started"
                                ? "selected"
                                : ""
                        }
                    >
                        Just started
                    </option>


                    <option
                        value="Working on it"
                        ${
                            item.progress === "Working on it"
                                ? "selected"
                                : ""
                        }
                    >
                        Working on it
                    </option>


                    <option
                        value="Getting better"
                        ${
                            item.progress === "Getting better"
                                ? "selected"
                                : ""
                        }
                    >
                        Getting better
                    </option>


                    <option
                        value="Improved"
                        ${
                            item.progress === "Improved"
                                ? "selected"
                                : ""
                        }
                    >
                        Improved
                    </option>

                </select>


                <div class="card-actions">

                    <button
                        class="small-btn edit-btn"
                        data-id="${item.id}"
                    >
                        Edit
                    </button>


                    <button
                        class="small-btn delete-btn"
                        data-id="${item.id}"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =================================
   FEEDBACK LIST
================================= */

function renderFeedback() {

    const container =
        document.getElementById(
            "feedbackList"
        );


    let items =
        [...feedbackData];


    if (currentFilter !== "All") {

        items =
            items.filter(
                item =>
                    item.category === currentFilter
            );

    }


    if (!items.length) {

        container.innerHTML = `

            <div class="empty">

                <strong>
                    Nothing here yet.
                </strong>

                Capture a piece of feedback
                to start your loop.

            </div>

        `;

        return;

    }


    container.innerHTML =
        items
            .map(createFeedbackCard)
            .join("");

}


/* =================================
   RECENT
================================= */

function renderRecent() {

    const container =
        document.getElementById(
            "recentFeedback"
        );


    if (!feedbackData.length) {

        container.innerHTML = `

            <div class="empty">

                <strong>
                    Your first note will appear here.
                </strong>

                Start by capturing something
                someone has told you.

            </div>

        `;

        return;

    }


    container.innerHTML =
        createFeedbackCard(
            feedbackData[0]
        );

}


/* =================================
   ESCAPE HTML
================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =================================
   RENDER EVERYTHING
================================= */

function renderEverything() {

    renderStats();

    renderAreas();

    renderHomeGrowth();

    renderGrowth();

    renderFeedback();

    renderRecent();

}