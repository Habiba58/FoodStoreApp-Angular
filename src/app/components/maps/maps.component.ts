import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  latLng,
  map,
  marker,
  tileLayer,
} from 'leaflet';
import { MapManagerService } from 'src/app/services/map-manager.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  @Input() order!: Order;
  private readonly MARKUP_ZOOM_LEVEL = 16;
  private readonly MARKUP_ZOOM_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFUALT_LATLNG: LatLngTuple = [13.75, 21.62];
  //static:true means that this elementRef will be visible on the ngonint.
  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
  constructor(private mapManger: MapManagerService) {}
  ngOnInit(): void {
    this.intializeMap();
  }
  intializeMap() {
    if (this.map) return;
    else {
      this.map = map(this.mapRef.nativeElement, {
        attributionControl: false,
      }).setView(this.DEFUALT_LATLNG, 1);
      tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
      this.map.on('click', (e: LeafletMouseEvent) => {
        this.setMarker(e.latlng);
      });
    }
  }
  findMyLoaction() {
    this.mapManger.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKUP_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }
  setMarker(latlng: LatLngExpression) {
    // after equal refers to the parameter passed to the function;
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKUP_ZOOM_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }
  set addressLatLng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLong = latlng;
  }
}
