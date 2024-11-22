import React, { useEffect } from "react";
import "./Model.css";

const Model = ({ children, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    const handleOverlayClick = (e) => {
        if (e.target.className === "model_owerlay") {
            onClose();
        }
    };

    return (
        <div className="model">
            <div
                className="model_owerlay"
                onClick={handleOverlayClick}
            >
            </div>

            <div className="model_content">
                {children}
            </div>
        </div>
    );
};

export default Model;
