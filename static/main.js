      // This example displays an address form, using the autocomplete feature
      // of the Google Places API to help users fill in the information.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

<script>
function initMap() {
    var input = document.getElementById('searchInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
}
</script>