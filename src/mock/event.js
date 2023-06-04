import {EVENT_TYPES, getRandomElementFromArray} from '../utils.js';
import {getRandomInt, getLoremIpsumSentences} from '../utils.js';
import EventModel from '../model/event.js';

const destinationsNames = [
  'London',
  'Paris',
  'Berlin',
  'Moscow',
  'Geneva'
];

export const offersList = [
  {
    id: 1,
    title: 'Upgrade to comfort class',
    price: 60
  },
  {
    id: 2,
    title: 'Upgrade to premium class',
    price: 120
  },
  {
    id: 3,
    title: 'Upgrade to comfort class',
    price: 60
  },
  {
    id: 4,
    title: 'Upgrade to premium class',
    price: 120
  },
  {
    id: 5,
    title: 'Upgrade to comfortable room',
    price: 200
  },
  {
    id: 6,
    title: 'Upgrade for spa treatments',
    price: 100
  }
];

export function getOffer(id) {
  for (let i = 0; i < offersList.length; i++) {
    if (offersList[i].id === id) {
      return offersList[i];
    }
  }
}

export const offersByType = [
  {
    type: 'train',
    offers: [getOffer(1), getOffer(2)]},
  {
    type: 'flight',
    offers: [getOffer(3), getOffer(4)]},
  {
    type: 'check-in',
    offers: [getOffer(5), getOffer(6)]}
];

function generatePictures() {
  const numberOfPictures = getRandomInt(1, 6);
  const pictures = new Array(numberOfPictures);
  for (let i = 0; i < pictures.length; i++) {
    pictures[i] = {
      src: `http://picsum.photos/248/152?r=${getRandomInt(0, Number.MAX_SAFE_INTEGER)}`,
      description: getLoremIpsumSentences(getRandomInt(1, 11))
    };
  }
  return pictures;
}

const destinations = [];
for (let i = 0; i < destinationsNames.length; i++) {
  destinations.push({
    id: i + 1,
    description: getLoremIpsumSentences(getRandomInt(1, 11)),
    name: destinationsNames[i],
    pictures: generatePictures()
  });
}

export function generateDate() {
  const currentDate = new Date();
  const dateTo = new Date(currentDate.getTime() + 1000 * 60 * 60 * getRandomInt(24, 96));
  const dateFrom = new Date(dateTo.getTime() - 1000 * 60 * 60 * getRandomInt(1, 12));
  return {
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString()
  };
}

export function generateEvents(numberOfEvents) {
  const events = [];
  for (let i = 0; i < numberOfEvents; i++) {
    const type = getRandomElementFromArray(EVENT_TYPES);
    const {dateFrom, dateTo} = generateDate();
    let availableOffers = [];
    for (let j = 0; j < offersByType.length; j++) {
      if (offersByType[j].type === type) {
        availableOffers = offersByType[j].offers;
        break;
      }
    }
    let idOffers;
    if (availableOffers.length) {
      idOffers = availableOffers.map((obj) => obj.id);
    } else {
      idOffers = undefined;
    }

    events.push(new EventModel(
      type,
      getRandomElementFromArray(destinations).id,
      dateFrom,
      dateTo,
      getRandomInt(500, 2000),
      idOffers
    ).getEvent);
  }
  return events;
}

export {destinations};
