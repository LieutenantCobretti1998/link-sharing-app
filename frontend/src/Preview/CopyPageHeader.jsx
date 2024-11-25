// eslint-disable-next-line react/prop-types
function CopyPageHeader({backgroundColor}) {
    return (
        <div className=" w-full h-64"
                 style={{
                     backgroundColor: backgroundColor ? backgroundColor : "#4015f8"
                 }}
            >
            </div>
    )
}

export default CopyPageHeader;