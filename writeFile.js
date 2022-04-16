fs = require('fs');
fs.writeFile('filetitle.txt', 'file content is here', () => {
    console.log("File written");
})