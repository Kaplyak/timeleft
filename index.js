// Write a function that, on form submnit, 
// takes DoB and country and appends x number of colored squares (lived)
// and y number of gray squares (yet to live).

function loadOptions() {
    let arr = [];
    fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].country);
        }

        arr.sort();

        const select = document.getElementById('country');

        for (let i = 0; i < arr.length; i++) {
            let el = document.createElement('option');
            el.textContent = arr[i];
            el.value = arr[i];
            select.appendChild(el);
        }
    })

    
}

function timeleft(event) {
    event.preventDefault();
    const top = document.getElementById('top');
    const bottom = document.getElementById('bottom');
    top.classList.add('show');
    top.classList.remove('unshow');
    bottom.classList.add('show');
    bottom.classList.remove('unshow');
    document.getElementById('form').classList.add('unshow');
    // First, get form data.
    const dob = document.getElementById('dob').value;
    const country = document.getElementById('country').value;

    // Compare DoB against current time with Moment.js library.
    const elapsedDays = moment().diff(dob, "days");
    const elapsedWeeks = Math.round(elapsedDays / 7);

    // Show message: You have been born for X days. That's Y weeks.
    let el = document.createElement('p');
    el.textContent = `You have been alive for ${elapsedDays} days, or ${elapsedWeeks} weeks.`;
    top.appendChild(el);

    // Query the json file where data for all countries is.
    // Then, calculate lived weeks and weeks yet to live.
    fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        // Find user country, return life expectancy.
        for (let i = 0; i < data.length; i++) {
            if (country == data[i].country) {
                return data[i].expectancy;
            }
        }
    })

    // Append boxes.
    .then(expectancy => {
        const expectancyDays = Math.round(expectancy * 365);
        const expectancyWeeks = Math.round(expectancyDays / 7);
        console.log(`The average person in ${country} lives for ${expectancy} years, which is ${Math.round(expectancy * 365)} days, or ${Math.round(expectancy * 365 / 7)}.`)
        const boxes = document.getElementById('boxes');
        for (let i = 0; i < elapsedWeeks; i++) {
            let el = document.createElement('div');
            let randomColor = getColor();
            el.style.backgroundColor = randomColor;
            el.classList.add('lived-box');
            boxes.appendChild(el);
        }
        for (let i = 0; i < (expectancyWeeks - elapsedWeeks); i++) {
            let el = document.createElement('div');
            el.classList.add('yet-to-live-box');
            boxes.appendChild(el);
        }
        let el = document.createElement('p');
        el.textContent = `The average person in ${country} lives for ${expectancy} years, which is ${expectancyDays} days, or ${expectancyWeeks} weeks.`;
        top.appendChild(el);
        let el2 = document.createElement('p');
        el2.textContent = `In this graph, each colored box represents a week you have lived, and each gray box represents a week you have yet to live, until you reach the average life expectancy for your country.`;
        top.appendChild(el2);
        let el3 = document.createElement('p');
        el3.textContent = `You have ${expectancyWeeks - elapsedWeeks} weeks yet to live.`;
        top.appendChild(el3);
    })
}

function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (70 + 30 * Math.random()) + '%,' + 
               (60 + 10 * Math.random()) + '%)'
  }