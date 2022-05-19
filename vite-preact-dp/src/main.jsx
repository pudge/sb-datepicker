import { render } from "preact";
import { App } from "./app";
import "./index.scss";

const dateFormat = "_dateFormat";
const hoursFormat = "_hoursFormat";
const intervals = "_minutesIntervals";

class PreactDataPicker {
  constructor({
    oteContainer,
    defaultDateTime,
    hoursFormat,
    dateFormat,
    minutesIntervals,
  }) {
    this._oteContainer = oteContainer;
    this._selectedDate = new Date(defaultDateTime) || new Date();
    this[dateFormat] = dateFormat || "yyyy-MM-dd";
    this[hoursFormat] = hoursFormat || false;
    this[intervals] = minutesIntervals || 5;
    this._render();
  }

  _render = () =>
    render(
      <App
        selectedDate={this._selectedDate}
        selectDate={this._selectDate}
        dateFormat={this[dateFormat]}
        hoursFormat={this[hoursFormat]}
        timeIntervals={this[intervals]}
      />,
      this._oteContainer
    );

  _selectDate = (date) => {
    this._selectedDate = date;
    this._render();
  };

  get date() {
    return this._selectedDate;
  }

  get hours() {
    return this[hoursFormat];
  }
  /**
   * @param {string} format
   */
  set format(format) {
    this[dateFormat] = format;
    this._render();
  }

  /**
   * @param {any} format
   */
  set hours(format) {
    this[hoursFormat] = format;
    this._render();
  }

  destroy() {
    render(null, this._container, this._render());
  }
}

window.DatePicker = PreactDataPicker;
