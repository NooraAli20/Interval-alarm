// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/easytimer.js/dist/easytimer.js":[function(require,module,exports) {
var define;
var global = arguments[3];
/**
 * easytimer.js
 * Generated: 2021-03-16
 * Version: 4.3.4
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.easytimer = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function leftPadding(string, padLength, character) {
    var i;
    var characters = '';
    string = typeof string === 'number' ? String(string) : string;

    if (string.length > padLength) {
      return string;
    }

    for (i = 0; i < padLength; i = i + 1) {
      characters += String(character);
    }

    return (characters + string).slice(-characters.length);
  }

  function TimeCounter() {
    this.reset();
  }
  /**
   * [toString convert the counted values on a string]
   * @param  {array} units           [array with the units to display]
   * @param  {string} separator       [separator of the units]
   * @param  {number} leftZeroPadding [number of zero padding]
   * @return {string}                 [result string]
   */


  TimeCounter.prototype.toString = function () {
    var units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['hours', 'minutes', 'seconds'];
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ':';
    var leftZeroPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    units = units || ['hours', 'minutes', 'seconds'];
    separator = separator || ':';
    leftZeroPadding = leftZeroPadding || 2;
    var arrayTime = [];
    var i;

    for (i = 0; i < units.length; i = i + 1) {
      if (this[units[i]] !== undefined) {
        if (units[i] === 'secondTenths') {
          arrayTime.push(this[units[i]]);
        } else {
          arrayTime.push(leftPadding(this[units[i]], leftZeroPadding, '0'));
        }
      }
    }

    return arrayTime.join(separator);
  };
  /**
   * [reset reset counter]
   */


  TimeCounter.prototype.reset = function () {
    this.secondTenths = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
  };

  function EventEmitter() {
    this.events = {};
  }

  EventEmitter.prototype.on = function (event, listener) {
    var _this = this;

    if (!Array.isArray(this.events[event])) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
    return function () {
      return _this.removeListener(event, listener);
    };
  };

  EventEmitter.prototype.removeListener = function (event, listener) {
    if (Array.isArray(this.events[event])) {
      var eventIndex = this.events[event].indexOf(listener);

      if (eventIndex > -1) {
        this.events[event].splice(eventIndex, 1);
      }
    }
  };

  EventEmitter.prototype.emit = function (event) {
    var _this2 = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (Array.isArray(this.events[event])) {
      this.events[event].forEach(function (listener) {
        return listener.apply(_this2, args);
      });
    }
  };

  /*
   * General functions, variables and constants
   */

  var SECOND_TENTHS_PER_SECOND = 10;
  var SECONDS_PER_MINUTE = 60;
  var MINUTES_PER_HOUR = 60;
  var HOURS_PER_DAY = 24;
  var SECOND_TENTHS_POSITION = 0;
  var SECONDS_POSITION = 1;
  var MINUTES_POSITION = 2;
  var HOURS_POSITION = 3;
  var DAYS_POSITION = 4;
  var SECOND_TENTHS = 'secondTenths';
  var SECONDS = 'seconds';
  var MINUTES = 'minutes';
  var HOURS = 'hours';
  var DAYS = 'days';
  var VALID_INPUT_VALUES = [SECOND_TENTHS, SECONDS, MINUTES, HOURS, DAYS];
  var unitsInMilliseconds = {
    secondTenths: 100,
    seconds: 1000,
    minutes: 60000,
    hours: 3600000,
    days: 86400000
  };
  var groupedUnits = {
    secondTenths: SECOND_TENTHS_PER_SECOND,
    seconds: SECONDS_PER_MINUTE,
    minutes: MINUTES_PER_HOUR,
    hours: HOURS_PER_DAY
  };

  function mod(number, module) {
    return (number % module + module) % module;
  }
  /**
   * [Timer Timer/Chronometer/Countdown compatible with AMD and NodeJS.
   * Can update time values with different time intervals: tenth of seconds,
   * seconds, minutes and hours.]
   */


  function Timer() {
    var defaultParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    /*
    * PRIVATE variables and Functions
    */
    var counters = new TimeCounter();
    var totalCounters = new TimeCounter();
    var intervalId;
    var eventEmitter = new EventEmitter();
    var running = false;
    var paused = false;
    var precision;
    var timerTypeFactor;
    var customCallback;
    var timerConfig = {};
    var currentParams;
    var targetValues;
    var startValues;
    var countdown;
    var startingDate;
    var targetDate;
    var eventData = {
      detail: {
        timer: this
      }
    };
    setParams(defaultParams);

    function updateCounters(precision, roundedValue) {
      var unitsPerGroup = groupedUnits[precision];
      totalCounters[precision] = roundedValue;

      if (precision === DAYS) {
        counters[precision] = Math.abs(roundedValue);
      } else if (roundedValue >= 0) {
        counters[precision] = mod(roundedValue, unitsPerGroup);
      } else {
        counters[precision] = mod(unitsPerGroup - mod(roundedValue, unitsPerGroup), unitsPerGroup);
      }
    }

    function updateDays(value) {
      return updateUnitByPrecision(value, DAYS);
    }

    function updateHours(value) {
      return updateUnitByPrecision(value, HOURS);
    }

    function updateMinutes(value) {
      return updateUnitByPrecision(value, MINUTES);
    }

    function updateSeconds(value) {
      return updateUnitByPrecision(value, SECONDS);
    }

    function updateSecondTenths(value) {
      return updateUnitByPrecision(value, SECOND_TENTHS);
    }

    function updateUnitByPrecision(value, precision) {
      var previousValue = totalCounters[precision];
      updateCounters(precision, calculateIntegerUnitQuotient(value, unitsInMilliseconds[precision]));
      return totalCounters[precision] !== previousValue;
    }

    function stopTimerAndResetCounters() {
      stopTimer();
      resetCounters();
    }

    function stopTimer() {
      clearInterval(intervalId);
      intervalId = undefined;
      running = false;
      paused = false;
    }

    function setParamsAndStartTimer(params) {
      if (!isPaused()) {
        setParams(params);
      } else {
        startingDate = calculateStartingDate();
        targetValues = setTarget(currentParams.target);
      }

      startTimer();
    }

    function startTimer() {
      var interval = unitsInMilliseconds[precision];

      if (isTargetAchieved(roundTimestamp(Date.now()))) {
        return;
      }

      intervalId = setInterval(updateTimerAndDispatchEvents, interval);
      running = true;
      paused = false;
    }

    function calculateStartingDate() {
      return roundTimestamp(Date.now()) - totalCounters.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
    }

    function updateTimerAndDispatchEvents() {
      var currentTime = roundTimestamp(Date.now());
      var valuesUpdated = updateTimer();
      dispatchEvents(valuesUpdated);
      customCallback(eventData.detail.timer);

      if (isTargetAchieved(currentTime)) {
        stop();
        dispatchEvent('targetAchieved', eventData);
      }
    }

    function updateTimer() {
      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : roundTimestamp(Date.now());
      var elapsedTime = timerTypeFactor > 0 ? currentTime - startingDate : startingDate - currentTime;
      var valuesUpdated = {};
      valuesUpdated[SECOND_TENTHS] = updateSecondTenths(elapsedTime);
      valuesUpdated[SECONDS] = updateSeconds(elapsedTime);
      valuesUpdated[MINUTES] = updateMinutes(elapsedTime);
      valuesUpdated[HOURS] = updateHours(elapsedTime);
      valuesUpdated[DAYS] = updateDays(elapsedTime);
      return valuesUpdated;
    }

    function roundTimestamp(timestamp) {
      return Math.floor(timestamp / unitsInMilliseconds[precision]) * unitsInMilliseconds[precision];
    }

    function dispatchEvents(valuesUpdated) {
      if (valuesUpdated[SECOND_TENTHS]) {
        dispatchEvent('secondTenthsUpdated', eventData);
      }

      if (valuesUpdated[SECONDS]) {
        dispatchEvent('secondsUpdated', eventData);
      }

      if (valuesUpdated[MINUTES]) {
        dispatchEvent('minutesUpdated', eventData);
      }

      if (valuesUpdated[HOURS]) {
        dispatchEvent('hoursUpdated', eventData);
      }

      if (valuesUpdated[DAYS]) {
        dispatchEvent('daysUpdated', eventData);
      }
    }

    function isTargetAchieved(currentDate) {
      return targetValues instanceof Array && currentDate >= targetDate;
    }

    function resetCounters() {
      counters.reset();
      totalCounters.reset();
    }

    function setParams(params) {
      params = params || {};
      precision = checkPrecision(params.precision);
      customCallback = typeof params.callback === 'function' ? params.callback : function () {};
      countdown = params.countdown === true;
      timerTypeFactor = countdown === true ? -1 : 1;

      if (_typeof(params.startValues) === 'object') {
        setStartValues(params.startValues);
      } else {
        startValues = null;
      }

      startingDate = calculateStartingDate();
      updateTimer();

      if (_typeof(params.target) === 'object') {
        targetValues = setTarget(params.target);
      } else if (countdown) {
        params.target = {
          seconds: 0
        };
        targetValues = setTarget(params.target);
      } else {
        targetValues = null;
      }

      timerConfig = {
        precision: precision,
        callback: customCallback,
        countdown: _typeof(params) === 'object' && params.countdown === true,
        target: targetValues,
        startValues: startValues
      };
      currentParams = params;
    }

    function checkPrecision(precision) {
      precision = typeof precision === 'string' ? precision : SECONDS;

      if (!isValidInputValue(precision)) {
        throw new Error("Error in precision parameter: ".concat(precision, " is not a valid value"));
      }

      return precision;
    }

    function isValidInputValue(value) {
      return VALID_INPUT_VALUES.indexOf(value) >= 0;
    }

    function configInputValues(inputValues) {
      var values;

      if (_typeof(inputValues) === 'object') {
        if (inputValues instanceof Array) {
          if (inputValues.length !== 5) {
            throw new Error('Array size not valid');
          }

          values = inputValues;
        } else {
          for (var value in inputValues) {
            if (VALID_INPUT_VALUES.indexOf(value) < 0) {
              throw new Error("Error in startValues or target parameter: ".concat(value, " is not a valid input value"));
            }
          }

          values = [inputValues.secondTenths || 0, inputValues.seconds || 0, inputValues.minutes || 0, inputValues.hours || 0, inputValues.days || 0];
        }
      }

      var secondTenths = values[SECOND_TENTHS_POSITION];
      var seconds = values[SECONDS_POSITION] + calculateIntegerUnitQuotient(secondTenths, SECOND_TENTHS_PER_SECOND);
      var minutes = values[MINUTES_POSITION] + calculateIntegerUnitQuotient(seconds, SECONDS_PER_MINUTE);
      var hours = values[HOURS_POSITION] + calculateIntegerUnitQuotient(minutes, MINUTES_PER_HOUR);
      var days = values[DAYS_POSITION] + calculateIntegerUnitQuotient(hours, HOURS_PER_DAY);
      values[SECOND_TENTHS_POSITION] = secondTenths % SECOND_TENTHS_PER_SECOND;
      values[SECONDS_POSITION] = seconds % SECONDS_PER_MINUTE;
      values[MINUTES_POSITION] = minutes % MINUTES_PER_HOUR;
      values[HOURS_POSITION] = hours % HOURS_PER_DAY;
      values[DAYS_POSITION] = days;
      return values;
    }

    function calculateIntegerUnitQuotient(unit, divisor) {
      var quotient = unit / divisor;
      return quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
    }

    function setTarget(inputTarget) {
      if (!inputTarget) {
        return;
      }

      targetValues = configInputValues(inputTarget);
      var targetCounter = calculateTotalCounterFromValues(targetValues);
      targetDate = startingDate + targetCounter.secondTenths * unitsInMilliseconds[SECOND_TENTHS] * timerTypeFactor;
      return targetValues;
    }

    function setStartValues(inputStartValues) {
      startValues = configInputValues(inputStartValues);
      counters.secondTenths = startValues[SECOND_TENTHS_POSITION];
      counters.seconds = startValues[SECONDS_POSITION];
      counters.minutes = startValues[MINUTES_POSITION];
      counters.hours = startValues[HOURS_POSITION];
      counters.days = startValues[DAYS_POSITION];
      totalCounters = calculateTotalCounterFromValues(startValues, totalCounters);
    }

    function calculateTotalCounterFromValues(values, outputCounter) {
      var total = outputCounter || {};
      total.days = values[DAYS_POSITION];
      total.hours = total.days * HOURS_PER_DAY + values[HOURS_POSITION];
      total.minutes = total.hours * MINUTES_PER_HOUR + values[MINUTES_POSITION];
      total.seconds = total.minutes * SECONDS_PER_MINUTE + values[SECONDS_POSITION];
      total.secondTenths = total.seconds * SECOND_TENTHS_PER_SECOND + values[[SECOND_TENTHS_POSITION]];
      return total;
    }
    /*
     * PUBLIC functions
     */

    /**
     * [stop stops the timer and resets the counters. Dispatch stopped event]
     */


    function stop() {
      stopTimerAndResetCounters();
      dispatchEvent('stopped', eventData);
    }
    /**
     * [stop stops and starts the timer. Dispatch stopped event]
     */


    function reset() {
      stopTimerAndResetCounters();
      setParamsAndStartTimer(currentParams);
      dispatchEvent('reset', eventData);
    }
    /**
     * [start starts the timer configured by the params object. Dispatch started event]
     * @param  {object} params [Configuration parameters]
     */


    function start() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      params = _objectSpread2(_objectSpread2({}, defaultParams), params);

      if (isRunning()) {
        return;
      }

      setParamsAndStartTimer(params);
      dispatchEvent('started', eventData);
    }
    /**
     * [pause stops the timer without resetting the counters. The timer it can be restarted with start function.
     * Dispatch paused event]
     * @return {type} [description]
     */


    function pause() {
      stopTimer();
      paused = true;
      dispatchEvent('paused', eventData);
    }
    /**
     * [addEventListener Adds event listener to the timer]
     * @param {string} eventType      [event to listen]
     * @param {function} listener   [the event listener function]
     */


    function addEventListener(eventType, listener) {
      eventEmitter.on(eventType, listener);
    }
    /**
     * [removeEventListener Removes event listener to the timer]
     * @param  {string} eventType    [event to remove listener]
     * @param  {function} listener [listener to remove]
     */


    function removeEventListener(eventType, listener) {
      eventEmitter.removeListener(eventType, listener);
    }
    /**
     * [dispatchEvent dispatches an event]
     * @param  {string} eventType [event to dispatch]
     * @param data
     */


    function dispatchEvent(eventType, data) {
      eventEmitter.emit(eventType, data);
    }
    /**
     * [isRunning return true if the timer is running]
     * @return {Boolean}
     */


    function isRunning() {
      return running;
    }
    /**
     * [isPaused returns true if the timer is paused]
     * @return {Boolean}
     */


    function isPaused() {
      return paused;
    }
    /**
     * [getTimeValues returns the counter with the current timer values]
     * @return {TimeCounter}
     */


    function getTimeValues() {
      return counters;
    }
    /**
     * [getTotalTimeValues returns the counter with the current timer total values]
     * @return {TimeCounter}
     */


    function getTotalTimeValues() {
      return totalCounters;
    }
    /**
     * [getConfig returns the configuration parameters]
     * @return {type}
     */


    function getConfig() {
      return timerConfig;
    }
    /**
     * Public API
     * Definition of Timer instance public functions
     */


    if (typeof this !== 'undefined') {
      this.start = start;
      this.pause = pause;
      this.stop = stop;
      this.reset = reset;
      this.isRunning = isRunning;
      this.isPaused = isPaused;
      this.getTimeValues = getTimeValues;
      this.getTotalTimeValues = getTotalTimeValues;
      this.getConfig = getConfig;
      this.addEventListener = addEventListener;
      this.on = addEventListener;
      this.removeEventListener = removeEventListener;
      this.off = removeEventListener;
    }
  }

  exports.Timer = Timer;
  exports.default = Timer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],"TS-module/analogClock.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toWords = exports.analogClock = exports.globalAnalogTimerVariable = void 0;
var radius = 6;
var resetTimer = false;
exports.globalAnalogTimerVariable = 0;
var a = ['noll', 'en ', 'två ', 'tre ', 'fyra ', 'fem ', 'sex ', 'sju ', 'åtta ', 'nio ', 'tio ', 'elva ', 'tolv ', 'tretton ', 'fjorton ', 'femton ', 'sexton ', 'sjutton ', 'arton ', 'nitton '];
var b = ['tjugo', 'trettio', 'fyrtio', 'femtio'];
document.addEventListener("DOMContentLoaded", function (event) {
  var clockMarks = document.querySelector('.clock__marks');

  for (var index = 0; index < 60; index++) {
    var li = document.createElement("li");
    clockMarks.appendChild(li);
  }
});

var analogClock = function analogClock(timer, timeInMinutes) {
  var secondElm = document.querySelector('.clock__hand--second');
  var minuteElm = document.querySelector('.clock__hand--minute');
  var talTillOrd = document.querySelector('#talTillOrd'); //timer.start({countdown: true, startValues: {seconds: timeInMinutes * 60 }});

  timer.addEventListener('secondsUpdated', function (e) {
    //console.log( timer.getTimeValues().minutes, timer.getTimeValues().seconds);
    var minutes = timer.getTimeValues().minutes;
    var seconds = timer.getTimeValues().seconds;
    var secondsFraction = seconds / 60;
    var minutesFraction = (secondsFraction + minutes) / 60;
    var secondsRotate = secondsFraction * 360;
    var minutesRotate = minutesFraction * 360;
    secondElm.style.transform = "rotate(" + secondsRotate + "deg)";
    minuteElm.style.transform = "rotate(" + minutesRotate + "deg)";
    talTillOrd.innerText = (exports.toWords(timer.getTimeValues().minutes) + " minuter och " + exports.toWords(timer.getTimeValues().seconds) + " sekunder kvar").toUpperCase();
  });
};

exports.analogClock = analogClock;

var toWords = function toWords(num) {
  if (num < 20) return a[num];
  var digit = num % 10;
  if (num < 100) return b[~~(num / 10) - 2] + (digit ? "" + a[digit] : "");
};

exports.toWords = toWords;
},{}],"TS-module/startcountdown.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startCountdown = exports.timer = void 0;

var easytimer_js_1 = require("easytimer.js");

var analogClock_1 = require("./analogClock");

var timer = new easytimer_js_1.Timer();
exports.timer = timer;
var pauseTimer = new easytimer_js_1.Timer();
var digitalTimer = document.querySelector('#digitalTime');
var abortBtn = document.querySelector('#stop');
var formBG = document.querySelector('form'); // Start countdown on click, with times in seconds from form as arguments

var startCountdown = function startCountdown(timeInSeconds, intervalOn, addBreak) {
  timer.start({
    countdown: true,
    startValues: {
      seconds: timeInSeconds
    },
    target: {
      seconds: 0
    }
  });
  analogClock_1.analogClock(timer, timeInSeconds);
  pauseTimer.start({
    countdown: true,
    startValues: {
      seconds: 50
    },
    target: {
      seconds: 0
    }
  });
  pauseTimer.pause();
  var countdownNumber = timeInSeconds;
  var label = document.querySelector('#progbar');
  timer.on('secondsUpdated', function () {
    var circleNumber;
    var procent = countdownNumber / timeInSeconds * 100; //console.log('timer values: ', timer.getTimeValues().seconds, 'procent: ', procent);

    label.style.height = procent + "vh";
    var division = procent / 11;
    circleNumber = parseInt(division) + 1;
    var circle = document.querySelector(".circle" + circleNumber); //console.log(’ rad 35 ’, ‘Circlenumber ‘, circleNumber, circle );
    //circle.style.backgroundColor =`#999999`;

    countdownNumber--; //console.log('timer1 **', countdownNumber--);
    //console.log('modulus', countdownNumber % 60);

    var seconds = countdownNumber % 60;
    var minutesFloat = countdownNumber / 60;
    var minutes = parseInt(minutesFloat);

    if (minutes < 10 && seconds < 10) {
      digitalTimer.innerText = "0" + minutes + " : 0" + seconds;
    } else if (minutes < 10 && seconds > 10) {
      digitalTimer.innerText = "0" + minutes + " : " + seconds;
    } else if (minutes > 10 && seconds < 10) {
      digitalTimer.innerText = minutes + ": 0" + seconds;
    } else {
      digitalTimer.innerText = minutes + ": " + seconds;
    }
  }); //If intervals is checked, restart timer after first interval ends, else stop timer

  timer.on('targetAchieved', function () {
    // console.log('timer1 ',"time's up!");
    countdownNumber = timeInSeconds;

    if (intervalOn && addBreak) {
      timer.pause();
      pauseTimer.reset();
      loadPausePage();
    } else if (intervalOn && !addBreak) {
      timer.reset();
      loadPausePage();
    } else {
      timer.stop(); // get reference to the alarmView element

      var alarmView = document.querySelector('#alarmRinging');
      alarmView.style.display = "flex";
      divToRenderInCustomFunction(alarmView);
    }
  });
  pauseTimer.on('secondsUpdated', function () {//console.log('paus');
  });
  pauseTimer.on('targetAchieved', function () {
    pauseTimer.pause();
    pauseTimer.reset();
    pauseTimer.stop();
    timer.reset(); //console.log('pause over'); 
  });
  abortBtn.addEventListener('click', function () {
    //console.log('timer stoppad', timer.isRunning());
    timer.stop(); //console.log('timer stoppad', timer.isRunning());
  });
};

exports.startCountdown = startCountdown; //Export the entire timer object and the startcountdown function
// function to clear divToRenderIn

var divToRenderInCustomFunction = function divToRenderInCustomFunction(childToAppend) {
  // get a reference to the div to render in 
  var divToRenderIn = document.querySelector('#divToRenderIn'); // clear it of all the contents i.e divToRenderIn

  var divToRenderInChildren = Array.from(divToRenderIn.children);
  divToRenderInChildren.forEach(function (child) {
    child !== document.querySelector('#menuToggle') ? divToRenderIn.removeChild(child) : null;
  }); // render the alarmView in the divToRenderIn element

  divToRenderIn.appendChild(childToAppend);
};

var loadPausePage = function loadPausePage() {
  var breakPage = document.querySelector('#break-page');
  divToRenderInCustomFunction(breakPage);
};
},{"easytimer.js":"../node_modules/easytimer.js/dist/easytimer.js","./analogClock":"TS-module/analogClock.ts"}],"TS-module/navigation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exportNav = function exportNav() {
  var divToRenderIn = document.querySelector('#divToRenderIn');
  var abortButton = document.querySelector('#stop');
  var linkData = [{
    ref: document.querySelector('#analogClock'),
    textLabel: 'ANALOG TIMER'
  }, {
    ref: document.querySelector('#digital-timer'),
    textLabel: 'DIGITAL TIMER'
  }, {
    ref: document.querySelector('#visual-page'),
    textLabel: 'VISUAL TIMER'
  }, {
    ref: document.querySelector('#talTillOrd'),
    textLabel: 'TEXT TIMER'
  }, {
    ref: document.querySelector('#circles'),
    textLabel: 'CIRCLE TIMER'
  }];
  var div = document.createElement('div');
  div.id = "menuToggle"; //const label : HTMLLabelElement = document.createElement('label');
  //const span : HTMLSpanElement = document.createElement('span');

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox'; //label.appendChild(checkbox);
  //label.appendChild(span);
  //console.log(label);

  div.appendChild(checkbox);

  for (var index = 0; index < 3; index++) {
    var span = document.createElement('span');
    div.append(span);
  }

  var ul = document.createElement('ul');
  ul.id = "NavBar";

  var _loop_1 = function _loop_1(i) {
    var a = document.createElement('a');
    var li = document.createElement('li');
    a.href = "#"; //console.log(object)

    a.addEventListener('click', function () {
      var divToRenderInChildren = Array.from(divToRenderIn.children);
      divToRenderInChildren.forEach(function (child) {
        child !== document.querySelector('#menuToggle') ? divToRenderIn.removeChild(child) : null;
      });
      divToRenderIn.appendChild(linkData[i].ref);
      abortButton.style.display = "flex";
    });
    li.textContent = "" + linkData[i].textLabel;
    a.appendChild(li);
    ul.appendChild(a);
  };

  for (var i = 0; i < linkData.length; i++) {
    _loop_1(i);
  }

  div.appendChild(ul);
  return div;
};

exports.default = exportNav;
},{}],"TS-module/startCount.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartCountDown = exports.timer = void 0;

var easytimer_js_1 = require("easytimer.js");

var navigation_1 = __importDefault(require("../TS-module/navigation"));

var initSeconds = 0;
var digitalTimer = document.querySelector('#digitalTime');
var breakPage = document.querySelector('#break-page'); // Word Clock references

var talTillOrd = document.querySelector('#talTillOrd'); // AnalogClock HTML references

var secondElm = document.querySelector('.clock__hand--second');
var minuteElm = document.querySelector('.clock__hand--minute'); // Visual HTML reference

var visualPageInnerDiv = document.querySelector('#visual-page').querySelector('#progbar'); // Circles HTML reference

var circlesDiv = document.querySelector('#circles'); // create a new instance of EasyTimer

exports.timer = new easytimer_js_1.Timer();

var StartCountDown = function StartCountDown(numberOfSeconds, allowIntervals, allowFiveMinutesIntervals) {
  initSeconds = numberOfSeconds; // Init the analog and circle pages

  initAnalogClock(); // Start the timer in count down mode

  exports.timer.start({
    countdown: true,
    startValues: {
      seconds: numberOfSeconds
    }
  });
  var divCircles = null;
  var zIndexCounter = 0; // 1. Run this method everytime the seconds change or get updated

  exports.timer.addEventListener('secondsUpdated', function (e) {
    var minutesAndSeconds = exports.timer.getTimeValues().minutes + ":" + exports.timer.getTimeValues().seconds; //console.log(minutesAndSeconds);
    // Update the digital timer section

    digitalTimer.innerHTML = "<section id=\"timer-digital\"> \n                                        " + minutesAndSeconds + "\n                                    </section>"; // update visual-page

    visualPageInnerDiv.style.height = exports.timer.getTimeValues().seconds * 100 / numberOfSeconds + "vh";
    var minutesRadiusPercentage = exports.timer.getTimeValues().seconds * 100 / numberOfSeconds;
    var divToAdd = document.createElement('div'); //divToAdd.style.width("shape-outside", `circle(${minutesRadiusPercentage}% at 0%)`);

    divToAdd.style.border = "3px solid black";
    divToAdd.style.borderRadius = "50%";
    divToAdd.style.backgroundColor = "white";
    divToAdd.style.borderRadius = "100%";
    divToAdd.style.width = minutesAndSeconds + "px";
    divToAdd.style.height = minutesAndSeconds + "px";
    divToAdd.style.zIndex = "" + zIndexCounter++;
    circlesDiv.appendChild(divToAdd); // Update the analog clock

    updateAnalogClock(); // update numbers to words section

    talTillOrd.innerText = (toWords(exports.timer.getTimeValues().minutes) + " minuter \noch " + toWords(exports.timer.getTimeValues().seconds) + " \nsekunder \nkvar").toUpperCase(); // If the intervals are checked

    if (allowIntervals && !allowFiveMinutesIntervals) {
      if (exports.timer.getTimeValues().seconds === 0) {
        // Render the break page section 
        deRenderDivToRenderIn(breakPage, false);
      }
    } // If allow intervals is true and allow-5-break-intervals is true
    else if (allowIntervals && allowFiveMinutesIntervals) {
        if (exports.timer.getTimeValues().seconds === 0) {
          // render the break page section
          deRenderDivToRenderIn(breakPage, false);
          exports.timer.stop();
          exports.timer.start({
            countdown: true,
            startValues: {
              seconds: 5 * 60
            }
          }); // get a reference to the break-count-down paragraph in the break-view section

          var breakCountDown_1 = document.querySelector("#break-countdown");
          exports.timer.addEventListener('secondsUpdated', function () {
            breakCountDown_1.innerText = exports.timer.getTimeValues().minutes + ":" + exports.timer.getTimeValues().seconds;
          });
        }
      }
  }); // 2. Run this method everytime the timer runs up

  exports.timer.addEventListener('targetAchieved', function (e) {
    if (!allowIntervals && !allowFiveMinutesIntervals) {
      var alarmRinging = document.querySelector('#alarmRinging');
      exports.timer.stop();
      deRenderDivToRenderIn(alarmRinging, false);
    }
  });
  exports.timer.addEventListener('minutesUpdated', function (e) {// Update circles-page
    //let minutesRadiusPercentage =  ((timer.getTimeValues().minutes * 100) / (numberOfSeconds / 60));
    //const divToAdd = document.createElement('div');
    //divToAdd.setAttribute("shape-outside", `circle(${minutesRadiusPercentage})`);
    //circlesDiv.appendChild(divToAdd);
  });
};

exports.StartCountDown = StartCountDown;

var initAnalogClock = function initAnalogClock() {
  var clockMarks = document.querySelector('.clock__marks');

  for (var index = 0; index < 60; index++) {
    var li = document.createElement("li");
    clockMarks.appendChild(li);
  }
};

var updateAnalogClock = function updateAnalogClock() {
  var minutes = exports.timer.getTimeValues().minutes;
  var seconds = exports.timer.getTimeValues().seconds;
  var secondsFraction = seconds / 60;
  var minutesFraction = (secondsFraction + minutes) / 60;
  var secondsRotate = secondsFraction * 360;
  var minutesRotate = minutesFraction * 360;
  secondElm.style.transform = "rotate(" + secondsRotate + "deg)";
  minuteElm.style.transform = "rotate(" + minutesRotate + "deg)";
};

var toWords = function toWords(num) {
  var a = ['noll', 'en ', 'två ', 'tre ', 'fyra ', 'fem ', 'sex ', 'sju ', 'åtta ', 'nio ', 'tio ', 'elva ', 'tolv ', 'tretton ', 'fjorton ', 'femton ', 'sexton ', 'sjutton ', 'arton ', 'nitton '];
  var b = ['tjugo', 'trettio', 'fyrtio', 'femtio'];
  if (num < 20) return a[num];
  var digit = num % 10;
  if (num < 100) return b[~~(num / 10) - 2] + (digit ? "" + a[digit] : "");
};

var deRenderDivToRenderIn = function deRenderDivToRenderIn(htmElement, setNav) {
  var divToRenderIn = document.querySelector('#divToRenderIn');
  var holderDiv = document.querySelector('#holderDiv');
  var divToRenderInChildren = Array.from(divToRenderIn.children);
  divToRenderInChildren.forEach(function (child) {
    if (child !== document.querySelector('#menuToggle')) {
      var childRef = child;
      divToRenderIn.removeChild(child);
      holderDiv.appendChild(childRef);
    }
  });
  if (setNav) divToRenderIn.appendChild(navigation_1.default());
  divToRenderIn.appendChild(htmElement);
};
},{"easytimer.js":"../node_modules/easytimer.js/dist/easytimer.js","../TS-module/navigation":"TS-module/navigation.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeObject = void 0;

var startcountdown_1 = require("./TS-module/startcountdown");

var navigation_1 = __importDefault(require("../src/TS-module/navigation"));

var startCount_1 = require("../src/TS-module/startCount");

var setTimerForm = document.querySelector('#set-timer-form'); //console.log(setTimerForm);

var timeAmountText = document.getElementById('set-time-length');
var timeAmount = 10;
var totalTimeInSeconds;
var increaseBtn = document.querySelector('#increase');
var decreaseBtn = document.querySelector('#decrease');
var intervalChecked = document.querySelector('#intervals-check');
var breakChecked = document.querySelector('#break-check');
var divToRenderIn = document.querySelector('#divToRenderIn');
var setTimerFormSection = document.querySelector('#setTimeFormSection');
var analogClockDiv = document.querySelector('#analogClock');
var startTimerButton = document.querySelector('#startTimerBtn');
var startDiv = document.querySelector('#app');
var abortButton = document.querySelector('#stop');
var backToTimer = document.querySelector('#Back2Timer');
var breakPage = document.querySelector('#break-page');
var breakPageButton = document.querySelector('#break-page');
var breakPagePauseButton = document.querySelector('#pause');
divToRenderIn.appendChild(startDiv);
/* get a reference to the menu div in the html page */
// populate the above div with the ul list thats been created dynamically with exportNav

var deRenderDivToRenderIn = function deRenderDivToRenderIn(htmElement, setNav) {
  var holderDiv = document.querySelector('#holderDiv');
  var divToRenderInChildren = Array.from(divToRenderIn.children);
  divToRenderInChildren.forEach(function (child) {
    if (child !== document.querySelector('#menuToggle')) {
      var childRef = child;
      divToRenderIn.removeChild(child);
      holderDiv.appendChild(childRef);
    }
  });
  if (setNav) divToRenderIn.appendChild(navigation_1.default());
  divToRenderIn.appendChild(htmElement);
};

var startImage = document.querySelector('#startImage');
startImage.addEventListener('click', function () {
  deRenderDivToRenderIn(setTimerForm, false);
}); //startTimerButton.addEventListener('click', () => {
// deRenderDivToRenderIn(analogClockDiv, true);
//analogClock(timer, timeAmount);
//   abortButton.style.display = "flex"
//});

abortButton.addEventListener('click', function () {
  // stop the timer
  startCount_1.timer.stop(); // Render to a set Timer form

  deRenderDivToRenderIn(setTimerForm, false); // Incognitize the abort Button once again

  abortButton.style.display = "none";
});
var timeObject;
exports.timeObject = timeObject;
var timeHeader = document.createElement('h1');
timeHeader.innerText = "" + timeAmount;
timeAmountText.insertBefore(timeHeader, increaseBtn);

var increaseTime = function increaseTime() {
  timeAmount += 1;
  timeHeader.innerText = "" + timeAmount;
};

var decreaseTime = function decreaseTime() {
  timeAmount -= 1;
  timeHeader.innerText = "" + timeAmount;
};

increaseBtn.onclick = function () {
  return increaseTime();
};

decreaseBtn.onclick = function () {
  return decreaseTime();
};

backToTimer.addEventListener('click', function () {
  deRenderDivToRenderIn(setTimerForm, false);
  abortButton.style.display = "none";
});
breakPageButton.addEventListener('click', function () {
  startCount_1.timer.reset();
});
breakPagePauseButton.addEventListener('click', function () {
  console.log('i reached here');
  startcountdown_1.timer.stop();
  startCount_1.StartCountDown(timeAmount, false, false);
  var analogClock = document.querySelector('#analogClock');
  deRenderDivToRenderIn(analogClock, true);
});
/*
breakPagePauseButton.addEventListener('click', () => {
    EasyTimer.stop();
    console.log("i was clicked")
    StartCountDown(timeAmount, timeObject.intervalOn, timeObject.addBreak);
})
*/
//When submit is clicked, a new timeInfo interface is created. The total amount of seconds is calculated, including break-time
//The startCountdown-function is called with information from the interface as arguments.

startTimerButton.addEventListener('click', function (e) {
  e.preventDefault();
  exports.timeObject = timeObject = {
    timeInMinutes: timeAmount,
    intervalOn: intervalChecked.checked,
    addBreak: breakChecked.checked,
    totalTimeIntervalInSeconds: function totalTimeIntervalInSeconds(intervalOn, addBreak) {
      if (intervalOn && addBreak) {
        timeAmount = timeAmount;
        console.log('total interval plus break time in minutes: ', timeAmount);
        totalTimeInSeconds = timeAmount * 60; //console.log('total interval plus break time in seconds: ', totalTimeInSeconds);

        return totalTimeInSeconds;
      } else if (intervalOn && !addBreak) {
        //console.log('total interval time in minutes: ', timeAmount);
        totalTimeInSeconds = timeAmount * 60; //console.log('total interval time in seconds: ', totalTimeInSeconds);

        return totalTimeInSeconds;
      } else if (!intervalOn && addBreak) {
        //console.log("error, can't set break without intervals enabled");
        return 0;
      } else {
        //console.log('total time in minutes, no intervals: ', timeAmount);
        totalTimeInSeconds = timeAmount * 60; //console.log('total time in seconds, no intervals: ', totalTimeInSeconds);

        return totalTimeInSeconds;
      }
    }
  };
  var totalTime = timeObject.totalTimeIntervalInSeconds(timeObject.intervalOn, timeObject.addBreak); //console.log(timeObject.timeInMinutes);
  //analogClock(timeObject.timeInMinutes);
  //startCountdown(totalTime, timeObject.intervalOn, timeObject.addBreak)

  startCount_1.StartCountDown(totalTime, timeObject.intervalOn, timeObject.addBreak);
  abortButton.style.display = "flex";
  deRenderDivToRenderIn(analogClockDiv, true);
}, false);
},{"./TS-module/startcountdown":"TS-module/startcountdown.ts","../src/TS-module/navigation":"TS-module/navigation.ts","../src/TS-module/startCount":"TS-module/startCount.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60955" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map