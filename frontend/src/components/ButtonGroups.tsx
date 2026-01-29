import buttonDetail from "../models/buttonDetail";

export default function ButtonGroups({ buttonDetails }: { buttonDetails: buttonDetail[] }) {
    return (
        <div className="button-groups">
            {buttonDetails.map((buttonDetail) => {
                return buttonDetail.imgButton && (
                    <button
                        // onClick={ }
                        title={buttonDetail.title}
                        key={buttonDetail.label}
                    >
                        {buttonDetail.label}
                    </button>
                )
                !buttonDetail.imgButton && (
                    <button
                        // onClick={ }
                        title={buttonDetail.title}
                        key={buttonDetail.label}
                    >
                        {buttonDetail.label}
                    </button>
                )
            }
            )}

        </div>
    );
}