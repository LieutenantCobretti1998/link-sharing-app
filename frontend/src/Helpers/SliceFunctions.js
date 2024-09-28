import {platforms} from "../Platforms/PreDefaultPlatForms.jsx";
import {backgrounds} from "../BackgroundImages/BackgroundImages.jsx";

const getPlatformColor = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.color : null;
    };
const getBackgroundImage = (label) => {
        const background = backgrounds.find((image) => image.value === label);
        return background ? background.image: null;
    };

const getPlatformIcon = (label) => {
        const platform = platforms.find((p) => p.label === label);
        return platform ? platform.icon : null;
    };

export {getPlatformIcon, getPlatformColor, getBackgroundImage}