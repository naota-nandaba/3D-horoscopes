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

    //RENDER AZTRO RESULTS
    function renderAztro(result) {

      var template = _.template(
        "<b>" + "<u>" + "kudosmedia:" + " " + "</u>" + "</b>" + "<i>" + "<%= description %>" + "</i>" + "</p>"
      )
      //append to results div
      $("#results").append(template(result));
    }

    // //RENDER ELLE RESULTS
    // function renderElle(result) {
    //
    //   var template = _.template(
    //     "<p id='elle-horo'>" "<b>" + "Elle:" + "</b>" + "<i>" + "." + "</i>" + "</p>" +
    //   )
    //   //append to results div
    //   $("#results").append(template(result))
    // }

    //RENDER GANESHA RESULTS
    function renderGanesha(result) {
      var template = _.template(
        "<b>" + "<u>" + "GaneshaSpeaks:" + " " + "</u>" + "</b>" + "<i>" + "<%= horoscope %>" + "</i>" + "</p>"
      )
      //append to results div
      result.horoscope = result.horoscope.replace(/\['|'\]|\\r\\n/g, '');
      $("#results").append(template(result))

    }

    //RENDER RETROGRADE RESULTS
    function renderRetrograde(result) {
      var template = _.template(
        "<b>" + "<u>" + "Is Mercury retrograde?" + "</u>" + "</b>" + " " + "<i>" +
        "<%= is_retrograde ? 'Yes!' : 'No!' %>" +
        "</i>" + "</p>"
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

        // //ELLE
        // console.log("Querying Elle...");
        //
        // $.ajax({
        //   type: 'GET',
        //   url: 'elle.hearst.io',
        //   success: function(data) {
        //     console.log(data);
        //
        //     // An array of search results
        //     renderElle(data);
        //   }
        // })

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

      })
    })
  }


  $(app)
