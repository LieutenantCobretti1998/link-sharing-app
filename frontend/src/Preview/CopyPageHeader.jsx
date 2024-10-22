import {useSelector} from "react-redux";

function CopyPageHeader() {
    const {blendedColor} = useSelector(state => state.saveChooses);
    return (
        <div className=" w-full h-64 rounded-b-3xl"
                 style={{
                     backgroundColor: blendedColor ? blendedColor : "#4015f8"
                 }}
            >
            </div>
    )
}

export default CopyPageHeader;