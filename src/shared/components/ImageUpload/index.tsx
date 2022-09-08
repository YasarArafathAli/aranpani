import React, { FC, Fragment, useRef, useState } from "react";
import "./imageUpload.scss";
import ImageCropper from "../ImageCropper";

interface ImageUploadProps {
  onDelete: () => void;
  placeholderText?: string;
  large?: boolean;
  value?: string | boolean;
  onUpload: (file: File) => void;
}

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { placeholderText, large, onUpload, value, onDelete } = props;

  const [showDelete, setShowDelete] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = () => {
    if (inputRef && inputRef?.current) {
      inputRef.current?.click();
    }
  };

  const handleFile = (event: any) => {
    setShowCropper(true)
      // onUpload(event.target.files[0])
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  if (value && value !== true) {
    return (
      <div className="image-upload__wrapper">
        <img
          className={`image-upload ${large && "image-upload__large"}`}
          src={value}
        />
        <div className={`image-control ${large && "image-control__large"}`}>
          <div className="option">
            {showDelete ? (
              <div className="confirm-delete">
                <p>Are you sure to delete?</p>
                <div className="delete-options">
                  <h5 onClick={handleCloseDelete}>Cancel</h5>
                  <h5 onClick={()=>{
                    onDelete();
                    setShowDelete(false);
                  }}>
                    Delete
                  </h5>
                </div>
              </div>
            ) : (
              <Fragment>
                <a href={value} target={"_blank"}><i className="icon-view-password" /></a>
                <i className="icon-delete" onClick={handleDelete} />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
      <>
        <div
          className={`image-upload ${large && "image-upload__large"}`}
          onClick={handleUploadImage}
        >
          <div className="dotted-border">
            {value === true ? (
              <p>Uploading . . .</p>
            ) : (
              <div className="upload-content">
                <i className="icon-upload"></i>
                <p>{placeholderText}</p>
              </div>
            )}
          </div>
          <input type="file" ref={inputRef} onChange={handleFile} hidden />
        </div>
        <ImageCropper showModal={showCropper}
                      setShowModal={setShowCropper}
                      image={
                        inputRef.current?.files?.length ? inputRef.current?.files[0] : null
                      }
                      onUpload={onUpload}
                      setShowCropper={setShowCropper}
        />
      </>
  );
};

export default ImageUpload;
