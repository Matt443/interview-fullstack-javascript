interface CountInputProps {
    label: string;
    inputCallback: (value: string) => void;
    value: string;
    placeholder: string;
}
const CountInput: React.FC<CountInputProps> = ({ label, inputCallback, value, placeholder }) => {
    return (
        <>
            <div className="input-container flex flex-col my-2 lg:flex-row lg:items-center items-start lg:mr-2 w-[100%] lg:max-w-[300px]">
                <label htmlFor="count-min" className="text-white whitespace-nowrap">
                    {label}
                </label>
                <input
                    value={value}
                    placeholder={placeholder}
                    type="number"
                    min="0"
                    max="999999"
                    id="count-min"
                    className="border-2 border-green-700 focus:border-green-400 outline-none p-2 rounded-sm text-sm text-white lg:ml-2 w-[100%]"
                    onInput={(event) => inputCallback((event.target as HTMLInputElement).value)}
                />
            </div>
        </>
    );
};

export default CountInput;
