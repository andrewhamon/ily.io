var $ = require('jquery');

String.prototype.toTitleCase = function() {
  var i, j, str, lowers, uppers;
  str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
  'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), function(txt) { return txt.toLowerCase(); });

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ['Id', 'Tv'];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());

  return str;
};

module.exports = function () {
  if ( $( "body" ).data("title") === "main" ) {
    var urlParams = {};
    var match;
    pl     = /\+/g;  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g;
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }
    query  = window.location.search.substring(1);

    while (match = search.exec(query)){
      urlParams[decode(match[1])] = decode(match[2]);
    }
    if (!(urlParams.from && urlParams.to)) {
      window.location.replace("./new");
    }

    // Remove trailing slash (some servers, like python SimpleHTTPServer, always append a slash)
    urlParams.to   = urlParams.to.toTitleCase(  ).replace(/\/$/g, '');
    urlParams.from = urlParams.from.toTitleCase().replace(/\/$/g, '');
    $( "#recipient" ).text(urlParams.to);
    $(   "#sender"  ).text(urlParams.from);
    document.title = urlParams.from + " ♥ " + urlParams.to;
  };
};
