import crypto from "crypto";

export const checkImage = (file: File) => {
    const types = ["image/png", "image/png", "image/jpeg", "image/svg+xml"];
    let err = "";
    if (!file) return (err = "File does not exist.");
    if (file.size > 1024 * 1024) return (err = "The largest image size is 1mb");

    if (!types.includes(file.type))
        err = "The file type must be png / jpg / jpeg / svg";
    return err;
};

const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = Date.now();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const imageUpload = async (file: File) => {
    const cloudName = "dzdqy3wfg";
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "t314ovux");
    formData.append("cloud_name", cloudName);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return { public_id: data.public_id, url: data.secure_url };
};


export const handleDeleteImage = async (publicId: any) => {
    const cloudName = 'dzdqy3wfg';
    const timestamp = new Date().getTime();
    const apiKey = '991617455618985';
    const apiSecret = 'W604bRhre6o_Ngc2EDIiOpU9uvE';
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    try {

        // const response = await axios.post(url, {
        //     public_id: publicId,
        //     signature: signature,
        //     api_key: apiKey,
        //     timestamp: timestamp,
        // });

        // console.error(response);

        const formData = new FormData();

        formData.append("public_id", publicId);
        formData.append("signature", signature);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());


        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error);
    }
};
