const axios = require('axios');
const cheerio = require('cheerio');
const { request, response } = require('express');
const express = require("express");
const router = express.Router();

//Array with the newspapers information
const newspapersArray = [
    {
        name: 'Science News',
        address: 'https://www.sciencenews.org/topic/astronomy',
    },
    {
        name: 'Astronomy.com',
        address: 'https://www.astronomy.com/news',
    },
    {
        name: 'Space.com',
        address: 'https://www.space.com/science-astronomy',
    },
    {
        name: 'AirSpaceMag',
        address: 'https://www.airspacemag.com/category/space',
    }
]

const contentArray1 = [];
const contentArray2 = [];
const contentArray3 = [];
const contentArray4 = [];

//Loop to go through the newspaperArray
newspapersArray.forEach(element => {
    //Query to web scrape the information from the sciencenews website
    //Loop to get more than 1 page from the url
    for (var i = 1; i < 21; i++) {
        axios.get('https://www.sciencenews.org/topic/astronomy/page/' + i.toString())
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)

                //Webscrape
                $('.post-item-river__wrapper___2c_E-.with-image').each(function () {
                    const title = $(this).find('div > h3 > a').text().replace(/\s\s+/g, '');
                    const text = $(this).find('div > p').text().replace(/\s\s+/g, '');
                    const author = $(this).find('div > div > span > a').text();
                    const date = $(this).find('div > div > time').text();
                    const url = $(this).find('figure > a').attr('href');

                    //Populate the according array
                    contentArray1.push({
                        siteInformation: Object.values(newspapersArray)[0],
                        title,
                        text,
                        author,
                        date,
                        url
                    })
                });
            }).catch(error => window.alert("Error"));
    }

    //Query to web scrape the information from the sciencenews website
    axios.get('https://www.astronomy.com/news')
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            //Webscrape
            $('.dataSection').each(function () {
                const title = $(this).find('div > div >div > h2 > a').text()
                const data = $(this).find('div:first').text()
                const text = $(this).find('div > div > div > div').text().replace(/\s\s+/g, '')
                const url = $(this).find('div > div > div > h2 > a').attr('href')

                //Populate the according array
                if (title !== '') {
                    contentArray2.push({
                        siteInformation: Object.values(newspapersArray)[1],
                        title,
                        data,
                        text,
                        url: 'https://www.astronomy.com' + url
                    })
                }
            })
        }).catch(error => window.alert("Error"));

    //Query to web scrape the information from the sciencenews website
    axios.get('https://www.space.com/science-astronomy')
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            //Webscrape
            for (var i = 1; i < 51; i++) {
                $('.listingResult.small.result' + i.toString()).each(function () {
                    const title = $(this).find('a > article > div > header > h3').text().replace(/\s\s+/g, '')
                    const text = $(this).find('a > article > div > p').text().replace(/\n/g, '')
                    const author = $(this).find('a > article > div > header > p > span > span').text().replace(/\n+/g, '')
                    const date = $(this).find('a > article > div > header > p > time').text().replace(/\n+/g, '')
                    const url = $(this).find('a').attr('href')

                    //Populate the according array
                    if (title !== '') {
                        contentArray3.push({
                            siteInformation: Object.values(newspapersArray)[2],
                            title,
                            text,
                            author,
                            date,
                            url
                        })
                    }
                })
            }
        }).catch(error => window.alert("Error"));

    //Query to web scrape the information from the sciencenews website
    //Loop to get more than 1 page from the url
    for (var i = 1; i < 21; i++) {
        axios.get('https://www.airspacemag.com/category/space/?page=' + i.toString())
            .then(response => {
                const html = response.data
                const $ = cheerio.load(html)

                //Webscrape
                $('.article-teaser').each(function () {
                    const title = $(this).find('div > h3 > a').text().replace(/\s\s+/g)
                    const date = $(this).find('div > time').text().replace(/\s\s+/g)
                    const url = $(this).find('div > h3 > a').attr('href')

                    //Populate the according array
                    contentArray4.push({
                        siteInformation: Object.values(newspapersArray)[3],
                        title,
                        date,
                        url: 'www.airspacemag.com' + url
                    })
                })

            }).catch(error => window.alert("Error"));
    }
});

//HTTP requests
router.get('/sciencenews', (req, res) => {
    res.json(contentArray1);
})

router.get('/astronomy-com', (req, res) => {
    res.json(contentArray2);
})

router.get('/space-com', (req, res) => {
    res.json(contentArray3);
})

router.get('/airspacemag', (req, res) => {
    res.json(contentArray4)
})


module.exports = router;


