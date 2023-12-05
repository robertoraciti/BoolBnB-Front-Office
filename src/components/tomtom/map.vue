<script>
import { onMounted, ref } from "vue";
export default {
  data() {
    return {
      long: null,
      lat: null,
    };
  },

  computed: {
    getLong() {
      this.long = parseFloat(this.apartment.longitude);
      return this.long;
    },
    getLat() {
      this.lat = parseFloat(this.apartment.latitude);
      return this.lat;
    },
  },
  name: "Map",
  setup(props) {
    console.log(parseFloat(props.apartment.latitude));
    const mapRef = ref(null);
    onMounted(() => {
      const tt = window.tt;
      let map = tt.map({
        key: "ZoDG5zXRUifcguOmqLqJaTta7v7iYLwV",
        container: mapRef.value,
        style: "tomtom://vector/1/basic-main",
        zoom: 15,
        center: [
          parseFloat(props.apartment.longitude),
          parseFloat(props.apartment.latitude),
        ],
      });

      map.addControl(new tt.FullscreenControl());
      map.addControl(new tt.NavigationControl());

      addMarker(map);
    });

    return { mapRef };

    function addMarker(map) {
      const tt = window.tt;
      // console.log(getLong(), getLat());
      let location = [
        parseFloat(props.apartment.longitude),
        parseFloat(props.apartment.latitude),
      ];
      let popupoffsett = 25;

      let marker = new tt.Marker().setLngLat(location).addTo(map);
      let popup = new tt.Popup({ offset: popupOffsett }).setHtml(
        "Your address!"
      );
      marker.setPopup(popup).togglePopup();
    }
  },

  props: {
    apartment: Object,
  },
};
</script>

<template>
  <div id="map" ref="mapRef"></div>
</template>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
