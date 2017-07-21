function app() {
  // DROPDOWN MENU VARIABLES
  var ddAries = $('#aries');
  var ddTaurus = $('#taurus');
  var ddGemini = $('#gemini');
  var ddCancer = $('#cancer');
  var ddLeo = $('#leo');
  var ddVirgo = $('#virgo');
  var ddLibra = $('#libra');
  var ddScorpio = $('#scorpio');
  var ddSagittarius = $('#sagittarius');
  var ddCapricorn = $('#capricorn');
  var ddAquarius = $('#aquarius');
  var ddPisces = $('#pisces');

  var ddMenu = [ddAries, ddTaurus, ddGemini, ddCancer, ddLeo, ddVirgo, ddLibra,
    ddScorpio, ddSagittarius, ddCapricorn, ddAquarius, ddPisces
  ];

  // //RENDER OPTION BAR
  // function renderOptions() {
  //
  //   var template = _.template(
  //     "<div class='container-fluid'>" +
  //     "<div class='row options-row'>" +
  //
  //     "<div class='col-xs-2 box options op1'>" +
  //     "<center>" + "Kudos" +
  //     "</center>" +
  //     "</div>" +
  //
  //     "<div class='col-xs-2 box options op2'>" +
  //     "<center>" + "Elle" +
  //     "</center>" +
  //     "</div>" +
  //
  //     "<div class='col-xs-2 box options op3'>" +
  //     "<center>" + "Ganesha" +
  //     "</center>" +
  //     "</div>" +
  //
  //     "<div class='col-xs-2 box options op4'>" +
  //     "<center>" + "Retro" +
  //     "</center>" +
  //     "</div>" +
  //
  //     "</div>" +
  //     "</div>"
  //   )
  //   $('#options').append(template());
  // }


    //RENDER AZTRO RESULTS
    function renderAztro(result) {

      var template = _.template(
        "<div class='row aztro-row'>" +
        "<div class='col-md-4 box aztro-content'>" +
        "<p id='aztro-head'>" + "kudosmedia" + "</p>" +
        "<p id='aztro-horo'>" + "<i>" + "<%= description %>" + "</i>" + "</p>" +
        "</div>" +
        "</div>"// <div row>
      )
      //append to results div
      $("#results").append(template(result));
    }

    //RENDER ELLE RESULTS
    function renderElle(result) {

      var template = _.template(
        "<div class='row elle-row'>" +
        "<div class='col-md-4 box elle-content'>" +
        "<p id='elle-head'>" + "Elle" + "</p>" +
        "<p id='elle-horo'>" + "<i>" + "." + "</i>" + "</p>" +
        "</div>" +
        "</div>"
      )
      //append to results div
      $("#results").append(template(result))
    }

    //RENDER GANESHA RESULTS
    function renderGanesha(result) {
      var template = _.template(
        "<div class='row ganesha-row'>" +
        "<div class='col-md-4 box ganesha-content'>" +
        "<p id='ganesha-head'>" + "GaneshaSpeaks" + "</p>" +
        "<p id='ganesha-horo'>" + "<i>" + "<%= horoscope %>" + "</i>" + "</p>" +
        "</div>" +
        "</div>" // <div row>
      )
      //append to results div
      result.horoscope = result.horoscope.replace(/\['|'\]|\\r\\n/g, '');
      $("#results").append(template(result))

    }

    //RENDER RETROGRADE RESULTS
    function renderRetrograde(result) {
        "<div class='row retro-row'>" +
        "<div class='col-md-4 box retro-content'>" +
        "<p id='retro-head'>" + "Is Mercury retrograde?" + "</p>" +
        "<p id='retro-text'>" + "<i>" +
        "<%= is_retrograde ? 'Yes!' : 'No!' %>" +
        "</i>" + "</p>" +
        "</div>" +
        "</div>" // <div row>
      )
      //append to results div
      $("#results").append(template(result))
    }

    //DROPDOWN MENU EVENT LISTENER & API QUERIES
    ddMenu.forEach(function(item) {
      item.on("click", function(event) {
        event.preventDefault();
        //CLEAR RESULTS
        // $("#options").empty(); //Clearing options
        $("#results").empty(); //Clearing results

        //OPTIONS BAR
        // renderOptions();


        //AZTRO
        console.log("Querying aztro...");

        $.ajax({
          type: 'POST',
          url: 'https://aztro.herokuapp.com?sign=' + item[0].id + '&day=today',
          success: function(data) {
            console.log(data);
            // An array of search results
            renderAztro(data);
          }
        })

        //ELLE
        console.log("Querying Elle...");

        $.ajax({
          type: 'GET',
          url: 'elle.hearst.io',
          success: function(data) {
            console.log(data);

            // An array of search results
            renderElle(data);
          }
        })

        //GANESHA
        console.log("Querying Ganesha...");

          $.ajax({
            type: 'GET',
            // dataType: 'jsonp',
            url: 'https://crossorigin.me/http://horoscope-api.herokuapp.com/horoscope/today/' + item[0].id,
            success: function(data) {
              console.log(data);
              renderGanesha(data);

            }
          })


        //RETROGRADE
        console.log("Querying Mercury Retrograde...")

          $.ajax({
            type: 'GET',
            url: 'https://mercuryretrogradeapi.com',
            success: function(data) {
              renderRetrograde(data);

            }
          })



        // //DELETE OPTION
        // var op1 = $('.op1');
        // var op2 = $('.op2');
        // var op3 = $('.op3');
        // var op4 = $('.op4');
        //
        //
        // op1.on("click", function(event) {
        //     $('.aztro-container').empty();
        //     op1.remove();
        //   });
        //
        //
        // op2.on("click", function(event) {
        //     $('.elle-container').empty();
        //     op2.remove();
        //   });
        //
        //
        // op3.on("click", function(event) {
        //     $('.ganesha-container').empty();
        //     op3.remove();
        //   });
        //
        //
        // op4.on("click", function(event) {
        //     $('.retro-container').empty();
        //     op4.remove();
        //   });
        //
        //



      })
    })
  }
  //
  //
  //




  $(app)
