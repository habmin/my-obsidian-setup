function convertTo24HourFormat(time) {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':');
    hours = hours.length === 1 ? `0${hours}` : hours;
    if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
    } else if (modifier === 'AM' && hours === '12') {
        hours = '00';
    }

    return `${hours}:${minutes}`;
}

console.log("Running ratLogToCSV.js");
// const { app } = params;
const file = app.vault.getAbstractFileByPath("Personal/Tenant Union/Rat Log.md");

if (!file) {
    return "File not found";
}

const fileContent = await app.vault.read(file);
const eventRegex = /\*\*(\d{4}-\d{2}-\d{2}) - (\d{1,2}:\d{2} [APM]{2}) - ([\w\s\/]+)\*\*: (.+)$/;
const lines = fileContent.split("\n");

const csvRows = ["id,date,room,description,treatment,activity,created_by\n"];
let counterID = 1;
lines.forEach(line => {

    const match = line.match(eventRegex);
    let csvLine = "";
    if (match) {
        const treatment = line.match(/^- ==/) ? "checked" : "";
        csvLine = `${counterID},${match[1]} ${convertTo24HourFormat(match[2])},${match[3]},"${match[4]}",${treatment},,Henry Baum\n`;
        csvRows.push(csvLine);
        counterID++;
    }
})
console.log(csvRows);
const csvBlob = new Blob(csvRows, { type: "text/csv" });
const url = URL.createObjectURL(csvBlob);
const a = document.createElement("a");
a.href = url;
a.download = "RatLog.csv";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
