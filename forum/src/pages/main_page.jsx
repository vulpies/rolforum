import React from "react"
import NavbarCommon from "../components/navbar/navbar_common"
import ProfileSlider from "../components/slider/Slider"

const MainPage = () => {
    return (
        <>
            <NavbarCommon />
            <div className="wrapper">
                <ProfileSlider />
            </div>
        </>
    )
}

export default MainPage
