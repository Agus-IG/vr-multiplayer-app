// src/VRScene.js
import React, { useEffect } from "react";
import "aframe";
import "aframe-extras";
import "aframe-particle-system-component";
import "networked-aframe";
import NAF from 'networked-aframe';

const VRScene = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/networked-aframe/naf/dist/naf.min.js";
    script.async = true;
    document.body.appendChild(script);

    const janusScript = document.createElement("script");
    janusScript.src =
      "https://cdn.jsdelivr.net/gh/networked-aframe/naf-janus-adapter/dist/naf-janus-adapter.min.js";
    janusScript.async = true;
    document.body.appendChild(janusScript);

    // Configurar conexión WebSocket
    script.onload = () => {
      NAF.init({
        debug: true,
        useAudio: false,
        adapter: new NAF.adapters.Janus({
          url: "ws://localhost:3000", // URL del servidor WebSocket
        }),
      });
    };

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(janusScript);
    };
  }, []);

  return (
    <a-scene>
      <a-box position="0 1.6 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder
        position="1 0.75 -3"
        radius="0.5"
        height="1.5"
        color="#FFC65D"
      ></a-cylinder>
      <a-plane
        position="0 0 -4"
        rotation="-90 0 0"
        width="4"
        height="4"
        color="#7BC8A4"
      ></a-plane>
      <a-sky color="#ECECEC"></a-sky>

      {/* Networked Entities */}
      <a-entity
        id="player"
        networked="template:#avatar-template;attachTemplateToLocal:false;"
      >
        <a-camera></a-camera>
        <a-cursor></a-cursor>
      </a-entity>

      <script id="avatar-template" type="text/html">
        <a-entity>
          <a-box position="0 0.5 0" rotation="0 45 0" color="#4CC3D9"></a-box>
        </a-entity>
      </script>
    </a-scene>
  );
};

export default VRScene;
