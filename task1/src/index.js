import request from 'request';
import cheerio from 'cheerio';

request('http://www.newsru.com/', (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    $('.right-feed-item').each((i, element) => {
      const time = $(element).find('span').text().trim();
      const link = $(element).find('a');
      if (!time || !link.attr('title')) { return; }

      console.log(time, link.attr('title'));
    });
  }
});
