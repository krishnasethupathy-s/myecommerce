import React, { Component } from 'react';
import './FooterCallButton.css';
import Images from '../constants/images';
export default class FooterCallButton extends Component {
    handleClick = () => {
        var element = document.getElementById("navPanel");
        var InterCom = document.getElementById("InterCom");
        var closeBtn = document.getElementById("interClose");

        element.classList.add("active");
        closeBtn.classList.add("active");
        InterCom.classList.remove("active");

    }

    CloseHandle = () => {
        var element = document.getElementById("navPanel");
        var InterCom = document.getElementById("InterCom");
        var closeBtn = document.getElementById("interClose");

        element.classList.remove("active");
        closeBtn.classList.remove("active");
        InterCom.classList.add("active");
    }
    render() {
        return (
            <div className="wrapper">
                <div class="navPanel" id="navPanel">
                    <div class="link link1">
                        <figure>
                            <img class="img-responsive lazy" data-src={Images.footer_Phone} alt="callback" src={Images.footer_Phone} /></figure>
                        <span>Call Back</span></div>
                    <div class="link link2">
                        <figure>
                            <img class="img-responsive lazy" data-src={Images.footer_Meeting} alt="meeting" src={Images.footer_Meeting} /></figure>
                        <span>Meeting</span></div>
                    <div class="link link3">
                        <figure>
                            <img class="img-responsive lazy" data-src={Images.footer_whatsup} alt="whatsup" src={Images.footer_whatsup} /></figure>
                        <span>Whatsapp</span></div>
                </div>

                <div class="intercom active" id="InterCom">
                    <img onClick={this.handleClick} class="img-responsive lazy" data-src={Images.footer_intercom}
                        alt="intercom-icon" src={Images.footer_intercom} />
                </div>

                <div class="intercomCloseBtn" id="interClose" onClick={this.CloseHandle}>
                    <img onClick={this.handleClick} class="img-responsive lazy" data-src={Images.footer_close}
                        alt="intercom-icon" src={Images.footer_close} />
                </div>


            </div>
        );
    }
}
