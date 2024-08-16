import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.SmartSys.HomeSys",
  projectId: "66ad2625001249bd442c",
  databaseId: "66ad2c74001a1bc74f45",
  usercollectionId: "66ad2dc90030cc72890f",
  devicecollectionId: "66ad2cb5002b7c3a820b",
  measurementId: "66ad2db100146cb4e965",
  deviceUsageId: "667866f000187901411f",
  storageId: "66ad69f60015a0b3333d",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usercollectionId,
  devicecollectionId,
  measurementId,
  deviceUsageId,
  storageId,
} = appwConfig;

// Init your React Native SDK
export const client = new Client();

client
  .setEndpoint(appwConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwConfig.projectId) // Your project ID
  .setPlatform(appwConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
// const realtime = new Realtime(client);

export { account, avatars, databases };

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    console.log("Avatar URL:", avatarUrl); // Log avatar URL

    await signIn(email, password);

    const newUser = await databases.createDocument(appwConfig.databaseId, appwConfig.usercollectionId, ID.unique(), {
      accountId: newAccount.$id,
      username,
      email,
      avatar: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwConfig.databaseId, appwConfig.usercollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllMeasurements = async () => {
  try {
    const measurements = await databases.listDocuments(databaseId, measurementId, [Query.orderDesc("$createdAt")]);

    return measurements.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchMeasurements = async (query) => {
  try {
    const measurements = await databases.listDocuments(databaseId, measurementId, [Query.search("deviceId", query)]);

    return measurements.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUserId = async () => {
  try {
    const currentUser = await account.get();
    return currentUser.$id; // Return the current user's ID
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
};

export const getDeviceData = async (userId) => {
  try {
    const response = await databases.listDocuments(
      appwConfig.databaseId,
      appwConfig.devicecollectionId,
      usercollectionId[Query.equal("username", userId)] // Adjust the query as needed
    );

    if (response.documents.length > 0) {
      console.log("=====from getDeviceData===");
      const payload = { id: response.documents[1].$id, status: response.documents[1].status };
      console.log(payload);
      return payload;
      // return response.documents[0].$id; // Return the document ID
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Failed to fetch document:", error);
    throw error;
  }
};

export const getDeviceStatus = async () => {
  try {
    const response = await databases.listDocuments(appwConfig.databaseId, appwConfig.devicecollectionId);
    return response;
  } catch (error) {
    console.error("Error fetching device data:", error);
    throw error;
  }
};

export const getDevicesData = async (userId) => {
  try {
    const response = await databases.listDocuments(
      appwConfig.databaseId,
      appwConfig.devicecollectionId
      // usercollectionId
      // [Query.equal('username', userId)] // Adjust the query as needed
    );

    if (response.documents.length > 0) {
      // console.log(response.documents);
      const payload = { id: response.documents[0].$id, status: response.documents[0].status };
      // console.log(payload);
      return payload;
      // return response.documents[0].$id; // Return the document ID
    } else {
      throw new Error("Document not found");
    }
  } catch (error) {
    console.error("Failed to fetch document:", error);
    throw error;
  }
};

export const updateDeviceStatus = async (documentId, newStatus) => {
  try {
    const res = await databases.updateDocument(appwConfig.databaseId, appwConfig.devicecollectionId, documentId, {
      status: newStatus,
    });

    console.log("Status updated in database:", newStatus);
    return res;
  } catch (error) {
    console.error("Failed to update status in database:", error);
    throw error;
  }
};

export const getLatestReadings = async (deviceId) => {
  try {
    if (!deviceId) throw new Error("Device ID is required");

    const response = await databases.listDocuments(
      appwConfig.databaseId,
      appwConfig.measurementId,
      [Query.equal('deviceId', deviceId), Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    if (response.documents.length > 0) {
      const { voltage, current, price } = response.documents[0];
      return { voltage, current, price };
    } else {
      throw new Error("No readings found");
    }
  } catch (error) {
    console.error("Failed to fetch readings:", error);
    throw error;
  }
};

export const getTotalPrice = async (deviceId) => {
  try {
    if (!deviceId) throw new Error("Device ID is required");

    // Fetch all documents for the specified device
    const response = await databases.listDocuments(
      appwConfig.databaseId,
      appwConfig.measurementId,
      [Query.equal('deviceId', deviceId)]
    );

    console.log("Raw response:", response); // Log raw response for debugging

    if (response.documents && response.documents.length > 0) {
      // Calculate the total price from all documents
      const totalPrice = response.documents.reduce((acc, document) => {
        return acc + (document.price || 0); // Use 0 if price is undefined
      }, 0);

      return totalPrice;
    } else {
      throw new Error("No readings found for device: " + deviceId);
    }
  } catch (error) {
    console.error("Failed to fetch readings for device:", deviceId, error);
    throw error;
  }
};


export const getLatestPowerEnergyData = async () => {
  try {
    // Fetch data from the Appwrite database for Smart Socket
    const responseSocket = await databases.listDocuments(appwConfig.databaseId, appwConfig.measurementId, [
      Query.equal('deviceId', 'Smart Socket'),
      Query.orderAsc("$createdAt"),
      Query.limit(4)
    ]);

    // Fetch data from the Appwrite database for Smart Switch
    const responseSwitch = await databases.listDocuments(appwConfig.databaseId, appwConfig.measurementId, [
      Query.equal('deviceId', 'Smart Switch'),
      Query.orderAsc("$createdAt"),
      Query.limit(4)
    ]);

    // Extract energy data and timestamps
    const socketDocuments = responseSocket.documents;
    const switchDocuments = responseSwitch.documents;

    const socketEnergyData = socketDocuments.map((doc) => doc.energy || 0); // Default to 0 if energy is not available
    const switchEnergyData = switchDocuments.map((doc) => doc.energy || 0); // Default to 0 if energy is not available
    const labels = socketDocuments.map((doc) => new Date(doc.$createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Convert timestamps to readable time

    return {
      socketEnergyData,
      switchEnergyData,
      // labels,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

// export const subscribeToDeviceStatus = (callback) => {
//   const unsubscribe = realtime.subscribe(
//     `databases.${appwConfig.databaseId}.collections.${appwConfig.measurementId}.documents`,
//     (response) => {
//       callback(response.payload);
//     }
//   );
//   return unsubscribe;
// };

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
