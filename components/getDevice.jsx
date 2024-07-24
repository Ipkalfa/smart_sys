import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const DeviceInfoComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceId = DeviceInfo.getDeviceId();
      const manufacturer = await DeviceInfo.getManufacturer();
      const model = DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();
      const uniqueId = DeviceInfo.getUniqueId();

      setDeviceInfo({
        deviceId,
        manufacturer,
        model,
        systemName,
        systemVersion,
        uniqueId
      });
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View>
      <Text>Device ID: {deviceInfo.deviceId}</Text>
      {/* <Text>Manufacturer: {deviceInfo.manufacturer}</Text>
      <Text>Model: {deviceInfo.model}</Text>
      <Text>System Name: {deviceInfo.systemName}</Text>
      <Text>System Version: {deviceInfo.systemVersion}</Text>
      <Text>Unique ID: {deviceInfo.uniqueId}</Text> */}
    </View>
  )
}

export default DeviceInfoComponent