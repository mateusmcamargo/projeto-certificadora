export const fetchUsers = async () => {
    try {
        if (!loading) {setLoading(true);}
        const usersSnap = await getDocs(collection(database, 'users'));
        const usersData = usersSnap.docs.map(user => ({
            id: user.id,
            ...user.data()
        }));
        setUsers(usersData);
    }
    catch(error) {
        console.error('ERROR FETCHING USERS: ', error);
        setError(error);
    }
    finally {
        setLoading(false);
    }
}