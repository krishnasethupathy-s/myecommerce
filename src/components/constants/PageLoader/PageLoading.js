import React, { Component } from 'react';
import './PageLoading.css';
import animationData from '../../../assets/loader.json';
import Lottie from 'react-lottie';
export default class componentName extends Component {
    render() {
        const defaultOptions = {
            loop: true,

            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div className="wrapper">
                <div className="animation_View">
                    <Lottie
                        options={defaultOptions}
                        height={50}
                        width={50}
                        style={{ backgroundColor: '#2d2b2b78' }}
                    />
                </div>
            </div>
        );
    }
}
