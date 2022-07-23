import { IoClose } from "react-icons/io5";

const UploadCard = ({ selectedFile, setSelectedFile, index, val }: any) => {
  return (
    <div
      className={`${index < selectedFile.length - 1 ? "mb-6" : null} relative`}
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
          setSelectedFile(selectedFile.filter((e: any) => e !== val));
        }}
        className="delete-button"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default UploadCard;
