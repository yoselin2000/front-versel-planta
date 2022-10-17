import React, { useEffect, useState, useRef, Link } from "react";

import { Map, TileLayer, Marker, Popup, LayersControl} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IconLocation, IconLocation1 } from "./IconLocation";
import axios from "axios";
import '../../styles/geolocalizacion.css'
import useGeoLocation from "./useGeolocation";
//import RoutingMachine from './Routing';

const API = process.env.REACT_APP_API;

export const Geolocalizacion = () => {
  const [Loc, setLoc] = useState([]);
  const position = [-17.8965, -65.04534];
  const mapRef = useRef();

  const location = useGeoLocation();
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [busqueda, setBusqueda]= useState("");
  const [locateme, setLocateme]= useState({lat: 0, lon: 0, show: false});

  // From={[,]} To={[, ] }

  // const [start, setStart] = useState([-17.919094245089283, -65.21760078943987])
  // const [end, setEnd] = useState([-17.928995327173805, -64.99313947400455])

  // if(localStorage.getItem('nombre_para_geopo')){
  //   console.log(localStorage.getItem('nombre_para_geopo'))
  //   setBusqueda(localStorage.getItem('nombre_para_geopo'))
  // }
  

  useEffect(() => {
    getLoc();
  }, []);
  
  const getLoc = async () => {
    const result = await axios.get(`${API}/Localizacion`);
    console.log(result.data);
    setLoc(result.data);
  };

      const showMyLocation = () => {
        console.log(navigator.geolocation.getCurrentPosition(success, error, options))
        //leafletElement.getPlan()
      };


      const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }
      
      const filtrar = (terminoBusqueda)=>{
    
        var resultadosBusqueda=Loc.filter((elemento)=>{
          if(elemento.nombre_planta.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        })
        setLoc(resultadosBusqueda);
      }
    
     const mapas = [
      {
        name: "leaflet",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        checked: true
      },
      {
        name: "satelite",
        url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        checked: false
      }
     ] 


     const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      const crd = pos.coords;
    
      console.log('TU POSICION ES:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      
      setLocateme({lat: crd.latitude, lon: crd.longitude, show: true});
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    const clickInfo= async e => {
      const r = await axios.post(`${API}/getinfoplant`, {nombre: e.target.id});
      console.log(r.data.result)
      window.location.href = '/planta_medicinal/' + r.data.result;
    }

   

  return (
    <div>
      <form className="form-inline" >
        <input className="form-control mr-sm-2" value={busqueda} placeholder = "SEARCH" onChange={handleChange}/>
      </form>
      <br/>
     
    <Map
      className="map"
      center={position}
      zoom={10}
      style={{ height: 550, width: "100%" }}>

      {/* <RoutingMachine 
                  position={'topleft'} 
                  start={start} 
                  end={end} 
                  color={'#757de8'} 
      
      /> */}
      <LayersControl position="topright"> 
        {mapas.map(({name, url, checked})=> {
          return(
            <LayersControl.BaseLayer checked={checked} name={name} key={name}>
              <TileLayer url={url}/>
            </LayersControl.BaseLayer>
          )
        })}
      </LayersControl>

      {Loc.map((Lo, index, planta) => (
        <Marker
          position={[Lo.latitud, Lo.longitud]}
          icon={IconLocation}
          title={Lo.nombre_planta}
          key={index}
        >
          <Popup >
 
            <img
              className="popup-img"
              // src={API + "/file/" + planta.imagen}
              src={Lo.imagen}
              alt={Lo.nombre_planta}
            />
            <h4></h4>
            {Lo.nombre_planta} <br /> {"Latitud: " + Lo.latitud} <br />{"Longitud: " + Lo.longitud}{" "} 
          <h1></h1>
          <center>
          <a >
          {/* <a href={`/About`}> */}
              <button id = {Lo.nombre_planta}  className="btn btn-dark btn-sm " onClick={clickInfo} >MAS INFORMACION</button>
              </a>
              </center>
          </Popup>
        
        </Marker>
      ))}

      {locateme.show &&
        <Marker
          position={[locateme.lat, locateme.lon]}
          icon={IconLocation1}
          title='ME'>
        </Marker>
      }



    </Map>
          <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-primary" onClick={showMyLocation}>
              Locate Me
            </button>
          </div>
        </div>
        </div>
  );
};

export default Geolocalizacion;




// import React, { Component } from "react";
// import { Map, TileLayer, withLeaflet, MapControl } from "react-leaflet";
// import MapInfo from "./MapInfo";
// import Routing from "./RoutingMachine";

// export class Geolocalizacion extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       lat: 48.8806628,
//       lng: 2.35194,
//       zoom: 7,
//       isMapInit: false
//     };
//   }

//   saveMap = map => {
//     this.map = map;
//     this.setState({
//       isMapInit: true
//     });
//   };

//   render() {
//     const { lat, lng, zoom } = this.state;
//     const position = [lat, lng];

//     return (
//       <Map center={position} zoom={zoom} ref={this.saveMap}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {this.state.isMapInit && <Routing map={this.map} />}
//       </Map>
//     );
//   }
// }

// export default Geolocalizacion;