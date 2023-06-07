"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ConstImg from "../../../public/infinity.png";
import MergeImg from "../../../public/usb.png";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface SignUpModalProps {
  userID: string;
  onClose?: () => void;
}

export default function SignUpModal({ userID, onClose }: SignUpModalProps) {
  const currentPath = usePathname();
  const router = useRouter();
  const userIDprop = userID;
  type UserData = {
    name: string;
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    password: string;
    address: string;
    city: string;
    premium: boolean;
    geoloc: number[];
    lukqhdsngvkfq: boolean;
    languages: string[];
    sex: string;
    attraction: string[];
    profileStatus: string;
    profilePicture: string;
    pictures: string[];
    swipe: number;
    timerSwipe: null | string;
    matched: string[];
    rejected: string[];
    chatIds: string[];
  };

  const [userData, setUserData] = React.useState<UserData>({
    name: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    address: "",
    city: "",
    premium: false,
    geoloc: [],
    lukqhdsngvkfq: false,
    languages: [],
    sex: "",
    attraction: [],
    profileStatus: "",
    profilePicture: "",
    pictures: [],
    swipe: 0,
    timerSwipe: null,
    matched: [],
    rejected: [],
    chatIds: [],
  });

  const [errors, setErrors] = React.useState({
    name: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const [errors2, setErrors2] = React.useState({
    age: "",
    languages: "",
  });
  const [errors3, setErrors3] = React.useState({
    sex: "",
    attraction: "",
  });
  const [errors4, setErrors4] = React.useState({
    pictures: "",
    profilePicture: "",
  });
  const [errors5, setErrors5] = React.useState({
    profileStatus: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userIDprop}`);
        const userData = response.data.data;
        setUserData(userData);
      } catch (error) {
        // Handle error if the user data couldn't be fetched
        console.error("Error fetching user data:", error);
      }
    };

    if (userIDprop) {
      fetchUserData();
    }
  }, [userIDprop]);

  const updateUser = async () => {
    try {
      const response = await axios.put(`/api/users/${userIDprop}`, userData);
      console.log(userData);
      console.log(response.data);
      // need a router push to index + toaster
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user data to prefill the user info
  //   React.useEffect(() => {
  //     const userId = Cookies.get('_id'); // replace '_id' with your actual cookie key

  //     if (userId) {
  //       fetch(`/api/users/${userId}`)
  //         .then(response => response.json())
  //         .then(data => {
  //           setUserData(data);
  //         })
  //         .catch((error) => console.error(error));
  //     }
  //   }, []);

  const [currentSlide, setCurrentSlide] = React.useState(1);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
    console.log("JE CHANGE DE SLIDE");
  };
  const prevSlide = () => setCurrentSlide((prevSlide) => prevSlide - 1);

  // ADRESS MANAGEMENT FOR USER
  type Suggestion = {
    properties: {
      label: string;
    };
  };

  const [addressSuggestions, setAddressSuggestions] = useState<Suggestion[]>(
    []
  );

  const fetchAddressSuggestions = async (query: string) => {
    console.log("I GO FETCH SUGGESTION", query);
    const response = await axios.get(`/api/addresscompletion?query=${query}`);
    console.log("MY FETCH", response.data.features);
    setAddressSuggestions(response.data.features);
  };

  // would this work ?
  const debounce = (func: (arg: string) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout | null;
    return (arg: string) => {
      clearTimeout(debounceTimer!);
      debounceTimer = setTimeout(() => func(arg), delay);
    };
  };

  const delayedRequest = useRef(debounce(fetchAddressSuggestions, 500)).current;

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("MY INPUT", event.target.value);
    handleInputChange(event);
    delayedRequest(event.target.value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setUserData((prevState) => ({
      ...prevState,
      address: suggestion.properties.label,
      city: suggestion.properties.city,
      geoloc: [suggestion.properties.x, suggestion.properties.y],
    }));
    setAddressSuggestions([]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      const isChecked = target.checked;
      const checkedValue = target.value;
      if (name === "languages" || name === "attraction") {
        setUserData((prevState: UserData) => ({
          ...prevState,
          [name]: isChecked
            ? [...prevState[name], checkedValue]
            : prevState[name].filter((item: string) => item !== checkedValue),
        }));
      }
    } else {
      setUserData((prevState: UserData) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const data = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]);
        data.append("upload_preset", "kjeqxjut");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dgarygsq5/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const file = await response.json();

        setUserData((prevState) => ({
          ...prevState,
          pictures: [...prevState.pictures, file.secure_url],
        }));
      }
    }
  };

  const setProfilePicture = (url: string) => {
    setUserData((prevState) => ({
      ...prevState,
      profilePicture: url,
    }));
  };

  const handleRemovePicture = (picture: String) => {
    // Remove picture from state
    setUserData((prevState) => ({
      ...prevState,
      pictures: prevState.pictures.filter((pic) => pic !== picture),
    }));
  };
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  // SLIDE 1
  const submitSlide1 = (event: any) => {
    console.log("COUCOU");
    event.preventDefault();
    let newErrors = {
      name: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    // Je valide si met input sont fill
    if (!userData.name) newErrors.name = "This input is required";
    if (!userData.firstName) newErrors.firstName = "This input is required";
    if (!userData.lastName) newErrors.lastName = "This input is required";

    // je display mon error si input pas rempli
    if (!newErrors.name && !newErrors.firstName && !newErrors.lastName) {
      console.log(userData);
      console.log("je vais changé de slide");
      nextSlide();
      console.log("je vais changé de slide");
    } else {
      setErrors(newErrors);
    }
  };

  // SLIDE 2
  const submitSlide2 = (event: any) => {
    event.preventDefault();
    let newErrors2 = {
      age: "",
      languages: "",
    };

    if (!userData.age) {
      newErrors2.age = "This input is required";
    } else if (calculateAge(userData.age) < 18) {
      newErrors2.age = "You must be over 18 to create a profile";
    }
    if (!userData.languages || userData.languages.length < 1) {
      newErrors2.languages = "At least one language must be selected.";
    }
    if (userData.languages.length > 2) {
      newErrors2.languages = "You can't select more than 2 languages.";
    }

    if (!newErrors2.age && !newErrors2.languages) {
      console.log("my user data2 =>", userData);
      nextSlide();
    } else {
      setErrors2(newErrors2);
    }
  };

  //    SLIDE 3
  const submitSlide3 = (event: any) => {
    console.log("COUCOU");
    event.preventDefault();
    let newErrors3 = {
      sex: "",
      attraction: "",
    };
    // Je valide si met input sont fill
    if (!userData.sex) newErrors3.sex = "This input is required";
    if (userData.attraction.length === 0)
      newErrors3.attraction = "This input is required";

    // je display mon error si input pas rempli
    if (!newErrors3.sex && !newErrors3.attraction) {
      console.log("My userData3", userData);
      console.log("je vais changé de slide");

      nextSlide();

      console.log("je vais changé de slide");
    } else {
      setErrors3(newErrors3);
    }
  };

  // SLIDE 4
  const submitSlide4 = (event: any) => {
    event.preventDefault();

    let newErrors4 = {
      pictures: "",
      profilePicture: "",
    };

    // Je valide si met input sont fill
    if (!userData.pictures || userData.pictures.length === 0)
      newErrors4.pictures = "This input is required";
    if (!userData.profilePicture)
      newErrors4.profilePicture = "A profile picture is required";

    // je display mon error si input pas rempli
    if (newErrors4.profilePicture || newErrors4.pictures) {
      setErrors4(newErrors4);
    } else {
      console.log(userData);
      nextSlide();
    }
  };

  // SLIDE 5
  const submitSlide5 = (event: any) => {
    event.preventDefault();

    let newErrors5 = {
      profileStatus: "",
    };

    if (!userData.profileStatus)
      newErrors5.profileStatus = "This input is required";

    if (!newErrors5.profileStatus) {
      console.log(userData);
      updateUser();

      if (currentPath === "/myprofile") {
        if (onClose) {
          onClose();
        }
        router.push("/myprofile");
      } else if (currentPath === "/complete_profile") {
        router.push("/");
      }
    } else {
      setErrors5(newErrors5);
    }
  };
  return (
    //min-h-screen
     <div  className="hero h-[90vh] w-full"
     style={{
       backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
     }}>
      
    <input type="checkbox"      defaultChecked={true} id="my-modal-signup" className="modal-toggle" />
    
        <div className="modal">
        <div className="modal-box p-10 bg-black-lover">
          {currentPath === "/complete_profile" ? (
            <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">
              Welcome to console.love dear friend! {userIDprop}
            </h3>
          ) : null}
          {currentPath === "/myprofile" ? (
            <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">
              Edit your profile
            </h3>
          ) : null}{" "}
          <div className="carousel w-full h-72">
            {currentSlide === 1 && (
              <div id="slide1" className="carousel-item relative w-full mx-2">
                <form className="flex flex-col mx-auto w-96">
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered input-info w-full my-2"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <div className="text-red-600">{errors.name}</div>
                  )}
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered input-info w-full my-2"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <div className="text-red-600">{errors.firstName}</div>
                  )}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered input-info w-full my-2"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <div className="text-red-600">{errors.lastName}</div>
                  )}
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      className="input input-bordered input-info w-full my-2"
                      name="address"
                      value={userData.address}
                      onChange={handleAddressChange}
                    />
                    {errors.address && (
                      <div className="text-red-600">{errors.address}</div>
                    )}

                    {/* Display clickable address suggestions */}
                    {addressSuggestions && addressSuggestions.length > 0 && (
                      <div className="bg-white">
                        {addressSuggestions
                          .slice(0, 5)
                          .map((suggestion, index) => (
                            <p
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="suggestion-item"
                            >
                              {suggestion.properties.label}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                  {errors.lastName && (
                    <div className="text-red-600">{errors.lastName}</div>
                  )}
                  <button
                    type="submit"
                    onClick={submitSlide1}
                    className="btn btn-circle bg-blue-lover place-self-end"
                  >
                    ❯
                  </button>
                </form>
              </div>
            )}
            {currentSlide === 2 && (
              <div id="slide2" className="carousel-item relative w-full mx-2">
                <form className="flex flex-col mx-auto w-96">
                  {errors2.age && (
                    <div className="text-red-600">{errors2.age}</div>
                  )}
                  <label className="label-text text-white font-bold text-md">Date of Birth :</label>
                  <input
                    type="date"
                    value={userData.age}
                    onChange={handleInputChange}
                    name="age"
                    className="input input-bordered input-info w-full my-2"
                  />
                  {errors2.languages && (
                    <div className="text-red-600">{errors2.languages}</div>
                  )}
                  <div className="h-36 overflow-scroll" id="languagesSelect">
                    {[
                      "Java",
                      "Go",
                      "C",
                      "C#",
                      "C++",
                      "Rust",
                      "JavaScript",
                      "Python",
                    ].map((language) => (
                      <div key={language} className="m-1 flex">
                        <input
                          className="checkbox checkbox-secondary"
                          type="checkbox"
                          id={language}
                          name="languages"
                          value={language}
                          checked={userData.languages.includes(language)}
                          onChange={handleInputChange}
                        />
                        <div className="flex items-center">
                          <label
                            className="text-white self-center ml-2"
                            htmlFor={language}
                          >
                            {language}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-[260px]">
                    <button
                      type="submit"
                      onClick={prevSlide}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❮
                    </button>
                    <button
                      type="submit"
                      onClick={submitSlide2}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❯
                    </button>
                  </div>
                </form>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60"></div>
              </div>
            )}

            {currentSlide === 3 && (
              <div id="slide3" className="carousel-item relative w-full mx-2">
                <form className="flex flex-col mx-auto">
                  {errors3.sex && (
                    <div className="text-red-600">{errors3.sex}</div>
                  )}
                  <div className="flex m-2.5">
                    <label className="label-text text-white font-bold text-xl">
                      Sex:
                    </label>
                    <div className="flex flex-col">
                      <div className="flex">
                        <input
                          type="radio"
                          name="sex"
                          value="Male"
                          checked={userData.sex === "Male"}
                          onChange={handleInputChange}
                          className="radio radio-secondary"
                        />
                        <label className="label-text text-white m-1 ml-2.5">Male</label>
                      </div>
                      <div className="flex">
                        <input
                          type="radio"
                          name="sex"
                          value="Female"
                          checked={userData.sex === "Female"}
                          onChange={handleInputChange}
                          className="radio radio-secondary"
                        />
                        <label className="label-text text-white m-1 ml-2.5">Female
                        </label>
                      </div>
                      <div className="flex">
                        <input
                          type="radio"
                          name="sex"
                          value="Other"
                          checked={userData.sex === "Other"}
                          onChange={handleInputChange}
                          className="radio radio-secondary"
                        />
                        <label className="label-text text-white m-1 ml-2.5">Other
                        </label>
                      </div>
                    </div>
                  </div>
                  {errors3.attraction && (
                    <div className="text-red-600">{errors3.attraction}</div>
                  )}
                  <div className="flex m-2.5">
                    <label className="label-text text-white font-bold text-xl">
                      Attraction:
                    </label>
                    <div className="flex-col">
                      <div className="flex">
                        <label className="label-text text-white m-1">Male</label>
                        <input
                          type="checkbox"
                          name="attraction"
                          value="Male"
                          checked={userData.attraction.includes("Male")}
                          onChange={handleInputChange}
                          className="checkbox checkbox-secondary"
                        />
                      </div>
                      <label className="label-text text-white m-1 ml-2.5">
                        Female
                      </label>
                      <input
                        type="checkbox"
                        name="attraction"
                        value="Female"
                        checked={userData.attraction.includes("Female")}
                        onChange={handleInputChange}
                        className="checkbox checkbox-secondary"
                      />
                      <label className="label-text text-white m-1 ml-2.5">
                        Other
                      </label>
                      <input
                        type="checkbox"
                        name="attraction"
                        value="Other"
                        checked={userData.attraction.includes("Other")}
                        onChange={handleInputChange}
                        className="checkbox checkbox-secondary"
                      />
                    </div>
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                    <button
                      type="submit"
                      onClick={prevSlide}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❮
                    </button>
                    <button
                      type="submit"
                      onClick={submitSlide3}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❯
                    </button>
                  </div>
                </form>
              </div>
            )}
            {currentSlide === 4 && (
              <div id="slide4" className="carousel-item relative w-full mx-2 ">
                <form className="flex flex-col mx-auto w-96">
                  <input
                    type="file"
                    placeholder="Profile picture"
                    multiple
                    onChange={handleUpload}
                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                  />
                  {errors4.pictures && (
                    <div className="text-red-600">{errors4.pictures}</div>
                  )}

                  <div className="flex text-white mt-2">
                    {userData.pictures.map((picture, index) => {
                      let transformedUrl = picture.replace(
                        "/upload/",
                        "/upload/w_100,h_100,c_fill,g_auto/"
                      );
                      return (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Image
                            src={transformedUrl}
                            alt={`Uploaded Preview ${index + 1}`}
                            width={75}
                            height={75}
                            onClick={() => setProfilePicture(picture)}
                          />
                          <button
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              backgroundColor: "red",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              border: "none",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "14px",
                              padding: 0,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRemovePicture(picture);
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {userData.pictures && (
                    <div className="text-white ">
                      Select a profile picture among the uploaded images
                    </div>
                  )}
                  {errors4.profilePicture && (
                    <div className="text-red-600">{errors4.profilePicture}</div>
                  )}

                  {userData.profilePicture && (
                    <div className="place-self-center text-white ">
                      <b>Profile Pic:</b>
                      <Image
                        className="m-0"
                        src={userData.profilePicture}
                        alt="Profile"
                        width={100}
                        height={100}
                      />
                    </div>
                  )}

                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                    <button
                      type="submit"
                      onClick={prevSlide}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❮
                    </button>
                    <button
                      type="submit"
                      onClick={submitSlide4}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❯
                    </button>
                  </div>
                </form>
              </div>
            )}
            {currentSlide === 5 && (
              <div id="slide5" className="carousel-item relative w-full mx-2">
                <form className="flex flex-col mx-auto w-96">
                  <div className="flex w-full">
                    <button
                      className={`btn h-36 ${
                        userData.profileStatus === "Merge"
                          ? "btn-primary"
                          : "btn-active"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setUserData((prev) => ({
                          ...prev,
                          profileStatus: "Merge",
                        }));
                      }}
                    >
                      <div>
                        <Image
                          style={{ margin: "auto" }}
                          src={MergeImg}
                          width={75}
                          height={75}
                          alt=""
                        ></Image>
                        <div className="mt-5">
                          {" "}
                          <span className="text-pink-lover">Merge</span>{" "}
                          <span className="text-blue-lover">one night</span>
                        </div>
                      </div>
                    </button>
                    <div className="divider divider-horizontal text-white font-bold">
                      OR
                    </div>
                    <button
                      className={`btn h-36 ${
                        userData.profileStatus === "Const"
                          ? "btn-primary"
                          : "btn-active"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setUserData((prev) => ({
                          ...prev,
                          profileStatus: "Const",
                        }));
                      }}
                    >
                      <div>
                        <Image
                          style={{ margin: "auto" }}
                          src={ConstImg}
                          width={75}
                          height={75}
                          alt=""
                        ></Image>
                        <div className="mt-5">
                          {" "}
                          <span className="text-pink-lover">Const</span>{" "}
                          <span className="text-blue-lover">for life</span>
                        </div>{" "}
                      </div>
                    </button>
                    {errors5.profileStatus && (
                      <div className="text-red-600">
                        {errors5.profileStatus}
                      </div>
                    )}
                  </div>

                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 mt-60">
                    <button
                      type="submit"
                      onClick={prevSlide}
                      className="btn btn-circle bg-blue-lover "
                    >
                      ❮
                    </button>
                    {currentPath === "/myprofile" ? (
                      <button
                        className="btn bg-pink-lover "
                        onClick={submitSlide5}
                      >
                        Edit
                      </button>
                    ) : null}
                    {currentPath === "/complete_profile" ? (
                      <button
                        className="btn bg-pink-lover "
                        onClick={submitSlide5}
                      >
                        Start the adventure
                      </button>
                    ) : null}
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="w-full place-items-center flex justify-center">
            {currentPath === "/myprofile" ? (
              <button className="btn btn-error mx-auto" onClick={onClose}>
                Close
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
