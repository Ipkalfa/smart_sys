import { TouchableOpacity, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "../constants";
import { getDevicesData, updateDeviceStatus, getCurrentUserId } from "../lib/appwrite"; // Adjust the import path as needed

const SwitchButton = ({ title, containerStyles, textStyles, isLoading }) => {
  const [status, setStatus] = useState(false); // Initialize the state variable
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const fetchDocumentId = async () => {
      try {
        const userId = await getCurrentUserId();
        const payload = await getDevicesData(userId);
        setDocumentId(payload.id);
        setStatus(payload.status);
      } catch (error) {
        console.error("Error fetching document ID:", error);
      }
    };

    fetchDocumentId();
  }, []);

  const toggleState = async () => {
    if (!documentId) return;

    const newStatus = !status;
    setStatus(newStatus);

    try {
      await updateDeviceStatus(documentId, newStatus);
    } catch (error) {
      console.error("Failed to update status in database:", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleState}
      activeOpacity={0.7} // opacity of button once pressed
      className={`${
        status ? "bg-secondary" : "bg-gray-300"
      } rounded-xl justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Image source={images.witch} className="w-24 h-24" resizeMode="contain" />
      <Text className="py-5">{JSON.stringify({ data: documentId, status })}</Text>
    </TouchableOpacity>
  );
};

export default SwitchButton;
