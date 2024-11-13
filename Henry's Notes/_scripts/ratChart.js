// Used for creating labels for each day since beginning of Log
const startDate = moment("2024-08-22"); // First entry date
const endDate = moment(); // Current date

// Event log for Line Graph
const labels = [];
const data = [];

// Capture treatment event
let treatmentLines = {};
let treatmentLineCounter = 0;
let showLines = true;

// Data for room instance for pie chart
let roomData = {
    "Guest Room/Office": 0,
    "Living Room": 0,
    "Hallway": 0,
    "Kitchen": 0,
    "Bathroom": 0,
    "Bedroom": 0,
    "Building/Other": 0
}


// Initialize labels and data arrays
for (let date = startDate.clone(); date.isBefore(endDate); date.add(1, 'days')) {
    labels.push(date.format("YYYY-MM-DD"));
    data.push(0); // Initialize data points to 0
    // treatment.push(0)
}

// Function to increment data points for each entry
function incrementDataPoint(dateStr) {
    const index = labels.indexOf(dateStr);
    if (index !== -1) {
        data[index]++;
    }
}

// Create a chart.js annotation line from the treatment dates
function createTreatmentLine(dateStr) {
    treatmentLines[`line${treatmentLineCounter}`] = {
        type: 'line',
        xMin: dateStr,
        xMax: dateStr,
        borderColor: 'rgba(75, 192, 192, 0.7)',
        borderWidth: 5,
        label: {
            display: (ctx) => ctx.hovered,
            position: "end",
            content: dateStr,
            enabled: showLines,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            font: {
                size: 12
            }
        },
        // hover: {
        //     mode: 'near',
        //     intersect: true
        // },
        enter(ctx, event) {
            ctx.hovered = true;
            ctx.chart.update();
        },
        leave(ctx, event) {
            ctx.hovered = false;
            ctx.chart.update();
        }
    }
    treatmentLineCounter++;
}

const logEvents = dv.page("Personal/Rat Log.md").file.lists;

// Regexp to grab the date and Room in two different groups.
const eventRegex = /\*\*(\d{4}-\d{2}-\d{2}) - \d{1,2}:\d{2} [APM]{2} - ([\w\s\/]+)\*\*/;

logEvents.forEach(line => {
    const match = line.text.match(eventRegex);

    // Highlighted events mean an exterminator came for treatment
    // make a treatment line but do not contribute it to other datas.
    if (line.text.match(/^==/)) {
        createTreatmentLine(match[1]);
        return;
    }

    if (match && match[1] && match[2]) {
        if ([match[2]] in roomData) {
            roomData[match[2]]++;
        } else {
            console.log(`ERROR IN DATA: ${line}`);
            return;
        }
        incrementDataPoint(match[1]);
    } else {
        console.log(`ERROR IN DATA: ${line}`);
        return;
    }

    return;
})

// ******* Chart Rendering *******

// Custom/local plugin for different canvas backgrounds for graph
const canvasBG = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

const chartData = {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Rat Activity',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Treatment Done',
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hidden: false
        }
    ]},
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'YYYY-MM-DD'
                }
            }
        },
        plugins: {
            annotation: {
                annotations: treatmentLines,
            },
            customCanvasBackgroundColor: {
	            color: `rgba(
		            ${dv.current().file.frontmatter.bgRed},
		            ${dv.current().file.frontmatter.bgGreen},
		            ${dv.current().file.frontmatter.bgBlue},
		            ${dv.current().file.frontmatter.bgAlpha}
	            )`
            }
        },
    },
    plugins: [canvasBG]
};

const pieChart = {
    type: 'doughnut',
    data: {
        labels: Object.keys(roomData),
        datasets: [{
            label: 'Room Data',
            data: Object.values(roomData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // Add more colors as needed
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // Add more colors as needed
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '# of Occurances per Room Pie Chart'
            },
            customCanvasBackgroundColor: {
	            color: `rgba(
		            ${dv.current().file.frontmatter.bgRed},
		            ${dv.current().file.frontmatter.bgGreen},
		            ${dv.current().file.frontmatter.bgBlue},
		            ${dv.current().file.frontmatter.bgAlpha}
	            )`
            }
        }
    },
    plugins: [canvasBG]
}

window.renderChart(chartData, this.container);
window.renderChart(pieChart, this.container);
