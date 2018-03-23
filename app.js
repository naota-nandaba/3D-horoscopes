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

    //MARQUEE FUNCTION
    function marquee(a, b) {
        var width = b.width();
        var start_pos = a.width();
        var end_pos = -width;

        function scroll() {
            if (b.position().left <= -width) {
                b.css('left', start_pos);
                scroll();
            }
            else {
                time = (parseInt(b.position().left, 10) - end_pos) *
                    (10000 / (start_pos - end_pos)); // Increase or decrease speed by changing value 10000
                b.animate({
                    'left': -width
                }, time, 'linear', function() {
                    scroll();
                });
            }
        }

        b.css({
            'width': width,
            'left': start_pos
        });
        scroll(a, b);

        b.mouseenter(function() {     // Remove these lines
            b.stop();                 //
            b.clearQueue();           // if you don't want
        });                           //
        b.mouseleave(function() {     // marquee to pause
            scroll(a, b);             //
        });                           // on mouse over

    }

    //RENDER MARQUEE FUNCTION
    function renderMarquee() {
        marquee($('#horoscopes'), $('#results'));  //Enter name of container element & marquee element
    }

    //RENDER AZTRO RESULTS
    function renderAztro(result) {
      var template = _.template(
        "<b>" + "<u>" + "kudosmedia:" + "</u>" + "</b>" +  " " + "<i>" + "<%= description %>" + "</i>" + "          "
      )
      //append
      $("#results").append(template(result));
      renderMarquee();
    }

    //RENDER GANESHA RESULTS
    function renderGanesha(result) {
      var template = _.template(
        "<b>" + "<u>" + "GaneshaSpeaks:" + "</u>" + "</b>" + " " + "<i>" + "<%= horoscope %>" + "</i>" + "          "
      )
      //append
      result.horoscope = result.horoscope.replace(/\['|'\]|\\r\\n/g, '');
      $("#results").append(template(result));
      renderMarquee();
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
      renderMarquee();
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
