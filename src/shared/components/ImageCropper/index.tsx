import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import "./imageCropper.scss"
import {Button, Modal} from "antd";
import Cropper from "react-easy-crop";
import {getCroppedImg} from '../../utils/cropImage';

interface ImageCropperProps {
    showModal: boolean;
    setShowModal: Function;
    setShowCropper: Function;
    image: File | null;
    onUpload: (file: File) => void;
}

const ImageCropper: FC<ImageCropperProps> = ({showModal, setShowModal, image,onUpload,setShowCropper}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1.2)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [croppedImage, setCroppedImage] = useState<any>(null)
    const [srcImage, setSrcImage] = useState<any>(null)

    useEffect(()=>{
        if (image) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setSrcImage(reader.result)
            );
            reader.readAsDataURL(image);
        }
    },[image])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const onClose = useCallback(() => {
        setShowModal(false);
        setCroppedImage(null);
    }, [])

    useEffect(()=>{
        if(croppedAreaPixels && srcImage)
         getCroppedImg(
            srcImage,
            croppedAreaPixels,
            rotation,
        ).then((croppedImage)=>{
             setCroppedImage(croppedImage)
         })
    },[croppedAreaPixels, srcImage])

    const handleSave = () => {
        onUpload(croppedImage);
        setShowCropper(false);
    }

    return (
        <div className="image-cropper">
            <Modal title={
                <div className="modal-title">
                    <h2>Crop Image</h2>
                    <i className="icon-close" onClick={onClose} />
                </div>
            }
                   visible={showModal}
                   onCancel={onClose}
                   className="create-project-modal create-payment-modal image-cropper-modal"
            >
                <div className="image-cropper__container">
                    <Cropper
                        image={srcImage}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropSize={{ width: 250, height: 300 }}
                    />
                </div>
                <Button type={"primary"}
                        onClick={handleSave}
                >
                    Crop & Save
                </Button>
            </Modal>
        </div>
    )
}

export default ImageCropper;