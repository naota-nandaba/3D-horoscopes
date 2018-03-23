function app() {
  // DROPDOWN MENU VARIABLES
  var ddAries = $('#Aries');
  var ddTaurus = $('#Taurus');
  var ddGemini = $('#Gemini');
  var ddCancer = $('#Cancer');
  var ddLeo = $('#Leo');
  var ddVirgo = $('#Virgo');
  var ddLibra = $('#Libra');
  var ddScorpio = $('#Scorpio');
  var ddSagittarius = $('#Sagittarius');
  var ddCapricorn = $('#Capricorn');
  var ddAquarius = $('#Aquarius');
  var ddPisces = $('#Pisces');

  var ddMenu = [ddAries, ddTaurus, ddGemini, ddCancer, ddLeo, ddVirgo, ddLibra,
    ddScorpio, ddSagittarius, ddCapricorn, ddAquarius, ddPisces
  ];

    //RENDER AZTRO RESULTS
    function renderAztro(result) {
      var template = _.template(
        "<b>" + "<u>" + "kudosmedia:" + "</u>" + "</b>" +  " " + "<i>" + "<%= description %>" + "</i>" + "          "
      )
      //append
      $("#results").append(template(result));
    }

    //RENDER GANESHA RESULTS
    function renderGanesha(result) {
      var template = _.template(
        "<b>" + "<u>" + "GaneshaSpeaks:" + "</u>" + "</b>" + " " + "<i>" + "<%= horoscope %>" + "</i>" + "          "
      )
      //append
      result.horoscope = result.horoscope.replace(/\['|'\]|\\r\\n/g, '');
      $("#results").append(template(result))

    }

    //RENDER RETROGRADE RESULTS
    function renderRetrograde(result) {
      var template = _.template(
        "<b>" + "<u>" + "Is Mercury retrograde?" + "</u>" + "</b>" + " " + "<i>" +
        "<%= is_retrograde ? 'Yes!' : 'No!' %>" +
        "</i>" + "          "
      )
      //append
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
          url: 'https://crossorigin.me/https://aztro.herokuapp.com?sign=' + item[0].id + '&day=today',
          success: function(data) {
            console.log(data);
            // An array of search results
            renderAztro(data);
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

      })
    })
  }


  $(app)
