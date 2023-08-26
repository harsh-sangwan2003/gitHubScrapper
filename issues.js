const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');

const baseUrl = "https://github.com";

function getIssuesPageHTML(url, topic, repoName) {

    request(url, cb);

    function cb(err, response, html) {

        if (err)
            console.log(err);

        else
            getIssues(html);
    }

    function getIssues(html) {

        let $ = cheerio.load(html);
        let issuesEleArr = $('a[data-hovercard-type="issue"]');
        // console.log(issuesEleArr.length);

        let arr = [];
        for (let i = 0; i < issuesEleArr.length; i++) {

            let link = $(issuesEleArr[i]).attr('data-hovercard-url');
            arr.push(link);
        }

        console.log(topic, "       ", arr);

        let folderPath = path.join(__dirname, topic);
        dirCreator(folderPath);

        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);

        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();

        // fs.writeFileSync(filePath, text);
    }
}

function dirCreator(folderPath) {

    if (!fs.existsSync(folderPath)) {

        fs.mkdirSync(folderPath);
    }
}

module.exports = {

    getIssuesPageHTML
}