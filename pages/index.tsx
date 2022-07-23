import * as AWS from "aws-sdk";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Head from "next/head";

const Home = () => {
  //Upload file state (array of objects)
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  //Get localstorage item keys (array of strings)
  const [keyName, setKeyName] = useState<string[]>([]);

  //Initialize S3 aws-sdk
  const s3 = new AWS.S3({
    endpoint: process.env.REACT_APP_S3_BUCKET_ENDPOINT,
    credentials: {
      accessKeyId: process.env.REACT_APP_S3_BUCKET_KEY,
      secretAccessKey: process.env.REACT_APP_S3_BUCKET_SECRET,
    },
    region: "sqp1",
  });

  //Handle input
  const handleFileInput = (e: any) => {
    if (e.target.files[0]) {
      setSelectedFile([...selectedFile, e.target.files[0]]);
    }
  };

  //Set unique key name for localstorage
  const key = (i: number): string => {
    const c = new Date();
    return c.getTime().toString() + i.toString();
  };

  //Upload file
  const uploadFile = async (file: any) => {
    let locationArray: string[] = [];
    let keys = "";
    const existingKeys = localStorage.getItem("keys");
    if (existingKeys) {
      keys = existingKeys;
    }
    //Loop to upload multiple files
    for (let i = 0; i < file.length; i++) {
      const params = {
        ACL: "public-read",
        Body: file[i],
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
        Key: `radityaam/${file[i].name}`,
      };
      try {
        let response = await s3.upload(params).promise();
        console.log(response);

        //Get and set keys from and to localstorage
        let keySaved = key(i);
        localStorage.setItem(keySaved, response.Location);
        locationArray.push(response.Location);
        keys = keys ? `${keys}|${keySaved}` : keySaved;
        localStorage.setItem("keys", keys);
      } catch (error) {
        console.log(error);
      }
    }
    //Set Key
    setKeyName([...keyName, ...locationArray]);
    //Reset file array
    setSelectedFile([]);
  };
  console.log(keyName);

  //If user has already uploaded files get those items too from localstorage
  useEffect(() => {
    let existingKeys = localStorage.getItem("keys");
    if (existingKeys) {
      let files: any;
      let splitExistingKeys = existingKeys.split("|");
      for (let key of splitExistingKeys) {
        let file = localStorage.getItem(key);
        files = files ? `${files}|${file}` : file;
      }
      let insertFiles = files.split("|");
      setKeyName(insertFiles);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen pb-5">
      <Head>
        <title>Image Uploader | radityaAqil</title>
      </Head>
      <div className="flex justify-center mx-8 lg:mx-0">
        <div className="pt-20 text-white text-7xl">Image Uploader</div>
      </div>
      <div className="flex justify-center">
        <div className="pt-10 space-x-10">
          <input
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = "";
            }}
            hidden
            id="fileupload"
            type="file"
            onChange={handleFileInput}
          />
          <label htmlFor="fileupload" className="label-input">
            Choose File
          </label>
          <button
            className="button-upload"
            onClick={() => uploadFile(selectedFile)}
          >
            Upload File
          </button>
        </div>
      </div>
      <div className="text-white text-center mx-auto mt-4">{`${selectedFile.length} files selected`}</div>

      <div className="flex gap-10 pt-10">
        <div className="w-1/2 flex flex-col items-center">
          <div className="text-white text-lg font-bold tracking-wider pb-5">
            Selected Files
          </div>
          {selectedFile.length > 0 ? (
            selectedFile.map((val, index) => {
              return (
                <div
                  className={`${
                    index < selectedFile.length - 1 ? "mb-6" : null
                  } relative`}
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(val)}
                    alt={`Image-${index}`}
                    className="rounded-lg object-cover h-[130px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(selectedFile.filter((e) => e !== val));
                    }}
                    className="delete-button"
                  >
                    <IoClose />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-white text-2xl mt-36">Start Uploading!</div>
          )}
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <div className="text-white text-lg font-bold tracking-wider pb-2">
            Recently Uploaded Images
          </div>
          {keyName
            ? keyName.map((val, index) => {
                return (
                  <img
                    className={`h-[130px] object-cover rounded-lg ${
                      index < keyName.length - 1 ? "mb-2" : null
                    }`}
                    key={index}
                    src={val}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
