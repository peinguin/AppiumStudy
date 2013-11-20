var wd = require("wd")
  , assert = require("assert")
  , Q = require("q")
  , appURL = __dirname+'/../program/Apps/Titanium/AppiumStudy.app';

// Instantiate a new browser session
var browser = wd.promiseRemote("localhost", 4723);

// See whats going on
browser.on("status", function(info) {
  console.log('\x1b[36m%s\x1b[0m', info);
});

browser.on("command", function(meth, path, data) {
  console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path, data || '');
});

// Run the test
browser
  .init({
    device: ""
    , name: "Appium: with WD"
    , platform: "Mac"
    , app: appURL 
    , version: "6.0"
    , browserName: ""
    , newCommandTimeout: 60
  })
  .then(function () {
    return browser.elementsByTagName('button');
  })
  .then(function (els) {
    assert.equal(els.length, 4);
    return browser.clickElement(els[0]);
  })
  .then(function(){
    return browser.elementsByTagName('alert');
  })
  .then(function(alert){
    assert.equal(alert.length, 1);
    return browser.acceptAlert();
  })
  .then(function () {
    return browser.elementsByTagName('button');
  })
  .then(function(els){
    var invalidButton = els[1];
    return invalidButton.getLocation();
  })
  .then(function (getLocation) {
    assert.equal(getLocation.x, 43);
  })
  .then(function () {
    return browser.elementsByTagName('button');
  })
  .then(function(els){
    var validButton = els[0];
    return validButton.getLocation();
  })
  .then(function (getLocation) {
    assert.equal(getLocation.x, 20);
  })
  .then(function () {
    return browser.elementsByTagName('button');
  })
  .then(function (button) {
    return button[2].click();
  })
  .then(function () {
    return browser.waitForElementByTagName('text');
  })
  .then(function () {
    return browser.elementsByTagName('text');
  })
  .then(function (label) {
    assert.equal(label.length, 1);
    return label[0].text();
  })
  .then(function (text) {
    console.log(text);
    assert.equal(text, 'I am live!');
  })
  .fin(function () {
    browser.quit();
  })
.done();