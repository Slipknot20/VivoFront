
interface LineProps {
    color?: string;
    margin?: string;
    width?: string;
    thickness?: string;
}

const Line: React.FC<LineProps> = ({
    color = "border-line",
    width = 'w-full',
    thickness = 'border-2',
    margin= 'mt-0'
}) => {
    return (
        <div className={`flex`}>
            <hr className={`border-solid ${color} ${width} ${thickness} ${margin}`} />
        </div>
    );
};

export default Line;
