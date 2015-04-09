function onUrlChange() {
  var from = encodeURIComponent($( "#from" ).val());
  var to   = encodeURIComponent($(  "#to"  ).val());

  var url = ("http://" + window.location.host + "/?from=" + from + "&to=" + to);
  url = url.replace(/%20/g, "+");

  $( "#link-output-box" ).val(url);

  if (from != "" && to != "")
    $( "#preview" ).attr("href", url);
  else
    $( "#preview" ).attr("href", "#");
}

$( document ).ready(function() {
  onUrlChange();

  var $from = $( "#from" );
  var $to   = $( "#to" );
  $from.on("keyup", onUrlChange );
  $from.on("blur", onUrlChange );
  $to.on("keyup", onUrlChange );
  $to.on("blur", onUrlChange );
  $( "#link-output-box" ).on("click", function(){ $( this ).select(); });

  var snowflakes = new Snowflakes("pageContentContainer","snowflakesContainer");
  snowflakes.create(20);
});
