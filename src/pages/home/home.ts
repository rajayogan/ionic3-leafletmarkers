import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import leaflet from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderForwardResult
} from "@ionic-native/native-geocoder";

import { MarkersProvider } from "../../providers/markers/markers";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("map") mapContainer: ElementRef;
  map: any;
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private nativeGeocoder: NativeGeocoder,
    public markersProvier: MarkersProvider
  ) {}

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet
      .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attributions: "www.tphangout.com",
        maxZoom: 14
      })
      .addTo(this.map);
    this.loadMarkers();
  }

  addMarker() {
    let prompt = this.alertCtrl.create({
      title: "Add Marker",
      message: "Enter location",
      inputs: [
        {
          name: "city",
          placeholder: "City"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.geoCodeandAdd(data.city);
          }
        }
      ]
    });
    prompt.present();
  }

  geoCodeandAdd(city) {
    this.nativeGeocoder
      .forwardGeocode(city)
      .then((coordinates: NativeGeocoderForwardResult) => {
        this.markersProvier.saveMarker(coordinates[0]);
      })
      .catch((error: any) => console.log(error));
  }

  loadMarkers() {
    var greenIcon = new leaflet.Icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.markersProvier.getAllMarkers().subscribe((markers: any) => {
      markers.forEach(singlemarker => {
        let markerGroup = leaflet.featureGroup();

        let marker: any = leaflet
          .marker([singlemarker.latitude, singlemarker.longitude], {
            icon: greenIcon
          })
          .on("click", () => {
            alert(singlemarker.message);
          });
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);
      });
    });
  }
}
