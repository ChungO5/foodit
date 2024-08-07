import React from "react";

const FileInput = ({ name, value, onChange }) => {
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        onChange(e.target.name, e.target.files[0]);
    };

    return <input name={name} type="file" onChange={handleFileChange} />;
};

export default FileInput;
