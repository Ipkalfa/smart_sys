import { Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';

export const appwConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.SmartSys',
    projectId: '66785f60002504a645dd',
    databaseId: '6678637e001d16c11cc2',
    usercollectionId: '667863eb002fa50066f3',
    devicecollectionId: '667866fa002ac304bee7',/.,m
    storageId: '667c10460006f054c376',
}




// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwConfig.projectId) // Your project ID
    .setPlatform(appwConfig.platform) // Your application ID or bundle ID.


    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);


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
                // avatar: avatarUrl
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



const [powerData, setPowerData] = useState([]);
const [energyData, setEnergyData] = useState([]);
const [timestamps, setTimestamps] = useState([]);
const [error, setError] = useState(null);

const fetchData = async () => {
  try {
    const response = await databases.listDocuments('DATABASE_ID', 'COLLECTION_ID');
    const document = response.documents[0]?.data;

    if (document) {
      const newPower = document.power; // Assume power data is stored in 'power'
      const newEnergy = document.energy; // Assume energy data is stored in 'energy'
      const newTimestamp = new Date().toLocaleTimeString(); // Current time as timestamp

      setPowerData(prevData => [...prevData, newPower]);
      setEnergyData(prevData => [...prevData, newEnergy]);
      setTimestamps(prevTimes => [...prevTimes, newTimestamp]);
    } else {
      setError('No data found');
    }
  } catch (error) {
    console.error(error);
    setError('Error fetching data');
  }
};

useEffect(() => {
  fetchData();
  const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

  return () => clearInterval(intervalId); // Cleanup interval on component unmount
}, []);