const request = require('request');
const cheerio = require('cheerio');

const baseUrl = "https://github.com";
const url = "https://github.com/topics";

const getReposPageHtmlObj = require('./reposPage');

request(url, cb);

function cb(err, response, html) {

    if (err)
        console.log(err);

    else
        getTopicLink(html);
}

function getTopicLink(html) {

    let $ = cheerio.load(html);
    let anchorEleArr = $('.d-flex.flex-wrap.flex-justify-start.flex-items-stretch a');

    for (let anchorEle of anchorEleArr) {

        let href = $(anchorEle).attr('href');
        let topic = href.split("/").pop();
        let fullLink = baseUrl + href;

        // console.log(fullLink);

        getReposPageHtmlObj.getReposPageHtml(fullLink, topic);
    }
}