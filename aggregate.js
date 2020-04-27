//////////////////////
// HELPER FUNCTIONS //
//////////////////////

// Converts an object to an array, doesn't include object keys.
// Useful for arrayToDataTable function for google charts.
function convertObjectToArray(obj) {
    let result = [];
    Object.keys(obj).map(function (key) {
        result.push(obj[key]);
    })
    return result;
}

// Given the users object, will return an object with a count for each
// possibility of the given key.
// Used for getting totals.
function aggregateData(arr, key) {
    let data = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] in data) {
            data[arr[i][key]]++;
        } else {
            data[arr[i][key]] = 1;
        }
    }
    return data;
}


/////////////////////////
// AGGREGATE FUNCTIONS //
/////////////////////////

// Given users array
// Will return an array that can be converted to a datatable
// To plot genders per given grade
function generateGenderGradeArrayTable(users) {
    // Assumption:
    // index 0 is grade, 
    // index 1 is prefer_not_to_say count,
    // index 2 is female count,
    // index 3 is male count,
    // index 4 is non_binary count,
    // index 5 is third_gender count,
    // index 6 is other count
    let data = [
        ["k-8", 0, 0, 0, 0, 0, 0],
        ["9", 0, 0, 0, 0, 0, 0],
        ["10", 0, 0, 0, 0, 0, 0],
        ["11", 0, 0, 0, 0, 0, 0],
        ["12", 0, 0, 0, 0, 0, 0],
        ["undergraduate", 0, 0, 0, 0, 0, 0],
        ["other", 0, 0, 0, 0, 0, 0],
        ["na", 0, 0, 0, 0, 0, 0]
    ]

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[j][0] == users[i].grade && users[i].gender) {
                if (users[i].username.includes("prefer_not_to_say")) {
                    data[j][1]++;
                } else if (users[i].username.includes("female")) {
                    data[j][2]++;
                } else if (users[i].username.includes("male")) {
                    data[j][3]++;
                } else if (users[i].username.includes("non_binary")) {
                    data[j][4]++;
                } else if (users[i].username.includes("third_gender")) {
                    data[j][5]++;
                } else if (users[i].username.includes("other")) {
                    data[j][6]++;
                }
            }
        }
    }
    return data;
}

// Given the quiz array
// Will return an array that can be converted to a datatable
// Containing the question id, and the attempts it took to get it correct
// Also seperates based on gender

// possible improvements - Making it so the chart can graph different genders
function generateQuizAttemptGenderTable(quizData, gender) {
    // Assumption: 
    // First index is attempt count, 
    // second index is gender1 count, 
    // third index is gender2 count,
    // fourth index is question ID
    // Assumption: Any guesses more than 8 are 
    let data = [];
    let MAX_QUESTIONS = 22;
    for (let i = 0; i < MAX_QUESTIONS; i++) {
        data.push([i + 1, 0]); // question id, question attempt count
    }

    for (let i = 0; i < quizData.length; i++) {
        if (quizData[i].question_id <= MAX_QUESTIONS && quizData[i].user.includes(gender)) {
            data[quizData[i].question_id - 1][1] += quizData[i].attempts;
        }
    }
    return data;
}


// Given the quiz array
// Will return an array that can be converted to a datatable
// Containing the question id, and the attempts it took to get it correct