import AbstractView from '../framework/view/abstract-view.js';
import { POINTS_TYPE } from '../const';
import {formatToUpperCaseFirstLetter, formatDateToCalendarView} from '../utils';

function createEditingPointView(point, allDestinations) {
  const {basePrice, dateFrom, dateTo, destination, offers, allOffersThisType, type} = point;

  function getDestinationsList (){
    let destinationsList = '';
    for (let i = 0; i < allDestinations.length; i++) {
      destinationsList += `<option value="${allDestinations[i].name}"></option>`;
    }
    return destinationsList;
  }

  function getOffersList (){
    let offersList = '';
    for (let i = 0; i < allOffersThisType.length; i++) {
      const isChecked = !!offers.find((offer) => offer === allOffersThisType[i].id);
      offersList += `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden"
            id="${allOffersThisType[i].id}"
            type="checkbox"
            name="event-offer-comfort" ${isChecked ? 'Checked' : ''}
          >
          <label class="event__offer-label" for="${allOffersThisType[i].id}">
            <span class="event__offer-title">${allOffersThisType[i].title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${allOffersThisType[i].price}</span>
          </label>
        </div>
      `;
    }

    return offersList;
  }

  function getPointsCheckBoxes () {
    let pointsCheckBoxes = '';
    for (let i = 0; i < POINTS_TYPE.length; i++) {
      const checkBoxType = POINTS_TYPE[i];
      pointsCheckBoxes += `
        <div class="event__type-item">
            <input
              id="event-type-${checkBoxType}-1"
              class="event__type-input visually-hidden"
              type="radio"
              name="event-type"
              value="${checkBoxType}"
              ${point.type === checkBoxType ? ' checked' : ''}
            >
            <label
              class="event__type-label  event__type-label--${checkBoxType}"
              for="event-type-${checkBoxType}-1"
            >${formatToUpperCaseFirstLetter(checkBoxType)}
            </label>
        </div>
`;
    }
    return pointsCheckBoxes;
  }

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img
                        class="event__type-icon"
                        width="17"
                        height="17"
                        src="img/icons/${type}.png"
                        alt="Event type icon"
                      >
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${getPointsCheckBoxes()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${formatToUpperCaseFirstLetter(type)}
                    </label>
                    <input
                      class="event__input  event__input--destination"
                      id="event-destination-1"
                      type="text"
                      name="event-destination"
                      value="${destination.name}"
                      list="destination-list-1"
                    >
                    <datalist id="destination-list-1">
                      ${getDestinationsList()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-start-time-1"
                      type="text"
                      name="event-start-time"
                      value="${formatDateToCalendarView(dateFrom)}"
                    >
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input
                      class="event__input  event__input--time"
                      id="event-end-time-1"
                      type="text"
                      name="event-end-time"
                      value="${formatDateToCalendarView(dateTo)}"
                    >
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input
                      class="event__input  event__input--price"
                      id="event-price-1"
                      type="text"
                      name="event-price"
                      value="${basePrice}"
                    >
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${getOffersList()}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                  </section>
                </section>
              </form>
            </li>`;
}

export default class EditingPointView extends AbstractView{
  constructor({point}, allDestinations) {
    super();
    this.point = point;
    this.allDestinations = allDestinations;
  }

  get template() {
    return createEditingPointView(this.point, this.allDestinations);
  }

}
