import range from 'lodash/range';

const storyModel = require('./model').default('story');

Promise.all(range(10).map((item) => {
  return new Promise((response, reject) => {
    storyModel
      .add({ title: `Story ${item}`, text: 'Lorem  ipsum....' }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          response(data);
        }
      });
  });
})).then(() => {
  storyModel.list(data => console.log(data));
});
