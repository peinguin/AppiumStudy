var wd = require("wd")
  ,Q = require("q")
  , assert = require("assert")
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

var check_buttons = function(els){

  assert.equal(els.length, 4, 'Not enough buttons');

  var check_first_buttons = function(els){
    var deferred = Q.defer();

    var check_alert = function(ValidButton){
      var deferred = Q.defer();

      browser.clickElement(ValidButton)
      .then(function(){
        return browser.elementsByTagName('alert');
      })
      .then(function(alert){
        assert.equal(alert.length, 1, "Alert not shoved");
        return browser.acceptAlert();
      })
      .fail(function(err){
        deferred.reject(new Error(err.message));
      })
      .fin(function(){
        deferred.resolve();
      });

      return deferred.promise;
    }

    var check_invalid_position = function(InvalidButton){
      var deferred = Q.defer();

      InvalidButton.getLocation()
      .then(function(location){
        assert.equal(location.x, 43, "InvalidButton location is not wrong");
      })
      .fail(function(err){
        deferred.reject(new Error(err.message));
      })
      .fin(function(els){
        deferred.resolve();
      });

      return deferred.promise;
    }

    var check_valid_position = function(ValidButton){
      var deferred = Q.defer();

      ValidButton.getLocation()
      .then(function(location){
        assert.equal(location.x, 20, 'ValidButton location is wrong');
      })
      .fail(function(err){
        deferred.reject(new Error(err.message));
      })
      .fin(function(els){
        deferred.resolve();
      });

      return deferred.promise;
    }

    check_alert(els[0])
    .then(function(){return check_invalid_position(els[1]);})
    .then(function(){return check_valid_position(els[0]);})
    .fin(function(){
      deferred.resolve(els);
    });
    
    return deferred.promise;
  }

  var check_work_button = function(work_button){
    var deferred = Q.defer();

    work_button.click()
    .then(function(){
      return browser.waitForElementByTagName('text');
    })
    .then(function(){
      return work_button.displayed();
    })
    .then(function(displayed){
      assert.equal(displayed, false, "Work button still visible");
    })
    .then(function () {
      return browser.elementsByTagName('text');
    })
    .then(function (label) {
      assert.equal(label.length, 1, "Label not found");
      return label[0].text();
    })
    .then(function (text) {
      assert.equal(text, 'I am live!', "Label text not matched");
    })
    .fail(function(err){
      deferred.reject(new Error(err.message));
    })
    .fin(function(){
    //  deferred.resolve(els);
    });

    return deferred.promise;
  }

  var check_broken_button = function(broken_button){
    var deferred = Q.defer();

    broken_button.click()
    .then(function(){
      return broken_button.displayed();
    })
    .then(function(displayed){
      assert.equal(displayed, false, "Broken button still visible");
    })
    .fail(function(err){
      deferred.reject(new Error(err.message));
    })
    .fin(function(){
      deferred.resolve(els);
    });

    return deferred.promise;
  }

  var deferred = Q.defer();

  check_first_buttons(els)
  .then(function(){return check_work_button(els[2]);})
  .fail(function(err){
     deferred.reject(new Error(err.message));
  })
  .fin(function(){
    deferred.resolve();
  });

  return deferred.promise;
}

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
  .then(check_buttons)
  .fail(function (err) {
    console.log('fail', err)
  })
  .fin(function () {
    browser.quit();
  })
.done();