// import { MapLayer } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import { withLeaflet } from "react-leaflet";


// class Routing extends MapLayer {
//  constructor(props) {
//     super(props);
//   }

//   createLeafletElement() {
//     const { map, From, To, icon,  removeFrom, removeTo } = this.props;


//     var dStart = L.latLng(From[0], From[1]);
//     var dGoal = L.latLng(To[0], To[1]);


//     this.leafletElement = L.Routing.control({
//       collapsible: true,
//        lineOptions: {
//       styles: [{color: 'chartreuse', opacity: 1, weight: 5}]
//      },
//       waypoints: [dStart, dGoal],
//       createMarker: function(i, waypoints, n) {
//         if (i === 0) {
//          marker_icon = icon.startIcon;
//         }


//        var marker_icon;
//         if (i === 0) {
//          marker_icon = icon.startIcon;
//         }
//         else if (i == n - 1) {
//          marker_icon = icon.endIcon
//         }
//         var marker = L.marker(i === 0 ? dStart : dGoal,{
//          draggable: true,
//          icon: marker_icon
//         });
//         return marker;
//      }
//     }).addTo(map.leafletElement);

//     return this.leafletElement.getPlan();
//   }

//   updateLeafletElement(props) {
//     if(this.leafletElement){
//       if(this.props.isRoutingDone === false){
// this.leafletElement.spliceWaypoints(0, 2); // <-- removes your route
//       }
//     }
//   }

// }
// export default withLeaflet(Routing);


import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ position, start, end, color }) => {
  const instance = L.Routing.control({
    position,
    waypoints: [
      start,
      end
    ],
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;