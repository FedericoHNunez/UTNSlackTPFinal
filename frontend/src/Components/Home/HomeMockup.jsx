import React from "react";
import "./HomeMockup.css";

export const HomeMockup = () => {
  return (
    <div className="home-mockup">
      <div className="mockup-header">
        <span className="mockup-circle dot-red"></span>
        <span className="mockup-circle dot-yellow"></span>
        <span className="mockup-circle dot-green"></span>
      </div>
      <div className="mockup-body">
        <div className="mockup-sidebar">
          <div className="mockup-workspace-title">UTN Workspace</div>
          <div className="mockup-channel active"># general</div>
          <div className="mockup-channel"># completar-tareas</div>
          <div className="mockup-channel"># entregas-tp</div>
        </div>
        <div className="mockup-chat">
          <div className="mockup-msg">
            <div className="mockup-avatar dot-blue">A</div>
            <div className="mockup-msg-text">
              <strong>Ana</strong>
              <span>¡Bienvenidos al nuevo espacio de trabajo del equipo! 🚀</span>
            </div>
          </div>
          <div className="mockup-msg">
            <div className="mockup-avatar dot-green">M</div>
            <div className="mockup-msg-text">
              <strong>Martín</strong>
              <span>Ya quedaron creados los canales para el TP Final.</span>
            </div>
          </div>
          <div className="mockup-msg">
            <div className="mockup-avatar dot-red">L</div>
            <div className="mockup-msg-text">
              <strong>Lucía</strong>
              <span>¡Excelente! Ahí me sumo a #completar-tareas 🙌</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMockup;

