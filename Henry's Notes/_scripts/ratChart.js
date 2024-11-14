// Theme Colors
const fontColorLight = 'rgba(0, 0, 0, 1)';
const fontColorDark = 'rgba(229, 229, 229, 1)';
const backgroundColorLight = 'rgba(238, 255, 230, 1)';
const backgroundColorDark = 'rgba(20, 24, 33, 1)';

// Line Graph
const line1ColorLight = 'rgba(255, 99, 132, 1)';
const line1ColorDark = 'rgba(255, 99, 132, 1)';
const line2ColorLight = 'rgba(75, 192, 192, 1)';
const line2ColorDark = 'rgba(75, 192, 192, 1)';
const gridColorLight = "rgba(0, 0, 0, 0.1)";
const gridColorDark = "rgba(229, 229, 229, 0.15)"

// Pie Chart
const pieChartColorsLight = [
	'rgba(92, 171, 169, 1)',    // Teal
	'rgba(164, 191, 127, 1)',   // Green
	'rgba(232, 170, 120, 1)',   // Orange
	'rgba(164, 139, 193, 1)',   // Light Purple
	'rgba(98, 157, 221, 1)',    // Blue
	'rgba(226, 145, 143, 1)',   // Salmon
	'rgba(165, 215, 215, 1)',   // Light Blue
];

const pieChartColorsDark = [
	'rgba(70, 130, 128, 1)',    // Teal
	'rgba(89, 136, 39, 1)',     // Green
	'rgba(219, 113, 32, 1)',    // Orange
	'rgba(145, 89, 206, 1)',    // Purple
	'rgba(71, 127, 224, 1)',    // Blue
	'rgba(229, 80, 80, 1)',     // Salmon
	'rgba(124, 43, 89, 1)',     // Magenta
];

// Used for creating labels for each day since beginning of Log
const startDate = moment("2024-08-22"); // First entry date
const endDate = moment(); // Current date

// Event log for Line Graph
const labels = [];
const data = [];

// Capture treatment event lines
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
            backgroundColor: dv.current().file.frontmatter.darkMode ? line2ColorDark : line2ColorLight,
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
            backgroundColor: dv.current().file.frontmatter.darkMode ? line1ColorDark : line1ColorLight,
            borderColor: dv.current().file.frontmatter.darkMode ? line1ColorDark : line1ColorLight,
            borderWidth: 1,
        },
        {
            label: 'Treatment Done',
            backgroundColor: dv.current().file.frontmatter.darkMode ? line2ColorDark : line2ColorLight,
            borderColor: dv.current().file.frontmatter.darkMode ? line2ColorDark : line2ColorLight,
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
                },
                ticks: {
                    color: dv.current().file.frontmatter.darkMode ? fontColorDark : fontColorLight
                },
                grid: {
                    color: dv.current().file.frontmatter.darkMode ? gridColorDark : gridColorLight
                }
            },
            y: {
                ticks: {
                    color: dv.current().file.frontmatter.darkMode ? fontColorDark : fontColorLight
                },
                grid: {
                    color: dv.current().file.frontmatter.darkMode ? gridColorDark : gridColorLight
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: dv.current().file.frontmatter.darkMode ? fontColorDark : fontColorLight
                }
            },
            annotation: {
                annotations: treatmentLines,
            },
            customCanvasBackgroundColor: {
	            color: dv.current().file.frontmatter.darkMode ? backgroundColorDark : backgroundColorLight
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
            backgroundColor: dv.current().file.frontmatter.darkMode ? pieChartColorsDark : pieChartColorsLight,
            borderColor: dv.current().file.frontmatter.darkMode ? pieChartColorsDark : pieChartColorsLight,
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: dv.current().file.frontmatter.darkMode ? fontColorDark : fontColorLight
                }
            },
            title: {
                display: true,
                text: '# of Occurences per Room Pie Chart',
                color: dv.current().file.frontmatter.darkMode ? fontColorDark : fontColorLight
            },
            customCanvasBackgroundColor: {
	            color: dv.current().file.frontmatter.darkMode ? backgroundColorDark : backgroundColorLight
            }
        }
    },
    plugins: [canvasBG]
}

window.renderChart(chartData, this.container);
window.renderChart(pieChart, this.container);
