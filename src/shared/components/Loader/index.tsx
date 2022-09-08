import React from "react";
import Lottie from 'react-lottie';
import LoadingIcon from "./../../../assets/lotties/loader.json"
import "./loader.scss"

const Loader = () => {


    return <div className="loader__container">
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: LoadingIcon,
                
            }}
        />
    </div>
}

export default Loader