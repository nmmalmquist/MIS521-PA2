var len;
var results = "";

function apiSearch(identifier) {
  var params = {
    q: $("#query").val(),
    count: "50",
    offset: "0",
    mkt: "en-us",
  };

  $.ajax({
    url: "https://api.bing.microsoft.com/v7.0/search?" + $.param(params),
    beforeSend: function (xhrObj) {
      xhrObj.setRequestHeader(
        "Ocp-Apim-Subscription-Key",
        "45169282a83e474d916647f20e25b3c6"
      );
    },
    type: "GET",
  })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results +=
          "<p><a href='" +
          data.webPages.value[i].url +
          "'>" +
          data.webPages.value[i].name +
          "</a>: " +
          data.webPages.value[i].snippet +
          "</p>";
        if (identifier == "feelinglucky") {
          document.location.href = data.webPages.value[0].url
          return
        }
      }

      $("#searchResults").html(results);
      $("#searchResults").dialog({ width: "90vw", height: 500 });
    })
    .fail(function () {
      alert("error");
    });
}

const searchClick = (a) => {
  apiSearch(a);
};
const changeBackground = () => {
  var r = document.documentElement;
  var rs = getComputedStyle(r);
  let thisValue = rs.getPropertyValue("--background-url");
  if (thisValue == "url(./background.jpg)") {
    r.style.setProperty("--background-url", "url(./background2.jpg)");
  } else {
    r.style.setProperty("--background-url", "url(./background.jpg)");
  }
};
const displayTime = () => {
  const d = new Date();
  let time = d.toLocaleTimeString();

  $("#time").html(`Local Time: ${time}`);
  $("#time").dialog({
    width: 600,
    height: 200,
  });
};
