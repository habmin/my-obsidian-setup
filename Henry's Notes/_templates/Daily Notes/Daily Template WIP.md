# Morning
<% tp.file.include("[[Morning Template]]") %>
<%*
const reader = new FileReader();
let result = await tp.file.exists(`Daily Todos\\${tp.date.yesterday("MM-DD-YYYY - ddd")}.md`);
if (result) {
	console.log(`Daily Todos\\${tp.date.yesterday("MM-DD-YYYY - ddd")}.md`);
	let yesterday = reader.readAsText(`Daily Todos\\${tp.date.yesterday("MM-DD-YYYY - ddd")}.md`);
	console.log(yesterday);
}
%>
# Professional
<% tp.file.include("[[Professional Template]]") %>
# Personal
<% tp.file.include("[[Personal Template]]") %>
# Evening
<% tp.file.include("[[Evening Template]]") %>
