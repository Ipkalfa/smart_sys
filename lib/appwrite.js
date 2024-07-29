import { Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const appwConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.SmartSys',
    projectId: '66785f60002504a645dd',
    databaseId: '6678637e001d16c11cc2',
    usercollectionId: '667863eb002fa50066f3',
    devicecollectionId: '667866fa002ac304bee7',
    measurementId: '667866d0002045fd0375',
    deviceUsageId: '667866f000187901411f',
    storageId: '667c10460006f054c376',
}

const{
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
const client = new Client();

client
    .setEndpoint(appwConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwConfig.projectId) // Your project ID
    .setPlatform(appwConfig.platform) // Your application ID or bundle ID.


    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    export { account, avatars, databases };

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwConfig.databaseId,
            appwConfig.usercollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                username,
                email,
                avatar: avatarUrl
            }
        )

        return newUser;
    }   catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email,password)
        return session; 
    } catch (error) {
        throw new Error(error);
    }
}


export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount ) throw Error;

        const currentUser = await databases.listDocuments(
            appwConfig.databaseId,
            appwConfig.usercollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}


export const getAllMeasurements = async() => {
    try {
       const measurements = await databases.listDocuments(
        databaseId,
        measurementId,
        [Query.orderDesc('$createdAt')]
       ) 

       return measurements.documents;
    } catch (error) {
        throw new Error(error);
    }
}


export const searchMeasurements = async(query) => {
    try {
       const measurements = await databases.listDocuments(
        databaseId,
        measurementId,
        [Query.search('timestamp', query)]
       ) 

       return measurements.documents;
    } catch (error) {
        throw new Error(error);
    }
}

// export const getDevicedata = async() => {
//     try {
//        const deviceData = await databases.updateDocument(
//         databaseId,
//         devicecollectionId,
//         // [Query.equal('deviceid', userId )]
//        ) 

//        return deviceData.documents;
//     } catch (error) {
//         throw new Error(error);
//     }
// }


// try {
//     await databases.updateDocument(
//       appwConfig.databaseId,
//       appwConfig.devicecollectionId, // Assuming this is the collection where the document is stored
//       documentId,
//       { state: newState }
//     );
//     console.log('State updated in database:', newState);
//   } catch (error) {
//     console.error('Failed to update state in database:', error);
//   }


export const getCurrentUserId = async () => {
    try {
      const currentUser = await account.get();
      return currentUser.$id; // Return the current user's ID
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  };
  
  export const getDeviceData = async (userId) => {
    try {
      const response = await databases.listDocuments(
        appwConfig.databaseId,
        appwConfig.devicecollectionId,
        // [Query.equal('user_Id', userId)] // Adjust the query as needed
      );
  
      if (response.documents.length > 0) {
        return response.documents[0].$id; // Return the document ID
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Failed to fetch document:', error);
      throw error;
    }
  };


  export const getDevicesData = async (userId) => {
    try {
      const response = await databases.listDocuments(
        appwConfig.databaseId,
        appwConfig.devicecollectionId,
        // [Query.equal('user_Id', userId)] // Adjust the query as needed
      );
  
      if (response.documents.length > 0) {
        return response.documents[1].$id; // Return the document ID
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Failed to fetch document:', error);
      throw error;
    }
  };


  export const updateDeviceStatus = async (documentId, newStatus) => {
    try {
      await databases.updateDocument(
        appwConfig.databaseId,
        appwConfig.devicecollectionId,
        documentId,
        { status: newStatus }
      );
      console.log('Status updated in database:', newStatus);
    } catch (error) {
      console.error('Failed to update status in database:', error);
      throw error;
    }
  };



export const signOut = async () => {
    try {
       const session= await account.deleteSession('current');
       return session;
    } catch (error) {
        throw new Error(error)
    }
}