import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Spinner } from "../components";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import {
  MdDriveFileRenameOutline,
  MdOutlineCategory,
  MdOutlineDescription,
} from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { IoImagesOutline } from "react-icons/io5";

export const SelectValueField = ({
  options,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <select
      className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
    >
      <option value="">{placeHolder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [forSale, setForSale] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setisLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded to the cloud"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setisLoading(false);
      dispatch(alertSuccess("Image removed from the cloud"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      product_description: description,
      imageURL: imageDownloadURL,
      forSale: forSale,
    };
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("New Item added"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);
      setDescription("");
      setForSale(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <div className="flex items-center w-full px-4 py-3 bg-lightOverlay outline-none rounded-md">
          <MdDriveFileRenameOutline className="mr-2 text-2xl" />
          <InputValueField
            type="text"
            placeHolder={"Item name here"}
            stateFunc={setItemName}
            stateValue={itemName}
          />
        </div>
        <div className="flex items-center w-full px-4 py-3 bg-lightOverlay outline-none rounded-md  gap-3">
          <MdOutlineCategory className="mr-2 text-2xl" />
          <div className="w-2/3 flex items-center justify-around gap-3 flex-wrap">
            {statuses &&
              statuses?.map(
                (data) =>
                  data.id > 0 && (
                    <p
                      key={data.id}
                      onClick={() => setCategory(data.category)}
                      className={`px-4 py-3 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                        data.category === category
                          ? "bg-red-400 text-primary"
                          : "bg-transparent"
                      }`}
                    >
                      {data.category}
                    </p>
                  )
              )}
          </div>
          <div className="flex items-center w-1/3 px-4 py-3 bg-lightOverlay outline-none rounded-md">
            <SelectValueField
              placeHolder="Is the item for sale?"
              options={[
                { label: "For Sale", value: "true" },
                { label: "Not For Sale", value: "false" },
              ]}
              stateValue={forSale}
              stateFunc={setForSale}
            />
          </div>
        </div>

        {/* TODO: Add an element to select if the item is for sale or not for sale */}

        <div className="flex items-center w-full px-4 py-3 bg-lightOverlay outline-none rounded-md">
          <IoIosPricetags className="mr-2 text-2xl" />
          <InputValueField
            type="number"
            placeHolder={"Item price here"}
            stateFunc={setPrice}
            stateValue={price}
          />
        </div>
        <div className="flex items-center w-full px-4 py-3 bg-lightOverlay outline-none rounded-md">
          <MdOutlineDescription className="mr-2 text-2xl" />
          <InputValueField
            type="text"
            placeHolder={"Item description here"}
            stateFunc={setDescription}
            stateValue={description}
          />
        </div>

        <div className="flex items-center w-full px-4 py-3 bg-lightOverlay outline-none rounded-md">
          <IoImagesOutline className="mr-2 text-2xl" />

          <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
                {Math.round(progress > 0) && (
                  <div className=" w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-base font-medium text-textColor">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-textColor">
                        {Math.round(progress) > 0 && (
                          <>{`${Math.round(progress)}%`}</>
                        )}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          width: `${Math.round(progress)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {!imageDownloadURL ? (
                  <>
                    <label>
                      <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                        <div className="flex flex-col justify-center items-center cursor-pointer">
                          <p className="font-bold text-4xl">
                            <FaCloudUploadAlt className="-rotate-0" />
                          </p>
                          <p className="text-lg text-textColor">
                            Click to upload an image
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className=" w-0 h-0"
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <div className="relative w-full h-full overflow-hidden rounded-md">
                      <motion.img
                        whileHover={{ scale: 1.15 }}
                        src={imageDownloadURL}
                        className=" w-full h-full object-cover"
                      />

                      <motion.button
                        {...buttonClcik}
                        type="button"
                        className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={() =>
                          deleteImageFromFirebase(imageDownloadURL)
                        }
                      >
                        <MdDelete className="-rotate-0" />
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClcik}
          className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
