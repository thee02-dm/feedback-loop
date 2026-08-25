/* =================================
   INITIALISE
================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadData();

        setupNavigation();

        setupModal();

        setupCategorySelection();

        setupFilters();

        setupFeedbackForm();

        setupFeedbackActions();

        renderEverything();

    }
);


/* =================================
   NAVIGATION EVENTS
================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showPage(
                        button.dataset.page
                    );

                }
            );

        });


    document
        .getElementById("viewGrowthBtn")
        .addEventListener(
            "click",
            () => {

                showPage("growth");

            }
        );

}


/* =================================
   MODAL EVENTS
================================= */

function setupModal() {

    document
        .getElementById("addFeedbackBtn")
        .addEventListener(
            "click",
            () => openModal()
        );


    document
        .getElementById("addFeedbackBtn2")
        .addEventListener(
            "click",
            () => openModal()
        );


    document
        .getElementById("closeModalBtn")
        .addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById("cancelModalBtn")
        .addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById("modal")
        .addEventListener(
            "click",
            event => {

                if (
                    event.target.id === "modal"
                ) {

                    closeModal();

                }

            }
        );

}


/* =================================
   CATEGORY EVENTS
================================= */

function setupCategorySelection() {

    document
        .querySelectorAll(".category-option")
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    selectCategory(
                        option.dataset.category
                    );

                }
            );

        });

}


/* =================================
   FILTER EVENTS
================================= */

function setupFilters() {

    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    filterFeedback(
                        button.dataset.filter
                    );

                }
            );

        });

}


/* =================================
   FORM SUBMISSION
================================= */

function setupFeedbackForm() {

    document
        .getElementById("feedbackForm")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();

                saveFeedback();

            }
        );

}


/* =================================
   SAVE FEEDBACK
================================= */

function saveFeedback() {

    const id =
        document.getElementById(
            "feedbackId"
        ).value;


    const existingItem =
        feedbackData.find(
            item => item.id === id
        );


    const item = {

        id:
            id ||
            Date.now().toString(),

        person:
            document.getElementById(
                "person"
            ).value.trim(),

        category:
            document.getElementById(
                "category"
            ).value,

        text:
            document.getElementById(
                "feedbackText"
            ).value.trim(),

        action:
            document.getElementById(
                "action"
            ).value.trim(),

        progress:
            document.getElementById(
                "progress"
            ).value,

        createdAt:
            existingItem
                ? existingItem.createdAt
                : new Date().toISOString()

    };


    if (id) {

        const index =
            feedbackData.findIndex(
                feedback =>
                    feedback.id === id
            );


        if (index !== -1) {

            feedbackData[index] = item;

        }

    } else {

        feedbackData.unshift(item);

    }


    saveData();

    closeModal();

    renderEverything();

}


/* =================================
   FEEDBACK ACTIONS
================================= */

function setupFeedbackActions() {

    document.addEventListener(
        "click",
        event => {

            const editButton =
                event.target.closest(
                    ".edit-btn"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-btn"
                );


            if (editButton) {

                openModal(
                    editButton.dataset.id
                );

            }


            if (deleteButton) {

                deleteFeedback(
                    deleteButton.dataset.id
                );

            }

        }
    );


    document.addEventListener(
        "change",
        event => {

            if (
                event.target.matches(
                    ".progress-select"
                )
            ) {

                updateProgress(
                    event.target.dataset.progressId,
                    event.target.value
                );

            }

        }
    );

}


/* =================================
   DELETE
================================= */

function deleteFeedback(id) {

    if (
        !confirm(
            "Delete this feedback?"
        )
    ) {
        return;
    }


    feedbackData =
        feedbackData.filter(
            item =>
                item.id !== id
        );


    saveData();

    renderEverything();

}


/* =================================
   UPDATE PROGRESS
================================= */

function updateProgress(
    id,
    value
) {

    const item =
        feedbackData.find(
            feedback =>
                feedback.id === id
        );


    if (!item) {
        return;
    }


    item.progress = value;

    saveData();

    renderEverything();

}