import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const DeviceInfoComponent = () => {
  const [deviceInfo, setDeviceInfo] = useState({})

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceId = DeviceInfo.getDeviceId();
      const systemName = DeviceInfo.getSystemName();
      const uniqueId = DeviceInfo.getUniqueId();

      setDeviceInfo({
        deviceId,
        systemName,
        uniqueId
      });
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View>
      <Text className="text-white">Device ID: {deviceInfo.deviceId}</Text>
      <Text className="text-white">System Name: {deviceInfo.systemName}</Text>
      <Text className="text-white">Unique ID: {deviceInfo.uniqueId}</Text>
    </View>
  );
};

export default DeviceInfoComponent