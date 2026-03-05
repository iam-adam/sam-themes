(function(){
'use strict';
$(document).ready(function () {
  console.log("ready");
  var myBody = $('body');
  var window_width = $(window).width()
  var window_width_prev = $(window).width();
  var searchHeader = $('.et_search_outer');
  var mainHeader = $('#main-header');
  if ($("i.fa-sign-in-alt.fas").length) {
    isUserLoggedIn = false;
    myBody.addClass("user-logged-out");
  } else {
    myBody.addClass("user-logged-in");
  }

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

  /*
  if (myBody.hasClass('auctions-catalog') || myBody.hasClass('search')) {

    var currentURL = window.location.href;
    var currentURLMatch = currentURL.match(/\d+/);
    var auctionID = currentURLMatch[0];
    console.log(auctionID);
    //bredcrumbs & iframe
    if ($('.auctitle > div.tle h3').length > 0 && !isEmpty($('.auctitle > div.tle h3').html()) && !isBlank($('.auctitle > div.tle h3').html())) {
      let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Auctions</a> <a href="' + $('.aucinfo').attr('href') + '" class="lotinfotab">Info</a> <a href="' + location.protocol + '//' + location.host + location.pathname + '">Catalog</a></div><iframe class="header_iframe" frameborder="0" scrolling="no" onload="resizeIframe(this)" src=' + location.protocol + '//' + location.host + '/feed/info&id=' + auctionID + ' >';
      if ($('.bid_listing_wrapper').length > 0) {
        $(myTxt).prependTo($('.auctitle.catitle'));
      } else {
        $('.auc_srch').prepend(myTxt);
      }
    }
  }
  */

  if (myBody.hasClass('lot-details-index')) {

    var currentURL = window.location.href;
    var currentURLMatch = currentURL.match(/\d+/);
    var auctionID = currentURLMatch[0];
    console.log(auctionID);

    //bredcrumbs
    if ($('.auctitle > div.tle h3').length > 0 && !isEmpty($('.auctitle > div.tle h3').html()) && !isBlank($('.auctitle > div.tle h3').html())) {

      //limit title to 50 chars
      var myLink = $('.auctitle > div.tle h3').html();
      myLink = myLink.replace('Starts Ending', '');

      var myLot = $('.lot-name').html();

      if (myLot.length > 30) {

        myLot = myLot.slice(0, 30);
        myLot = myLot + '...';
      }


      //adding auction name and lot name to the top link-menu
      let myTxt = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Auctions</a>  <a href="' + $('.aucinfo').attr('href') + '" class="lotinfotab">Info</a> <a href="' + $('.catlg').attr('href') + '" class="auc-name">Catalog</a>' + myLot + '</div>';

      $('.lot-details-container').prepend(myTxt);
    }
  }

  if (myBody.hasClass('auctions-info')) {

    let myHtml = '<div class="auc-top-menu"><a href="/" class="auc_lnk">Auctions</a> <a href="' + $('a.catlg').attr('href') + '" class="myCatalog">Catalog</a>  Info</div>';

    $(myHtml).prependTo($('#wrapper .bodybox'));
  }

  $('#et_search_icon').on('click', function () {

    let mySearch = $('.et_search_form_my-container'),
      myMenu = $('.et_menu_my-container');
    mySearch.addClass('et_pb_search_visible');
    mySearch.removeClass('et_pb_search_form_hidden');
    myMenu.removeClass('et_pb_menu_visible');
    myMenu.addClass('et_pb_menu_hidden');

    mySearch.removeClass('et_pb_no_animation');
    myMenu.removeClass('et_pb_no_animation');

    setTimeout(function () {
      mySearch.addClass('et_pb_no_animation');
      myMenu.addClass('et_pb_no_animation');
    }, 1000);

  });

  $('.et_close_search_field').on('click', function () {

    let mySearch = $('.et_search_form_my-container'),
      myMenu = $('.et_menu_my-container');
    mySearch.removeClass('et_pb_search_visible');
    mySearch.addClass('et_pb_search_form_hidden');
    myMenu.addClass('et_pb_menu_visible');
    myMenu.removeClass('et_pb_menu_hidden');

    mySearch.removeClass('et_pb_no_animation');
    myMenu.removeClass('et_pb_no_animation');

    setTimeout(function () {
      mySearch.addClass('et_pb_no_animation');
      myMenu.addClass('et_pb_no_animation');
    }, 1000);
  });

  //listener to checks if position of scroll is less then 100
  $(window).scroll(function () {
    scrollSetting();
  });

  function scrollSetting() {
    winScroll = $(window).scrollTop();
    if (winScroll >= 32) {
      mainHeader.addClass('et-fixed-header');
      searchHeader.addClass('et-fixed-header');
    }
    else {
      mainHeader.removeClass('et-fixed-header');
      searchHeader.removeClass('et-fixed-header');
    }
  }

  $('.mobile_menu_bar_toggle').on('click', function () {

    $('#mobile_menu').toggle();
    $('.mobile_nav').toggleClass('closed');
    $('.mobile_nav').toggleClass('opened');
  });
  if ($("li.logout").length > 0) {
    $("li.my-items").attr("style", "display:inline-block !important;");
  }

  if ($("body.auctions.auctions-ask-question").length > 0) {
    $("#AskQuestionForm > div > article > ul > li > div.accordionContent > section > ul > li:nth-child(6)").before($("#AskQuestionForm > div > article > ul > li > div.accordionContent > section > ul > li:nth-child(7)"));
  }


  var winWidth = $(window).width();

  if (winWidth >= 568 && myBody.hasClass('lot-details')) {
    var tabHeight = $('.is-open .ins_cnt').outerHeight();

    $('ul#nav').css({ 'height': tabHeight + 40 });

    $('#nav li a').on('click', function () {

      $(this).parent().find('.tabhide').css({ 'display': 'block' });
      tabHeight = $(this).parent().find('.ins_cnt').outerHeight();

      $('ul#nav').css({ 'height': tabHeight + 40 });

    });
  }


  console.log("checking class");





  if (myBody.hasClass("auctions-list")) {

    $("div#aucDtr > ul").each(function (index) {

      if ($(this).find("a.cat").length) {

        $(this).find("a.cat").parent().addClass("catdiv");
      }

      if ($(this).find("a.reg").length) {

        $(this).find("a.reg").parent().addClass("catdiv");
      }

    });

  }


  /*Advanced search starts*/

  if (myBody.hasClass("auctions-catalog") || myBody.hasClass("my-items") || myBody.hasClass("search-index")) {
    /*Starts : Advanced search*/

    //Advance search customization
    $("div.advSearchAccordionContent").prepend($("span#advsKey_ctl.qtextbox-ctl"));
    $("input#advsLotNum.textbox").attr("placeholder", "Lot Number");
    $(".search_toggle_btn").prepend("Advanced Search");

    /*Ends : Advanced search*/
  }

  /*Advanced search ends*/

  if (myBody.hasClass("auctions-live-sale")) {

    $(".auctions.auctions-live-sale ul.bidding-main").prepend("<div id='bid_now_section'></div>");
    $("#bid_now_section").append("<div id='bid_button_image'><img src='/assets/custom/images/bid-button.png'/></div>");
    $("#bid_now_section").append("<div id='bid_options'></div>");
    $("#bid_options").append($(".auctions.auctions-live-sale ul.bidding-main li.current"));
    $("#bid_options").append($(".auctions.auctions-live-sale ul.bidding-main li.current-btn"));

  }

  if ($('.type-hybrid-sale').length) {
    $('li.current-btn').before("<div id='TimerSection'></div>");
    $('#TimerSection').append("<div id='TimerDialSection'></div>");
    $('div#TimerDialSection').append($('li.current-btn'));

    //Timer

    //Timer

    if ($('#lblCountdown').length || $('#lblCountdown').length) {
      var divId = 'lblCountdown';
      if ($('#lblCountdown').length) {
        divId = 'lblCountdown';
      }

      const FULL_DASH_ARRAY = 283;

      const WARNING_THRESHOLD = 10;
      const ALERT_THRESHOLD = 5;

      const WARNING_THRESHOLD_PERCENTAGE = 50;
      const ALERT_THRESHOLD_PERCENTAGE = 33;

      const COLOR_CODES = {
        info: {
          color: 'green',
        },
        warning: {
          color: 'orange',
          threshold: WARNING_THRESHOLD,
          threshold_per: WARNING_THRESHOLD_PERCENTAGE,
        },
        alert: {
          color: 'red',
          threshold: ALERT_THRESHOLD,
          threshold_per: ALERT_THRESHOLD_PERCENTAGE,
        },
      };

      let TIME_LIMIT = null;
      let timePassed = 0;
      let timeLeft = null;
      let timerInterval = null;
      let remainingPathColor = COLOR_CODES.info.color;
      let oldTime = null;
      let timeLeftPercentage = 100;

      let myHtml = `<div class="base-timer">
                          <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g class="base-timer__circle">
                              <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                              <path
                                id="base-timer-path-remaining"
                                stroke-dasharray="283"
                                class="base-timer__path-remaining ${remainingPathColor}"
                                d="
                                  M 50, 50
                                  m -45, 0
                                  a 45,45 0 1,0 90,0
                                  a 45,45 0 1,0 -90,0
                                "
                              ></path>
                            </g>
                          </svg>
                          <span class="timerWrapper">
                             
                          </span>
                        </div>`;

      //$(myHtml).prependTo($('.place-cont'));
      //$(myHtml).after($('#image_container'));
      $('li.current-btn div.unibtn').prepend(myHtml);

      if ($('#btnPlaceBid').length) {
        $('#btnPlaceBid').appendTo($('.timerWrapper'));
      } else if ($('#btnPlaceBid').length) {
        $('#btnPlaceBid').appendTo($('.timerWrapper'));
      }

      // Select the node that will be observed for mutations
      //const targetNode = document.getElementById('z47');
      const targetNode = document.getElementById('' + divId);

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (TIME_LIMIT == null) {
              TIME_LIMIT = getTime();
              oldTime = TIME_LIMIT;
              startTimer();
            }

            console.log('A child node for timer');
          }
        }
      };

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);

      function onTimesUp() {
        clearInterval(timerInterval);

        //Reset the color
      }

      function startTimer() {
        timerInterval = setInterval(function () {
          timePassed = timePassed += 1;
          timeLeft = getTime();

          console.log('startTimer timeLeft - ', timeLeft);
          console.log('startTimer TIME_LIMIT - ', TIME_LIMIT);
          timeLeftPercentage = parseFloat((timeLeft * 100) / TIME_LIMIT);
          console.log('startTimer timeLeftPercentage - ', timeLeftPercentage);

          /*if(timeLeft > TIME_LIMIT){
                          console.log('reset timer timeleft > time_limit');
                          resetTimer();
                      }*/

          if (Math.abs(oldTime - timeLeft) > 2) {
            console.log('reset timer oldTime is different with timeLeft');
            resetTimer();
            startTimer();
            //console.log('timeLeft - ' + timeLeft + ', oldTime - ' + oldTime + ', TIME_LIMIT - ' + TIME_LIMIT);
          }

          setCircleDasharray();
          setRemainingPathColor(timeLeft);

          if (timeLeft === 0) {
            onTimesUp();
          }

          oldTime = timeLeft;
        }, 1000);
      }

      function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;

        if (timeLeftPercentage <= alert.threshold_per) {
          document.getElementById('base-timer-path-remaining').classList.remove(warning.color);
          document.getElementById('base-timer-path-remaining').classList.add(alert.color);
        } else if (timeLeftPercentage <= warning.threshold_per) {
          document.getElementById('base-timer-path-remaining').classList.remove(info.color);
          document.getElementById('base-timer-path-remaining').classList.add(warning.color);
        } else {
          document.getElementById('base-timer-path-remaining').classList.remove(warning.color);

          document.getElementById('base-timer-path-remaining').classList.remove(alert.color);

          document.getElementById('base-timer-path-remaining').classList.add(info.color);
        }


      }

      function resetTimer() {
        clearInterval(timerInterval);

        TIME_LIMIT = getTime();

        console.log('resetTimer - TIME_LIMIT - ', TIME_LIMIT);

        const { alert, warning, info } = COLOR_CODES;

        document.getElementById('base-timer-path-remaining').classList.remove(warning.color);
        document.getElementById('base-timer-path-remaining').classList.remove(alert.color);
        document.getElementById('base-timer-path-remaining').classList.add(info.color);
      }

      function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;

        console.log('rawTimeFraction - ', rawTimeFraction);
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      }

      function setCircleDasharray() {
        const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;

        document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
      }

      function getTime() {
        //let myTimer = $('.lot-end-countdown #z47').html();
        let myTimer = $('.lot-end-countdown #' + divId).html();

        //console.log("myTimer - ", myTimer);
        $('#countdown_timer_value').html(myTimer);

        //console.log("countdown_timer_value - html ", $("#countdown_timer_value").html());
        if ($('#countdown_timer_value').html() == undefined) {
          //console.log("object does not exist");

          var countDownTimerValueHTML = `<div class="lot-end-countdown id" id="customCountDown">
                                <div id="countdown_timer_value"></div>                            </div>`;

          if ($('#btnPlaceBid').length) {
            $('#btnPlaceBid').append(countDownTimerValueHTML);
          } else if ($('#btnPlaceBid').length) {
            $('#btnPlaceBid').append(countDownTimerValueHTML);
          }
        } else {
          //console.log("object exists");
        }

        //myTimer = myTimer.replace('Lot starts in ', '');
        myTimer = myTimer.replace('<span id="lot_starts_in">LOT STARTS IN</span>', '');

        myTimer = myTimer.split(' ');

        console.log('myTimer - ', myTimer);

        if (myTimer.length === 3) {
          myTimer[0] = myTimer[0].replace('h', '');
          myTimer[1] = myTimer[1].replace('m', '');
          myTimer[2] = myTimer[2].replace('s', '');

          return +myTimer[0] * 60 * 60 + +myTimer[1] * 60 + +myTimer[2];
        }

        if (myTimer.length === 2) {
          myTimer[0] = myTimer[0].replace('m', '');
          myTimer[1] = myTimer[1].replace('s', '');

          return +myTimer[0] * 60 + +myTimer[1];
        }

        if (myTimer.length === 1) {
          myTimer[0] = myTimer[0].replace('s', '');

          return myTimer[0];
        }
      }

      // var check_timer_object = setInterval(checkObject, 1000);//Not sure why it is not working with interval
      setTimeout(function () {
        checkObject();
      }, 2500);
    }

    //ends timer

    //ends timer

    function checkObject() {
      console.log('checkOBject', $('.auctions.auctions-live-sale div.lot-end-countdown').length);
      if ($('.auctions.auctions-live-sale div.lot-end-countdown').length) {
        //$countdownDiv = $(".auctions.auctions-live-sale div.lot-end-countdown").clone();
        //$countdownDiv = $(".auctions.auctions-live-sale div.lot-end-countdown");
        //$countdownDiv.prop("id", 'customCountDown');
        //$countdownDiv.addClass("id", 'customCountDown');

        var countDownTimerValueHTML = `<div class="lot-end-countdown id" id="customCountDown">
                                            <div id="countdown_timer_value"></div>                            </div>`;

        if ($('#btnPlaceBid').length) {
          $('#btnPlaceBid').append(countDownTimerValueHTML);
        } else if ($('#btnPlaceBid').length) {
          $('#btnPlaceBid').append(countDownTimerValueHTML);
        }

        //clearInterval(check_timer_object);
      }
    }
  }

  /* Hybrid sale ends */

  if (myBody.hasClass('type-live-sale') || myBody.hasClass('type-hybrid-sale')) {
    if ($('ul.bidding-main').length) {
      var config = { attributes: true, childList: true, characterData: true, subtree: true };
      var targetNodeBidButton = document.querySelector('li.current-btn div.unibtn');
      console.log('setting observer1 targetNodeBidButton - ', targetNodeBidButton);
      const callback = function (mutationsList, observer) {
        observer.disconnect();

        //$('span.custom-out-bid').remove();
        //$('span.custom-high-bid').remove();
        $('.live-bid').removeClass('OutBidButtonColor');
        $('.live-bid').removeClass('HighBidButtonColor');

        console.log('ul.bidding-main mutated');

        if ($('span#btn-outbid.outbid').length) {
          $('.unibtn.place-cont a#btnPlaceBid').addClass('OutBidButtonColor');

          //var outBidMessage = $('.bidding-main span.outbid').text();
          //$('.bidding-main li.current').append("<span class='custom-out-bid'>" + outBidMessage + '</span>');
        } else {
          $('.unibtn.place-cont a#btnPlaceBid').removeClass('OutBidButtonColor');
        }

        if ($('span.highest').length) {
          $('a#btnPlaceBid').addClass('HighBidButtonColor');

          //var hightBidMessage = $('.bidding-main span.highest').text();
          //$('.bidding-main li.current').append("<span class='custom-high-bid'>" + hightBidMessage + '</span>');
        } else {
          $('a#btnPlaceBid').removeClass('HighBidButtonColor');
        }

        observer.observe(targetNodeBidButton, config);
      };

      const observerBidAction = new MutationObserver(callback);
      observerBidAction.observe(targetNodeBidButton, config);
    }
  }

  if (myBody.hasClass("my-invoices-view")) {
    $("div.notes.summary").after($("div.invoice-pay-button-wrap"));
  }



});
})();