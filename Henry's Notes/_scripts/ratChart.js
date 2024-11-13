<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@latest"></script>

const startDate = moment("2024-08-22"); // First entry date
const endDate = moment(); // Current date
const labels = [];
const data = [];
// const treatment = []
let treatmentLines = {};
let treatmentLineCounter = 0;
let showLines = true;

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

// function incrementTreatmentPoint(dateStr) {
//     const index = labels.indexOf(dateStr);
//     if (index !== -1) {
//         treatment[index]++;
//     }
// }

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

const activeFile = this.app.vault.getAbstractFileByPath("Personal/Rat Log.md");
const fileContent = await this.app.vault.read(activeFile);

// Split the content into lines
const lines = fileContent.split('\n');

let currentYear = null;
let currentMonth = null;
let currentDay = null;

// Process each line in the file
lines.forEach(line => {
    const yearMatch = line.match(/^# (\d{4})/);
    if (yearMatch) {
        currentYear = yearMatch[1];
        return;
    }

    const monthMatch = line.match(/^## (\w{3})/);
    if (monthMatch) {
        currentMonth = monthMatch[1];
        return;
    }

    const dayMatch = line.match(/^### (\d{1,2})/);
    if (dayMatch) {
        currentDay = dayMatch[1];
        return;
    }

    const treatmentMatch = line.match(/^- ==/);
    if (treatmentMatch) {
        const dateStr = moment(`${currentYear}-${currentMonth}-${currentDay}`, "YYYY-MMM-DD").format("YYYY-MM-DD");
        // incrementTreatmentPoint(dateStr);
        createTreatmentLine(dateStr);
        return;
    }

    if (currentYear && currentMonth && currentDay) {
        const dateStr = moment(`${currentYear}-${currentMonth}-${currentDay}`, "YYYY-MMM-DD").format("YYYY-MM-DD");
        incrementDataPoint(dateStr);
        return;
    }
});

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
        },
    }
};

window.renderChart(chartData, this.container);
