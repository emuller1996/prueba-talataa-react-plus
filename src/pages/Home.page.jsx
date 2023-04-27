import React from "react";
import MyNavBar from "../components/_MyNavBar";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import video from "../video/video_app.mp4";
import apf from "../video/app-debug.apk";
import ListaAsteroidesComponent from "../components/ListaAsteroides";

export default function HomePage() {
  return (
    <>
      <MyNavBar />
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div class="card text-start">
              <div class="card-body">
                <h4 class="card-title">VIDEO APP ANDROID</h4>

                <Video
                  autoPlay
                  loop
                  muted
                  controls={[
                    "PlayPause",
                    "Seek",
                    "Time",
                    "Volume",
                    "Fullscreen",
                  ]}
                >
                  <source src={video} type="video/mp4" />
                </Video>
                <button type="button" class="btn btn-primary w-100 mt-4">
                  <a
                    href={apf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="app-debug.apk"
                    className="text-white text-decoration-none"
                  >
                    DESCARGAR APK
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div class="card text-start">
              <div class="card-body">
                <h4 class="card-title">Lista Asteroides</h4>
                <hr />
            
                <ListaAsteroidesComponent/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
