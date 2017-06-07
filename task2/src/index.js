import express from 'express';
import fetch from 'isomorphic-fetch';
import qs from 'qs';

const apiKey = process.env.APITRANSLATEKEY || '';
const server = express();

server.get('/translate/:text', (req, res) => {
  const text = req.params.text || 'привет';
  const request = qs
    .stringify({
      key: apiKey,
      lang: 'ru-en',
      text,
    });
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?${request}`)
    .then(data => data.json())
    .then(data => res.send(data.text.join('<br />')))
    .catch(err => console.error(err));
});

server.get('/translate', (req, res) => res.send('Введите текст для перевода. Например, /translate/какой то тект'));
server.all('/', (req, res) => res.send('Goto /translate/'));

server.listen(8080, () => { console.log('listen port 8080'); });
