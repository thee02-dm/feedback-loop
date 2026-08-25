const STORAGE_KEY = "feedbackLoop";


function loadData() {

    try {

        const savedData =
            localStorage.getItem(STORAGE_KEY);

        feedbackData =
            savedData
                ? JSON.parse(savedData)
                : [];

    } catch (error) {

        console.error(
            "Could not load feedback data:",
            error
        );

        feedbackData = [];

    }

}


function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(feedbackData)
        );

    } catch (error) {

        console.error(
            "Could not save feedback data:",
            error
        );

    }

}