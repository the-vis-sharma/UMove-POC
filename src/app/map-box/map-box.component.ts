import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from '../map';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  lat = 0;
  lng = 0;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;

  constructor() { 
    mapboxgl.accessToken = 'pk.eyJ1IjoicHVuaXRzZXRpYSIsImEiOiJjazBjOTY0cGcwMDI0M2RtbThsbWEyaXhnIn0.DrloATvnGeowNnIPanQT4g'
   }

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("location: ", this.lat, this.lng);
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [12.9336081,77.6144932],
      zoom: 16
      });

      console.log("map", this.map)
       
      this.map.on('load', () => {
        
        this.map.loadImage('https://cdn0.iconfinder.com/data/icons/iconshock_brillant_transportation/256/cruise_bike.png', (error, image) => {
          if (error) throw error;
          this.map.addImage('cat', image);


            // Add a layer showing the places.
          this.map.addLayer({
            "id":"places",
            "type":"symbol",
            "source":{
              "type":"geojson",
              "data":{
                  "type":"FeatureCollection",
                  "features":[
                    {
                        "type":"Feature",
                        "properties":{
                          "description":"<strong>Zone 1</strong><a href='' target='_blank'><button>Get Direction</button></a>",
                          "icon":"cat"
                        },
                        "geometry":{
                          "type":"Point",
                          "coordinates":[
                              77.613853,
                              12.9339302
                          ]
                        }
                    },
                    {
                      "type":"Feature",
                      "properties":{
                        "description":"<strong>Zone 2</strong><a href='' target='_blank'><button>Get Direction</button></a>",
                        "icon":"bicycle"
                      },
                      "geometry":{
                        "type":"Point",
                        "coordinates":[
                            77.6190083,
                            12.9344527
                        ]
                      }
                  },
                  {
                      "type":"Feature",
                      "properties":{
                        "description":"<strong>Zone 3</strong><a href='' target='_blank'><button>Get Direction</button></a>",
                        "icon":"bicycle"
                      },
                      "geometry":{
                        "type":"Point",
                        "coordinates":[
                          77.6183579,
                          12.9353028
                        ]
                      }
                    }
                  ]
              }
            },
            "layout":{
              "icon-image":"cat",
              "icon-size": 0.25,
              "icon-allow-overlap":true
            }
        });
      });
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      this.map.on('click', 'places', (e) => {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
      
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(this.map);
      });
      
      // Change the cursor to a pointer when the mouse is over the places layer.
      this.map.on('mouseenter', 'places', () => {
      this.map.getCanvas().style.cursor = 'pointer';
      });
      
      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', 'places', () => {
      this.map.getCanvas().style.cursor = '';
      });
      }); 
      
      console.log("map", this.map);
  }


  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

}
