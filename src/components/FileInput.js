import React, { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, initialPreview, onChange }) => {
    const [prevImg, setPrevImg] = useState(initialPreview);
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue);
    };

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = "";
        onChange(name, null);
    };

    useEffect(() => {
        if (!value) return;

        const objectURL = URL.createObjectURL(value);
        setPrevImg(objectURL);

        return () => {
            setPrevImg(initialPreview);
            URL.revokeObjectURL(objectURL);
        };
    }, [value, initialPreview]);

    return (
        <div>
            <img src={prevImg} alt="이미지 미리보기" />
            <input
                name={name}
                type="file"
                onChange={handleFileChange}
                ref={inputRef}
            />
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
};

export default FileInput;
